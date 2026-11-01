import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { slideDetailsFromUrl, slideImagesFromUrl } from './slide-content.mjs';

const details = slideDetailsFromUrl(window.location.href);
for (const [field, id] of Object.entries({ meeting: 'meetup', speaker: 'speaker', topic: 'topic' })) {
  if (details[field]) document.getElementById(id).textContent = details[field];
}

const images = slideImagesFromUrl(window.location.href);
for (const [field, id] of Object.entries({ sponsorImage: 'sponsor-image', speakerImage: 'speaker-image' })) {
  const url = images[field];
  if (url) document.getElementById(id).src = url;
}

const previewUrls = new Map();
const pendingUrls = new Map();
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
    const pending = pendingUrls.get(imageId);
    if (pending) URL.revokeObjectURL(pending);
    const preview = URL.createObjectURL(file);
    pendingUrls.set(imageId, preview);
    const candidate = new Image();
    candidate.onload = () => {
      if (pendingUrls.get(imageId) !== preview) return;
      pendingUrls.delete(imageId);
      const previous = previewUrls.get(imageId);
      if (previous) URL.revokeObjectURL(previous);
      previewUrls.set(imageId, preview);
      document.getElementById(imageId).src = preview;
      status.textContent = `${file.name} is shown on this slide. Local uploads are not saved in the URL.`;
    };
    candidate.onerror = () => {
      if (pendingUrls.get(imageId) !== preview) return;
      pendingUrls.delete(imageId);
      URL.revokeObjectURL(preview);
      event.target.value = '';
      status.textContent = 'The image could not be displayed. Choose another file.';
    };
    candidate.src = preview;
  });
}
window.addEventListener('pagehide', () => {
  for (const preview of previewUrls.values()) URL.revokeObjectURL(preview);
  for (const pending of pendingUrls.values()) URL.revokeObjectURL(pending);
});
