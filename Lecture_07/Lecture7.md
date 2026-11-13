## Learning Objectives

By the end of this lecture, students should be able to:

- Explain the difference between a CSS transform and a layout property.
- Apply translation, rotation, scaling, and skewing in two and three dimensions.
- Use perspective to create a basic 3D effect.
- Create smooth state changes with CSS transitions.
- Define animations with `@keyframes`.
- Apply motion carefully, including support for users who prefer reduced motion.

## Introduction to CSS Transforms

The CSS `transform` property changes the visual position, size, orientation, or shape of an element. Transforms are useful for interface details such as rotating an icon, slightly enlarging a card on hover, shifting a badge, or creating a simple 3D effect.

A transform changes how an element is painted, but it does not normally change the space reserved for it in the document's layout. For example, translating a card to the right may cause it to overlap a neighboring element, but the original layout space remains where it was. Use layout tools such as Grid and Flexbox to arrange elements; use transforms for visual adjustments and effects.

## The Coordinate Axes

A transform uses coordinate axes to describe movement and rotation:

- The **X-axis** runs horizontally. Positive translation moves right; negative translation moves left.
- The **Y-axis** runs vertically. Positive translation moves down; negative translation moves up.
- The **Z-axis** represents depth, perpendicular to the screen. Moving along it changes the element's apparent distance from the viewer in a 3D scene.

![Transform axes](./attachments/z-axis.png)

## Two-Dimensional Transforms

### Translation

Translation moves an element without changing its dimensions. `translateX()` moves horizontally, `translateY()` moves vertically, and `translate()` can move along both axes:

```css
.card:hover {
  transform: translate(0, -8px);
}

.icon {
  transform: translateX(10px);
}
```

The two values in `translate(x, y)` represent horizontal and vertical movement. A negative Y value moves the element upward.

### Rotation

The `rotate()` function rotates an element around the Z-axis in the two-dimensional plane. The value is normally expressed in degrees:

```css
.logo-mark {
  transform: rotate(15deg);
}
```

For three-dimensional rotations, CSS provides `rotateX()`, `rotateY()`, and `rotateZ()`:

```css
.card {
  transform: rotateY(20deg);
}
```

![Rotation example](./attachments/rotate.png)

### Scaling

Scaling changes an element's visual size. A value greater than `1` enlarges the element, while a value between `0` and `1` reduces it:

```css
.card:hover {
  transform: scale(1.05);
}
```

`scaleX()` changes the horizontal scale, `scaleY()` changes the vertical scale, and `scale()` can accept separate horizontal and vertical values:

```css
transform: scale(1.2, 0.8);
```

CSS also supports `scale3d(x, y, z)` and `scaleZ()` for three-dimensional transforms. A Z scale is most noticeable in a scene that uses 3D perspective and depth.

![Scaling example](./attachments/scale.png)

### Skewing

Skewing tilts an element along one or both two-dimensional axes. The functions `skewX()`, `skewY()`, and `skew()` accept angle values:

```css
.banner-shape {
  transform: skewX(-12deg);
}
```

Skewing can create decorative shapes, but it can distort text and controls. Consider applying the transform to a decorative pseudo-element or wrapper instead of the content users need to read or interact with.

![Skewing example](./attachments/skrew.png)

## Transform Origin and Combining Transforms

By default, many transforms are applied around the center of the element. The `transform-origin` property changes the point around which rotation and scaling occur:

```css
.card {
  transform-origin: top left;
  transform: rotate(3deg);
}
```

Multiple transform functions can be combined in one declaration:

```css
.card:hover {
  transform: translateY(-6px) rotate(1deg) scale(1.02);
}
```

The order of transform functions matters because each transformation affects the coordinate system used by later transformations. When an effect looks unexpected, try simplifying the transform and adding functions one at a time.

## Creating a 3D Effect

Three-dimensional transforms use the X, Y, and Z axes. The `perspective` property defines the viewer's distance from the 3D plane. A smaller perspective value creates a more pronounced perspective effect; a larger value makes the effect more subtle.

```css
.scene {
  perspective: 700px;
}

.card {
  transform: rotateY(20deg);
}
```

The `perspective` property is commonly set on a parent scene so that its transformed children share the same viewing perspective. The `perspective()` transform function is another option for applying perspective in a transform list.

The `transform-style` property controls how an element's children are rendered:

- `flat` (the default) flattens descendants into the parent's plane.
- `preserve-3d` allows transformed descendants to maintain their 3D positioning within the scene.

```css
.scene {
  perspective: 800px;
}

.card-3d {
  transform-style: preserve-3d;
  transform: rotateY(25deg);
}
```

A 3D effect is not required for every interface. Use it only when it improves the experience or helps communicate a visual idea.

