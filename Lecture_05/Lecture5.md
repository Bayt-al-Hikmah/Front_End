## Learning Objectives

By the end of this lecture, students should be able to:

- Combine selectors to target elements precisely.
- Use attribute selectors, combinators, pseudo-classes, and pseudo-elements.
- Define reusable design values with CSS custom properties.
- Create linear and radial gradients.
- Explain the main CSS positioning modes and stacking order.
- Build one-dimensional layouts using Flexbox.

## Selecting Elements More Precisely

Basic selectors are useful, but real interfaces often require more precise targeting. CSS provides selector combinations that allow a developer to select several types of elements, filter elements by attributes, and target elements based on their relationship to other elements.

### Grouping and Compound Selectors

A comma groups multiple selectors so that they share the same declarations:

```css
h1,
h2,
.section-title {
  color: #23415e;
  font-family: Arial, sans-serif;
}
```
A compound selector combines conditions for the same element. For example, `p.intro` selects only paragraph elements that have the `intro` class:

```css
p.intro {
  text-indent: 1rem;
}
```

This is more specific than `.intro`, which would select any element with that class.

### Attribute Selectors

Attribute selectors target elements based on the presence or value of an HTML attribute. For example, the following rule selects text inputs:

```css
input[type="text"] {
  border: 1px solid #9aa7b4;
  padding: 0.5rem;
}
```

Other attribute selector forms can match attributes that begin with, end with, or contain a value. These selectors are useful for styling links, form controls, and elements with data attributes.

### The Universal Selector

The universal selector (`*`) matches every element. It is often used for a small reset or a consistent box-sizing rule:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Applying visual styles indiscriminately to every element is usually not a good idea. Use the universal selector where a rule genuinely needs to affect all elements.

## Relationship Selectors (Combinators)

Combinators select elements based on their relationship in the HTML document tree. Consider this example:

```html
<div class="content">
  <section>
    <p>Paragraph inside a section.</p>
  </section>
  <p>Paragraph directly inside the div.</p>
</div>
```

The **child combinator** (`>`) selects direct children only. The following rule selects the paragraph that is a direct child of `.content`, but not the paragraph nested inside `<section>`:

```css
.content > p {
  color: tomato;
}
```

The **descendant combinator** (a space) selects matching elements at any depth inside the ancestor:

```css
.content p {
  color: steelblue;
}
```

The **adjacent sibling combinator** (`+`) selects the first matching sibling immediately after another element:

```css
h2 + p {
  margin-top: 0;
}
```

The **general sibling combinator** (`~`) selects all matching siblings that appear after the specified element and share the same parent:

```css
h2 ~ p {
  color: #42566b;
}
```

These selectors are useful when the HTML structure already expresses a relationship and adding extra classes would be unnecessary.

## Negation, Pseudo-Classes, and Pseudo-Elements

### The Negation Pseudo-Class

The `:not()` pseudo-class excludes elements that match the selector inside its parentheses:

```css
p:not(.intro) {
  color: #555;
}
```

This rule styles paragraphs that do not have the `intro` class.

### State Pseudo-Classes

Pseudo-classes select elements according to a state or condition. They are especially useful for responding to user interaction and for styling form controls.

Common interaction pseudo-classes include:

- `:hover` when a pointing device is over an element.
- `:focus` when an element has keyboard or programmatic focus.
- `:focus-visible` when the browser determines that a visible focus indicator is appropriate.
- `:active` while an element is being activated.
- `:visited` for a visited link.
- `:checked` for a checked checkbox or radio button.
- `:disabled` for a disabled form control.
- `:valid` and `:invalid` for controls that satisfy or fail their applicable constraints.

```css
button:hover {
  background-color: #174a73;
}

input:focus {
  outline: 3px solid #a8d5ff;
}

input:invalid {
  border-color: #c0392b;
}
```

Do not remove focus indicators without providing a clear replacement. Keyboard users need to know which control currently has focus.

### Structural Pseudo-Classes

Structural pseudo-classes select elements according to their position among their siblings. Examples include `:first-child`, `:last-child`, `:nth-child()`, `:nth-last-child()`, `:first-of-type`, `:last-of-type`, `:nth-of-type()`, `:only-child`, and `:empty`.

```css
li:first-child {
  font-weight: bold;
}

li:nth-child(even) {
  background-color: #f2f5f8;
}

p:nth-of-type(3) {
  color: #435b70;
}
```

The expression in `:nth-child()` can be a number, `odd`, `even`, or an `an+b` pattern. Remember that `:nth-child()` counts all element siblings, while `:nth-of-type()` counts only siblings of the same element type.

### Pseudo-Elements

