import './main.css';
import { slideDetailsFromUrl, slideImagesFromUrl, safeHttpsUrl, parseEventLines, slideEventsFromUrl, serializeEventLines, lansingToday } from './slide-content.mjs';

const today = lansingToday();
const params = new URL(window.location.href).searchParams;
const setParam = (name, value) => {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set(name, value);
  else url.searchParams.delete(name);
  window.history.replaceState(null, '', url);
};

const details = slideDetailsFromUrl(window.location.href);
const updateTitleSize = () => {
  document.getElementById('meetup').classList.toggle('is-long',
    document.getElementById('meetup').textContent.length > 55);
};
for (const [field, id] of Object.entries({ meeting: 'meetup', speaker: 'speaker', topic: 'topic' })) {
  if (details[field]) document.getElementById(id).textContent = details[field];
  const input = document.getElementById(`${field}-setting`);
  input.value = details[field] || '';
  input.addEventListener('change', () => {
    const value = Array.from(input.value.trim().replace(/\s+/g, ' ')).slice(0, 120).join('');
    input.value = value;
    document.getElementById(id).textContent = value || { meeting: 'Meeting Name', speaker: 'Speaker', topic: 'Topic' }[field];
    if (field === 'meeting') updateTitleSize();
    setParam(field, value);
  });
}
updateTitleSize();
for (const field of ['ssid', 'pass']) {
  const input = document.getElementById(field);
  input.value = params.get(field)?.slice(0, 120) || '';
  input.addEventListener('change', () => {
    input.value = input.value.slice(0, 120);
    setParam(field, input.value);
  });
}
const meetupUrl = safeHttpsUrl(params.get('meetupUrl')) || 'https://www.meetup.com/lansing-codes-meetup/';
document.getElementById('meetup-link').href = meetupUrl;
const meetupInput = document.getElementById('meetup-url-setting');
meetupInput.value = meetupUrl;
meetupInput.addEventListener('change', () => {
  const safe = safeHttpsUrl(meetupInput.value);
  if (!safe) { document.getElementById('setup-status').textContent = 'Use an HTTPS Meetup link without credentials.'; return; }
  document.getElementById('meetup-link').href = safe;
  setParam('meetupUrl', safe);
  document.getElementById('setup-status').textContent = 'Meetup link updated.';
});

const imageIds = { sponsorImage: 'sponsor-image', speakerImage: 'speaker-image' };
const images = slideImagesFromUrl(window.location.href);
for (const [field, id] of Object.entries(imageIds)) {
  if (images[field]) document.getElementById(id).src = images[field];
  const input = document.getElementById(field === 'sponsorImage' ? 'sponsor-image-url' : 'speaker-image-url');
  input.value = images[field] || '';
  input.addEventListener('change', () => {
    const safe = safeHttpsUrl(input.value);
    if (input.value && !safe) { document.getElementById('setup-status').textContent = 'Image links must be HTTPS without credentials.'; return; }
    document.getElementById(id).src = safe || '/placeholder.svg';
    setParam(field, safe);
    document.getElementById('setup-status').textContent = 'Image link updated.';
  });
}

function renderEvents(id, events) {
  const list = document.getElementById(id);
  list.replaceChildren();
  if (!events.length) {
    const item = document.createElement('li');
    item.className = 'empty';
    item.textContent = 'Add upcoming events in slide setup.';
    list.append(item);
    return;
  }
  for (const event of events) {
    const item = document.createElement('li');
    const time = document.createElement('time');
    time.dateTime = event.date;
    time.textContent = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'America/Detroit' }).format(new Date(`${event.date}T12:00:00Z`));
    const link = document.createElement('a');
    link.href = event.url;
    link.textContent = event.title;
    item.append(time, link);
    list.append(item);
  }
}
const eventSettings = { lcEvents: ['lc-events-setting', 'lc-events'], groupEvents: ['group-events-setting', 'group-events'] };
const initialEvents = slideEventsFromUrl(window.location.href, today);
for (const [field, [inputId, listId]] of Object.entries(eventSettings)) {
  const input = document.getElementById(inputId);
  input.value = serializeEventLines(initialEvents[field]) || '';
  renderEvents(listId, initialEvents[field]);
  input.addEventListener('change', () => {
    const { events, invalid } = parseEventLines(input.value, today);
    const serialized = serializeEventLines(events);
    if (serialized === undefined) {
      document.getElementById('setup-status').textContent = 'Event list is too long to share. Shorten titles or links and try again.';
      return;
    }
    input.value = serialized;
    renderEvents(listId, events);
    setParam(field, serialized);
    document.getElementById('setup-status').textContent = invalid ? `${invalid} invalid or past event line${invalid === 1 ? '' : 's'} skipped.` : 'Event list updated in the URL.';
  });
}

const previewUrls = new Map();
for (const [inputId, imageId] of Object.entries({ 'sponsor-upload': 'sponsor-image', 'speaker-upload': 'speaker-image' })) {
  document.getElementById(inputId).addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    const status = document.getElementById('image-setup-status');
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) {
      status.textContent = 'Choose an image file smaller than 10 MB.';
      event.target.value = '';
      return;
    }
    const previous = previewUrls.get(imageId);
    if (previous) URL.revokeObjectURL(previous);
    const preview = URL.createObjectURL(file);
    previewUrls.set(imageId, preview);
    document.getElementById(imageId).src = preview;
    status.textContent = `${file.name} is shown on this slide. Local uploads are not saved in the URL.`;
  });
}
window.addEventListener('pagehide', () => {
  for (const preview of previewUrls.values()) URL.revokeObjectURL(preview);
});
