Simple Markdown Site
========================
Build a site with some markdown file.

## How it works?

Here is your markdown file

```
markdown
├── index.md
└── sub
    └── sub-dir-file.md
```

then run `npm run build`, You will get compiled html file in `dist` dir, same tree as it is;

```
dist
├── _scripts_ // default js  edit it in `src`
├── _styles_ // default css  edit it in `src`
├── index.html
└── sub
    └── sub-dir-file.html
```

Just host `dist` dir with Nginx and you get website;

## Development

run command `npm start`

## License

MIT