Pseudo-elements target a specific part of an element or create a generated part of its presentation. They are written with a double colon (`::`).

- `::first-letter` targets the first letter of a block.
- `::first-line` targets the first formatted line.
- `::before` creates a generated box before the element's content.
- `::after` creates a generated box after the element's content.

```css
.article p::first-letter {
  font-size: 1.5em;
  font-weight: bold;
}

.note::before {
  content: "Note: ";
  font-weight: bold;
}
```

Generated content is useful for decorative details, but do not use it as the only place for essential information. Content that users must understand should be present in the HTML itself.

## CSS Custom Properties and the `:root` Selector

The `:root` pseudo-class selects the document's root element, usually `<html>`. It is commonly used to define **CSS custom properties**, also known as CSS variables. A variable begins with two hyphens and can be reused through the `var()` function.

```css
:root {
  --color-primary: #245b83;
  --color-accent: #e67e22;
  --space-card: 1.25rem;
  --radius-card: 0.75rem;
}

.button {
  background-color: var(--color-primary);
}

.card {
  padding: var(--space-card);
  border-radius: var(--radius-card);
}
```

If the primary color needs to change, update it once in `:root`. All declarations that use the variable will then receive the new value. This is a simple foundation for a consistent design system.

## Gradients

A gradient creates a smooth transition between two or more colors. Gradients are images generated by the browser, so they are commonly used with `background` or `background-image`.

### Linear Gradients

A **linear gradient** transitions along a straight line. Its direction can be written using keywords or an angle:

```css
.hero {
  background: linear-gradient(to right, #153e5c, #4a90b8);
}

.banner {
  background: linear-gradient(45deg, #ff9a9e, #fad0c4, #a6c1ee);
}
```

The color stops determine the colors and where they appear along the gradient. An angle can give the designer more precise control over the direction:

```css
.card {
  background: linear-gradient(135deg, #1d3557 0%, #457b9d 60%, #a8dadc 100%);
}
```

![Linear gradient example](./attachments/gradien.png)

![Multiple color gradient example](./attachments/grad2.png)

### Radial Gradients

A **radial gradient** transitions outward from a central point. It can be circular or elliptical:

```css
.highlight {
  background: radial-gradient(circle, #ffffff, #9ecae1);
}

.hero {
  background: radial-gradient(ellipse at top, #ffffff, #b7d7e8, #23415e);
}
```

The shape, position, size, and color stops can be adjusted to create different effects.

### Repeating Gradients

Repeating gradients repeat a pattern of color stops. They can create stripes and other decorative patterns:

```css
.stripes {
  background: repeating-linear-gradient(
    45deg,
    #f2f2f2 0 10px,
    #c7d8e5 10px 20px
  );
}
```

Use gradients with restraint. Decorative backgrounds should not reduce contrast or make text difficult to read.

## Positioning Elements

CSS positioning controls how an element is placed relative to its normal position, a containing block, or the viewport. The `position` property has several values.

### Static Positioning

`static` is the default positioning mode. Elements follow the normal document flow, and `top`, `right`, `bottom`, and `left` do not reposition them.

### Relative Positioning

`relative` keeps the element in the normal flow but allows it to be visually offset from its original position. Its original space remains reserved. It also commonly provides a positioning reference for absolutely positioned descendants.

```css
.container {
  position: relative;
}

.badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
```

### Absolute Positioning

`absolute` removes the element from the normal document flow. The browser positions it relative to its nearest ancestor that establishes an appropriate positioning context, such as an ancestor with `position: relative`. If no such ancestor exists, it is positioned relative to the initial containing block.

```html
<div class="card">
  <span class="badge">New</span>
  <h2>Featured Product</h2>
  <p>Product description.</p>
</div>
```

```css
.card {
  position: relative;
  padding: 2rem;
}

.badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
}
```

This is a common pattern for labels or icons placed inside a card.

### Fixed and Sticky Positioning

`fixed` positions an element relative to the viewport in the common case. It stays in the same visible position when the page scrolls and is removed from normal flow. It is often used for floating controls or a fixed navigation bar, but it can cover content if not designed carefully.

`sticky` behaves like a relatively positioned element until a scroll threshold is reached, after which it sticks within its scrolling container. It is often used for section navigation or table headings:

```css
.site-nav {
  position: sticky;
  top: 0;
  z-index: 10;
}
```

Sticky positioning requires a suitable scroll context and at least one inset value, such as `top`.

## Stacking Order and `z-index`

When positioned elements overlap, the browser determines which one is painted in front. The `z-index` property can influence the stacking order within the relevant stacking context. A larger integer generally places an element in front of an element with a smaller integer in the same stacking context.

