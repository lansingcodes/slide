# Welcome slide generator for Lansing tech events

This is the code behind [slide.lansing.codes](https://slide.lansing.codes), an
automatically-generated welcome slide for Lansing tech events.

It's intended to be a useful starting slide for event organizers to use at the
beginning of a tech event. The slide is bookmarkable, shows upcoming events,
wifi info, the main topic for the event, and sponsors. At least, eventually.

## Local development

Run `npm ci`, then `npm start` to edit the slide locally. Run `npm run build`
to produce the deployable static site in `dist/`; `npm run preview` serves that
build for local review. Bootstrap CSS is bundled locally. The event, speaker,
and sponsor fields are still placeholders for the planned generator feature.

## Link to a specific slide

Pass `meeting`, `speaker`, and `topic` as URL query parameters to fill the
slide headings. For example:

```text
https://slide.lansing.codes/?meeting=Lansing%20JavaScript&speaker=Alex%20Smith&topic=Testing%20web%20apps
```

Leave a parameter out to keep that heading's placeholder. URL values are shown
as plain text and limited to 120 characters per heading. A bare group hash
(such as `#javascript`) and automatic Meetup lookups are not implemented yet.
This link format lets organizers prepare a slide while those integrations are
built.

Run `npm test` for URL parsing checks, then `npm run build` and `npm run preview`
to inspect the built slide locally.

## Code of Conduct

All participants are expected to treat others with respect and follow our
[Code of Conduct](https://www.lansing.codes/code-of-conduct/).

## Questions

For general support, direct your questions to the
[Lansing Codes Slack team](http://slack.lansing.codes). The issue list for this
project is exclusively for bug reports and feature requests.

## Stay in touch

- [Slack](http://slack.lansing.codes)
- [Twitter](https://twitter.com/lansingcodes)
- [Facebook](https://www.facebook.com/lansingcodes)
- [Website](https://www.lansing.codes)
- [Newsletter](http://bit.ly/lansing-codes-newsletter)

## Contribution

You are welcome and encouraged to make changes to this website by submitting
pull requests or forking our code to make your own community website!

Before you get ahead of yourself though, please read our
[Contributing Guide](https://github.com/lansingcodes/slide/blob/main/.github/CONTRIBUTING.md).

## License

[Hippocratic 2.1](https://firstdonoharm.dev)

Copyright (c) 2016-Present, Michigan Technology Network (MITN)
