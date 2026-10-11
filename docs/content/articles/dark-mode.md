Title: Dark mode
Date: 2026-09-20
Category: Guides
Tags: design, accessibility
Slug: dark-mode
Summary: Dark mode uses CSS light-dark().

Colors are set with `light-dark()`, which picks a value based on the color scheme.

```css
:root {
    color-scheme: light dark;
    --ink: light-dark(#2e2a45, #fbf7f0);
}
```

The switch in the header changes the scheme and remembers the choice.