```css
.box {
  position: absolute;
  width: 100px;
  height: 100px;
}

.box-one {
  z-index: 1;
}

.box-two {
  z-index: 2;
}
```
`z-index` is not a universal global ranking system. Properties such as positioned elements with a non-auto `z-index`, transforms, opacity, and other CSS features can create separate stacking contexts. For a beginner, the important habit is to give overlapping elements a clear parent structure and avoid assigning unnecessarily large numbers everywhere.

![Positioning and stacking example](./attachments/z_index.png)

## Flexbox: One-Dimensional Layout

**CSS Flexbox** is a layout model designed to arrange items along one dimension at a time. It is especially useful for navigation bars, button groups, card rows, and aligning content within a component.

To begin, set `display: flex` on the parent. The parent becomes the **flex container**, and its direct children become **flex items**:

```css
.container {
  display: flex;
}
```

Flexbox has two important axes:

- The **main axis** follows the direction set by `flex-direction`.
- The **cross axis** runs perpendicular to the main axis.

This distinction matters because alignment properties work relative to these axes. When `flex-direction: row` is used, the main axis is horizontal in a typical left-to-right layout. When `flex-direction: column` is used, the main axis is vertical.

### Container Properties

The `flex-direction` property defines the main-axis direction:

```css
.container {
  display: flex;
  flex-direction: row; /* row, row-reverse, column, column-reverse */
}
```

![Flex direction](./attachments/flex-direction.svg)

The `flex-wrap` property controls whether items remain on one line or wrap when space is limited:

```css
.container {
  display: flex;
  flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
}
```

`flex-flow` is a shorthand for `flex-direction` and `flex-wrap`:

```css
.container {
  flex-flow: row wrap;
}
```

The `justify-content` property distributes items along the main axis. Common values include `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, and `space-evenly`.

```css
.navigation {
  display: flex;
  justify-content: space-between;
}
```

![Flexbox justify-content](./attachments/justify-content.svg)

The `align-items` property aligns items along the cross axis. Common values are `stretch`, `flex-start`, `flex-end`, `center`, and `baseline`:

```css
.card-row {
  display: flex;
  align-items: center;
}
```

![Flexbox align-items](./attachments/align-items.svg)

When items wrap onto multiple lines, `align-content` controls the distribution of those lines along the cross axis. It has an effect only when there is more than one flex line and the container has extra cross-axis space.

The `gap` property controls the space between flex items. `row-gap` and `column-gap` can be used when different spacing is needed:

```css
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
```

### Flex Item Properties

The `order` property changes the visual order of flex items. Lower values appear before higher values, and items with equal values retain their source order. Reordering items visually should be used carefully because the visual order may differ from the order experienced by keyboard and screen-reader users.

`flex-grow` determines how an item shares available extra space. `flex-shrink` determines how it shrinks when there is not enough space. `flex-basis` sets its initial main-axis size before remaining space is distributed.

```css
.sidebar {
  flex: 1 1 15rem;
}

.main-content {
  flex: 3 1 30rem;
}
```

The `flex` shorthand combines grow, shrink, and basis. It is commonly used to define how items share space. The `align-self` property overrides the container's `align-items` value for one specific item:

```css
.featured-card {
  align-self: flex-start;
}
```

![Flex grow](./attachments/flex-grow.svg)

![Flex align-self](./attachments/align-self.svg)

### Example: A Responsive Navigation Bar

```html
<header class="site-header">
  <a class="logo" href="index.html">Studio</a>
  <nav class="navigation" aria-label="Main navigation">
    <a href="#home">Home</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
```

```css
.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 5%;
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

Flexbox is ideal here because the header needs to align its main items along one axis while distributing available space.

## Key Takeaways

- Combinators select elements based on their document relationships.
- Pseudo-classes target states and structural conditions; pseudo-elements target parts of elements or generated decoration.
- CSS custom properties make repeated design values easier to manage.
- Gradients create smooth transitions between colors.
- Positioning modes affect normal document flow and the reference point used for placement.
- `z-index` works within stacking contexts.
- Flexbox is designed for one-dimensional alignment and distribution.

## Practical Project — Product Landing Page

Create a landing page for a fictional product. Use advanced selectors to style navigation links, buttons, and repeated cards. Define a small set of CSS variables for colors and spacing. Add a linear or radial gradient to the hero section. Use positioning for a small badge or decorative element. Use Flexbox to arrange the header, hero content, and feature cards.

Include hover and focus states for interactive controls. Make sure the content remains readable and that the page still works when the viewport becomes narrow.

**Reference solution:** [Product landing page example](https://alitigui.github.io/Front_end_solutions/Lecture5/solution/index.html)
