import test from 'node:test';
import assert from 'node:assert/strict';
import { slideDetailsFromUrl, slideImagesFromUrl } from '../slide-content.mjs';

test('reads and normalizes meeting details from the URL', () => {
  assert.deepEqual(
    slideDetailsFromUrl('https://slide.lansing.codes/?meeting=Lansing%20JavaScript&speaker=Alex%20Smith&topic=Web%20%20testing'),
    { meeting: 'Lansing JavaScript', speaker: 'Alex Smith', topic: 'Web testing' }
  );
});

test('leaves placeholders available when details are absent or blank', () => {
  assert.deepEqual(
    slideDetailsFromUrl('https://slide.lansing.codes/?meeting=%20%20#javascript'),
    { meeting: undefined, speaker: undefined, topic: undefined }
  );
});

test('keeps untrusted text as text and limits a long heading', () => {
  assert.deepEqual(
    slideDetailsFromUrl(`https://slide.lansing.codes/?meeting=${encodeURIComponent('<img src=x onerror=alert(1)>')}&topic=${'x'.repeat(150)}`),
    { meeting: '<img src=x onerror=alert(1)>', speaker: undefined, topic: 'x'.repeat(120) }
  );
});

test('accepts only bounded HTTPS image URLs without credentials', () => {
  const safe = new URL('https://slide.lansing.codes/');
  safe.searchParams.set('sponsorImage', 'https://example.org/sponsor.png');
  safe.searchParams.set('speakerImage', 'https://example.org/speaker.jpg');
  assert.deepEqual(slideImagesFromUrl(safe.href), {
    sponsorImage: 'https://example.org/sponsor.png',
    speakerImage: 'https://example.org/speaker.jpg'
  });
  for (const value of ['http://example.org/a.png', 'javascript:alert(1)', 'data:image/png;base64,AAAA', 'https://user:pass@example.org/a.png', 'x'.repeat(2049)]) {
    const unsafe = new URL(safe);
    unsafe.searchParams.set('sponsorImage', value);
    assert.equal(slideImagesFromUrl(unsafe.href).sponsorImage, undefined);
  }
});

import { parseEventLines, slideEventsFromUrl, lansingToday } from '../slide-content.mjs';

test('keeps the next three valid events in date order and rejects unsafe links', () => {
  const rows = [
    '2026-11-19 | Later | https://example.org/later',
    '2026-11-10 | Past | https://example.org/past',
    '2026-11-15 | Safe <img> title | https://example.org/safe',
    '2026-11-14 | Unsafe | javascript:alert(1)',
    '2026-11-16 | Middle | https://example.org/middle',
    '2026-11-17 | Third | https://example.org/third'
  ].join('\n');
  const result = parseEventLines(rows, '2026-11-11');
  assert.deepEqual(result.events.map((event) => event.date), ['2026-11-15', '2026-11-16', '2026-11-17']);
  assert.equal(result.events[0].title, 'Safe <img> title');
  assert.equal(result.invalid, 2);
});

test('rejects invalid dates and credentialed URLs and limits URL event data', () => {
  assert.equal(parseEventLines('2026-02-30 | Bad | https://example.org', '2026-01-01').invalid, 1);
  assert.equal(parseEventLines('2026-12-01 | Bad | https://user:pass@example.org', '2026-01-01').invalid, 1);
  const url = new URL('https://slide.lansing.codes/');
  url.searchParams.set('lcEvents', '2026-12-01 | Meetup | https://example.org/event');
  url.searchParams.set('groupEvents', 'x'.repeat(6001));
  assert.deepEqual(slideEventsFromUrl(url.href, '2026-01-01'), {
    lcEvents: [{ date: '2026-12-01', title: 'Meetup', url: 'https://example.org/event' }],
    groupEvents: []
  });
});

test('uses the Lansing calendar date around a UTC day boundary', () => {
  assert.equal(lansingToday(new Date('2026-11-02T01:00:00Z')), '2026-11-01');
});