## Why Transitions Are Useful

A CSS state change occurs immediately unless a transition or animation is applied. For example, a button can change its background color on hover, but the change may feel abrupt. A **transition** tells the browser to interpolate a property from its old value to its new value over a specified duration.

A transition is usually defined on the element's base state, not only on the `:hover` state. This allows the reverse transition to play when the pointer leaves the element.

### Transition Properties

A transition can be controlled through four main longhand properties:

- `transition-property` identifies the properties to animate, such as `background-color`, `opacity`, or `transform`.
- `transition-duration` defines how long the change takes.
- `transition-timing-function` defines the speed curve, such as `ease`, `linear`, `ease-in`, `ease-out`, or `ease-in-out`.
- `transition-delay` specifies how long the browser waits before starting.

```css
.button {
  background-color: #245b83;
  transform: translateY(0);
  transition: background-color 200ms ease, transform 200ms ease;
}

.button:hover {
  background-color: #173d5a;
  transform: translateY(-2px);
}
```

The `transition` shorthand combines the same values:

```css
transition: [property] [duration] [timing-function] [delay];
```

You can specify different transitions for several properties by separating them with commas. Avoid transitioning `all` by default: specifying the properties you intend to animate makes behavior more predictable and can prevent unintended effects.

## CSS Animations

A **transition** describes a change between two states, such as a normal button and its hover state. An **animation** can describe a sequence of style changes over time, including multiple intermediate steps and repeated motion.

CSS animations use the `@keyframes` rule to define the stages of the animation. The `animation` properties then determine how the browser plays those stages.

### Defining Keyframes

An animation is introduced with `@keyframes` followed by a name. Percentages represent points in the animation's timeline:

- `0%` represents the beginning.
- `50%` represents the midpoint.
- `100%` represents the end.

```css
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

The animation can then be assigned to an element:

```css
.intro {
  animation: fade-in 600ms ease-out both;
}
```

### Animation Properties

The animation behavior can be adjusted using several properties:

- `animation-name` selects the keyframes to play.
- `animation-duration` sets the length of one cycle.
- `animation-timing-function` controls the speed curve.
- `animation-delay` delays the start.
- `animation-iteration-count` defines how many times the animation repeats; `infinite` repeats continuously.
- `animation-direction` chooses whether cycles run forward, backward, or alternate.
- `animation-fill-mode` controls which animation styles apply before or after the active period.
- `animation-play-state` switches between `running` and `paused`.

The shorthand can express several of these values in one declaration:

```css
animation: fade-in 600ms ease-out 100ms 1 normal both;
```

The default fill mode is `none`. `forwards` retains the final keyframe styles after the animation finishes. `backwards` applies the starting keyframe styles during a delay. `both` combines those behaviors.

### Example: A Bouncing Ball

```html
<div class="ball" aria-hidden="true"></div>
```

```css
.ball {
  width: 48px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: tomato;
  animation: bounce 900ms ease-in-out infinite alternate;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100px);
  }
}
```

The ball moves between two vertical positions. The `alternate` direction means that each cycle plays in the opposite direction, producing continuous up-and-down movement.

## Motion, Accessibility, and Performance

Animation should support the interface, not compete with it. Excessive movement can distract users, reduce readability, or cause discomfort. Avoid flashing effects and large continuous motion unless there is a clear reason for them.

Some users enable a system preference asking websites to reduce non-essential motion. CSS can respect that preference with the `prefers-reduced-motion` media feature:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

For smoother effects, prefer animating `transform` and `opacity` when possible. Animating layout-related properties such as `width`, `height`, `top`, or `left` may require more expensive layout work. This is a useful performance guideline, not a guarantee that every transform is free.

## Key Takeaways

- Transforms change visual presentation without normally changing the layout space reserved for an element.
- Translation moves, rotation turns, scaling resizes, and skewing tilts an element.
- Perspective creates a sense of depth for 3D transforms.
- Transitions interpolate a change between states.
- Animations use `@keyframes` to describe multiple stages of movement or styling.
- Motion should be purposeful and respect reduced-motion preferences.

## Practical Project — Animated Portfolio Website

Create a portfolio website with a responsive layout. Use CSS Grid for the main page structure and Flexbox for component alignment. Add a subtle transform to project cards, smooth transitions to buttons and links, and one introductory animation using `@keyframes`.

Include a header, hero section, projects area, skills section, contact form, and footer. Use the mobile-first approach from the previous lecture. Ensure that important content does not depend on animation and that the page remains usable when reduced motion is requested.

**Reference solution:** [Animated portfolio example](https://alitigui.github.io/Front_end_solutions/Lecture7/solution/index.html)
