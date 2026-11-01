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
