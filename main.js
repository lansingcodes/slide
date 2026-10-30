import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { slideDetailsFromUrl } from './slide-content.mjs';

const details = slideDetailsFromUrl(window.location.href);
for (const [field, id] of Object.entries({ meeting: 'meetup', speaker: 'speaker', topic: 'topic' })) {
  if (details[field]) document.getElementById(id).textContent = details[field];
}
