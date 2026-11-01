const maxFieldLength = 120;

export function slideDetailsFromUrl(url) {
  const params = new URL(url).searchParams;
  const get = (field) => {
    const value = params.get(field)?.replace(/\s+/g, ' ').trim();
    return value ? Array.from(value).slice(0, maxFieldLength).join('') : undefined;
  };

  return {
    meeting: get('meeting'),
    speaker: get('speaker'),
    topic: get('topic')
  };
}

export function slideImagesFromUrl(url) {
  const params = new URL(url).searchParams;
  const image = (field) => {
    const value = params.get(field);
    if (!value || value.length > 2048) return undefined;
    try {
      const parsed = new URL(value);
      return parsed.protocol === 'https:' && !parsed.username && !parsed.password
        ? parsed.href
        : undefined;
    } catch {
      return undefined;
    }
  };
  return { sponsorImage: image('sponsorImage'), speakerImage: image('speakerImage') };
}

export function safeHttpsUrl(value) {
  if (!value || value.length > 2048) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export function parseEventLines(value, today = '0000-01-01') {
  const events = [];
  let invalid = 0;
  for (const line of value.split(/\r?\n/).filter((entry) => entry.trim())) {
    const [date, title, url, extra] = line.split('|').map((part) => part?.trim());
    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date || '') &&
      !Number.isNaN(Date.parse(`${date}T00:00:00Z`)) &&
      new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
    const safeUrl = safeHttpsUrl(url);
    if (!validDate || date < today || !title || Array.from(title).length > 120 || !safeUrl || extra !== undefined) {
      invalid++;
      continue;
    }
    events.push({ date, title, url: safeUrl });
  }
  events.sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));
  return { events: events.slice(0, 3), invalid };
}

export function slideEventsFromUrl(url, today = '0000-01-01') {
  const params = new URL(url).searchParams;
  const read = (key) => {
    const value = params.get(key);
    return value && value.length <= 6000 ? parseEventLines(value, today).events : [];
  };
  return { lcEvents: read('lcEvents'), groupEvents: read('groupEvents') };
}

export function lansingToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Detroit', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now);
  const value = Object.fromEntries(parts.map(({ type, value: part }) => [type, part]));
  return `${value.year}-${value.month}-${value.day}`;
}
