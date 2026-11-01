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
