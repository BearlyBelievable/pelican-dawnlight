Title: Code blocks
Slug: code-blocks
Sortorder: 23
Section: Markdown

Inline code looks like `pelican -s docs/pelicanconf.py`.

## No language

```
plain text with no highlighting
    and some indentation
```

## Python

```python
import json


class ApplicationForm:
    """A form built from a list of fields."""

    def __init__(self, fields):
        self.fields = fields

    @classmethod
    def load(cls, path):
        """Read the fields from a JSON file."""
        # Open the file and parse it
        with open(path) as f:
            return cls(json.load(f))
```

## JavaScript

```javascript
const toggle = document.getElementById('themeToggle')
toggle.addEventListener('change', () => {
    document.documentElement.dataset.theme = toggle.checked ? 'dark' : 'light'
})
```

## Shell

```bash
pip install -r docs/requirements.txt
pelican -s docs/pelicanconf.py --listen
```

## JSON and YAML

```json
{"name": "demo", "enabled": true, "count": 3, "tags": ["a", "b"]}
```

```yaml
site:
  name: demo
  pages:
    - about
    - legal
```

## HTML and CSS

```html
<a class="btn-link" href="/"><div class="btn">Home</div></a>
```

```css
.btn {
    border-radius: var(--radius);
    background: var(--accent);
}
```

## Comments

```python
# A comment on its own line
timeout = 30  # A comment at the end of a line


def add(a, b):
    """Add two numbers and return the result."""
    return a + b
```

```javascript
// A single-line comment
const timeout = 30 /* A block comment */

/**
 * A documentation comment.
 */
function add(a, b) {
    return a + b
}
```

```bash
# A comment in a shell script
echo "hello" # Another comment
```

```css
/* A comment in a stylesheet */
.btn {
    color: red;
}
```

```html
<!-- A comment in markup -->
<p>Some text</p>
```

## Diff

```diff
--- a/config.py
+++ b/config.py
@@ -1,4 +1,4 @@
 DEBUG = False
-TIMEOUT = 30
+TIMEOUT = 60
 RETRIES = 3
-NAME = "old"
+NAME = "new"
```

## Long line

```
This is a very long line: 0123456789 0123456789 0123456789 0123456789 0123456789 0123456789
```
