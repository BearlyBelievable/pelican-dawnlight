Title: Design tokens
Date: 2026-07-12
Category: Guides
Tags: design
Slug: design-tokens
Summary: Colors and the border radius are CSS variables.

Colors and the border radius are CSS variables at the top of `main.css`. You can
override them in a stylesheet loaded after the theme.

```css
:root {
    --accent-light: #2a7de1;
    --radius: 12px;
}
```
