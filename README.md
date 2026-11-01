# Welcome slide generator for Lansing tech events

This is the code behind [slide.lansing.codes](https://slide.lansing.codes), an
a shareable welcome slide for Lansing tech events.

It's intended to be a useful starting slide for event organizers to use at the
beginning of a tech event. The slide is bookmarkable and shows manually chosen
upcoming events, venue WiFi, the main topic, and sponsor or speaker images.

## Local development

Run `npm ci`, then `npm start` to edit the slide locally. Run `npm run build`
to produce the deployable static site in `dist/`; `npm run preview` serves that
build for local review. The layout uses plain JavaScript and CSS. Automatic
Meetup event lookup is still planned; event lists can be entered through the
slide's setup panel in the meantime.

## Link to a specific slide

Pass `meeting`, `speaker`, and `topic` as URL query parameters to fill the
slide headings. For example:

```text
https://slide.lansing.codes/?meeting=Lansing%20JavaScript&speaker=Alex%20Smith&topic=Testing%20web%20apps
```

Open **Set up this slide** to edit those headings, the Meetup group link,
images, and two event lists. Enter one event per line as
`YYYY-MM-DD | Event title | https://event-link`. Up to three valid, future
events per list appear, sorted by date. Editing the fields updates the URL,
so the resulting page can be bookmarked and shared. WiFi network and password
fields update that URL too; share it only when those details are meant for
everyone with the link. A bare group hash (such as `#javascript`) and
automatic Meetup lookups are not implemented yet.

You can also add `sponsorImage` and `speakerImage` parameters with HTTPS
image URLs. Those images appear when the link is opened again. To preview a
picture from your computer without uploading it, open **Set up this slide** on
the slide and choose a file under 10 MB. Local file previews last only until
you close or reload the page; they are not stored in the bookmarkable URL.

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
