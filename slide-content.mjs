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
