Simple Markdown Site
========================
Build a site with some markdown file.

## Installation

```
git clone https://github.com/chairuosen/simple-markdown-site
cd simple-markdown-site
npm install
```


## How to use?

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
├── _styles_ // default css  edit it in `src`
├── index.html
└── sub
    └── sub-dir-file.html
```

Just host `dist` dir with Nginx and you get a website;

## Development

run command `npm start`

## License

MIT
