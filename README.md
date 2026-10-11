# Dawnlight

A Pelican theme with light and dark mode, a blog, and a header menu with dropdowns.

[Live demo](https://bearlybelievable.github.io/pelican-dawnlight/)

## Features

- Supports light and dark mode, following the visitor's system setting until they use the toggle in the header, then remembering their choice.
- Generates a header menu with dropdown groups and footer links from page metadata, with no extra config.
- Supports responsive layouts, collapsing the header into a menu button on small screens.
- Aims to meet WCAG 2.2 AA, with a skip link, labeled landmarks, keyboard-operable menus, visible focus outlines, and reduced-motion support.
- Supports Open Graph and Twitter tags and canonical URLs for link previews and search.
- Lets you customize colors, fonts, and interface text.
- Adds line numbers, diff highlighting, and a copy button to code blocks.
- Styles accordions from the `pymdown-extensions` package.
- Styles forms and buttons, and provides a layout for long legal documents.
- Marks links that leave the site with an icon.
- Provides templates for all of Pelican's built-in pages, including articles, pages, categories, tags, authors, archives, pagination, and feeds, and styles the Markdown elements it renders, like tables, footnotes, definition lists, abbreviations, and a table of contents.

## Requirements

- Pelican 4.x (tested with 4.12)
- The `pymdown-extensions` package
- A browser that supports `light-dark()` and `:has()`

The fonts come from Google Fonts.

## Install

Clone the repo and point your `pelicanconf.py` at it:

```python
THEME = "/path/to/pelican-dawnlight"
```

Then install `pymdown-extensions`:

```bash
pip install pymdown-extensions
```

## Settings

```python
SITENAME = "My site"
SITEURL = "https://example.com"           # no trailing slash
SITE_DESCRIPTION = "About my site"        # for the home, archives, and category pages
PAGE_ORDER_BY = "sortorder"               # orders the pages in each dropdown
```

These are optional:

```python
SITELOGO = "images/logo.svg"              # shown 32px tall
SITE_FAVICON = "images/favicon.svg"
SITE_OG_IMAGE = "images/preview.png"      # link preview image, PNG or JPEG works best
SITE_OG_IMAGE_ALT = "What the preview image shows"
OG_LOCALE = "en_US"
TWITTER_SITE = "myhandle"                 # no @

EXTERNAL_NAV_LINKS = [                    # extra links at the end of the header menu
    {"label": "Chat", "url": "https://chat.example.com/"},
]
```

Without `SITELOGO` the header shows your site name.

### Markdown

```python
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight", "linenums": True},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
        "markdown.extensions.toc": {},
        "pymdownx.details": {},
    },
}
```

`codehilite` needs `css_class` set to `highlight` and `linenums` on.

### Blog

If you have a blog, add these too. The header links to `/blog/archives`, and the list pages need pagination.

```python
ARCHIVES_SAVE_AS = "blog/archives/index.html"
DEFAULT_PAGINATION = 10
PAGINATED_TEMPLATES = {
    "index": None,
    "category": None,
    "tag": None,
    "author": None,
    "archives": None,
}
FEED_ALL_RSS = "feeds/all.rss.xml"
```

## Pages

### Home page

By default the home page is a list of your articles. To use a page instead, give it these lines and set `INDEX_SAVE_AS = ""` in `pelicanconf.py`.

```markdown
Title: Home
Template: home
Save_as: index.html
Sortorder: 00

Welcome to the site.
```

The home page shows the content of that page, followed by your latest articles.

### The menu and footer

By default, every page is a link in the header menu. If you have a blog, the menu also has a Blog dropdown with your categories.

To nest pages in a dropdown, give them the same `Section`.

```markdown
Section: Guides
Title: Getting started
Slug: getting-started
Sortorder: 20
```

To put a page in the footer instead of the menu, add `Footer: true`.

```markdown
Footer: true
Title: Terms of use
Slug: terms
Sortorder: 90
```

### Other metadata

- **Sortorder:** Orders the pages in the header and footer, and every page needs one. It sorts as text, so use two digits like `05` and `10`.
- **Legal:** `true` uses the legal page layout.
- **Summary:** The description for the page and its link preview.

## Customizing

The colors, border radius, shadows, and monospace font are CSS variables at the top of `static/css/main.css`, like `--accent-light`, `--surface`, `--radius`, and `--font-mono`.

The copy button labels and the screen reader text on external links are in `templates/strings.json`.

## License

GPL-3.0-or-later. See `LICENSE`.
