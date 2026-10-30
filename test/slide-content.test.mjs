import test from 'node:test';
import assert from 'node:assert/strict';
import { slideDetailsFromUrl } from '../slide-content.mjs';

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
