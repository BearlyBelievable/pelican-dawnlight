import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from pelicanconf import *

SITEURL = "https://bearlybelievable.github.io/pelican-dawnlight"
FEED_DOMAIN = SITEURL
DELETE_OUTPUT_DIRECTORY = True
