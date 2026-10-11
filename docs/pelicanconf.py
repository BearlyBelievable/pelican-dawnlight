from pathlib import Path

HERE = Path(__file__).resolve().parent

AUTHOR = "Dawnlight"
SITENAME = "Dawnlight"
SITEURL = ""
SITELOGO = "images/logo.svg"
SITE_FAVICON = "images/favicon.svg"
SITE_DESCRIPTION = "A live demo of the Dawnlight Pelican theme."

THEME = str(HERE.parent)
PATH = str(HERE / "content")
OUTPUT_PATH = str(HERE / "output")
CACHE_PATH = str(HERE / "cache")

TIMEZONE = "UTC"
DEFAULT_LANG = "en"
DEFAULT_DATE_FORMAT = "%B %d, %Y"

PAGE_PATHS = ["pages"]
ARTICLE_PATHS = ["articles"]
STATIC_PATHS = ["images"]

ARTICLE_URL = "blog/{slug}/"
ARTICLE_SAVE_AS = "blog/{slug}/index.html"
PAGE_URL = "{slug}/"
PAGE_SAVE_AS = "{slug}/index.html"
CATEGORY_URL = "blog/category/{slug}/"
CATEGORY_SAVE_AS = "blog/category/{slug}/index.html"
ARCHIVES_SAVE_AS = "blog/archives/index.html"
INDEX_SAVE_AS = ""

TAGS_URL = "blog/tags/"
TAGS_SAVE_AS = "blog/tags/index.html"
TAG_URL = "blog/tag/{slug}/"
TAG_SAVE_AS = "blog/tag/{slug}/index.html"
AUTHORS_URL = "blog/authors/"
AUTHORS_SAVE_AS = "blog/authors/index.html"
AUTHOR_URL = "blog/author/{slug}/"
AUTHOR_SAVE_AS = "blog/author/{slug}/index.html"
CATEGORIES_URL = "blog/categories/"
CATEGORIES_SAVE_AS = "blog/categories/index.html"

DIRECT_TEMPLATES = ["index", "archives", "categories", "tags", "authors"]

DEFAULT_PAGINATION = 4
PAGINATED_TEMPLATES = {
    "index": None,
    "category": None,
    "tag": None,
    "author": None,
    "archives": None,
}

FEED_ALL_RSS = "feeds/all.rss.xml"
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

EXTERNAL_NAV_LINKS = [
    {
        "label": "GitHub",
        "url": "https://github.com/BearlyBelievable/pelican-dawnlight",
    },
]

PAGE_ORDER_BY = "sortorder"

MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight", "linenums": True},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
        "markdown.extensions.toc": {},
        "pymdownx.details": {},
    },
}
