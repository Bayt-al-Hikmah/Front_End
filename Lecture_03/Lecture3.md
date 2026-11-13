## Learning Objectives

By the end of this lecture, students should be able to:

- Add images, audio, and video to an HTML page.
- Organize media files using relative paths.
- Build forms with appropriate input types and labels.
- Explain the purpose of common form attributes.
- Structure pages using semantic HTML elements.
- Create basic SVG graphics and clickable image-map areas.

## Adding Multimedia to a Web Page

A web page is not limited to text and links. HTML also provides elements for displaying images, playing audio, and embedding video. Multimedia can make a page more informative and engaging, but it should support the content rather than distract from it. Developers should also consider performance, accessibility, and the user's control over playback.

### Images

The `<img>` element embeds an image into a page. It is a void element, which means it does not have a closing tag. Its most important attributes are `src` and `alt`.

- `src` identifies the image file or URL.
- `alt` provides a text alternative that communicates the image's purpose when the image cannot be seen.
- `width` and `height` can reserve the correct layout space and help prevent unexpected movement while an image loads.
- `title` may provide advisory information, but it is not a replacement for meaningful `alt` text.

```html
<img
  src="images/cat.jpg"
  alt="A ginger cat sitting beside a window"
  width="600"
  height="400"
>
```

The alternative text should describe the information the image contributes to the page. If an image is purely decorative and adds no meaningful information, use an empty alternative text (`alt=""`) so that screen readers can skip it. Avoid writing phrases such as “image of” unless that information is genuinely useful.

#### Understanding File Paths

The `src` attribute can contain an absolute URL or a relative path. A relative path is resolved from the location of the current HTML file.

Consider this project structure:

```text
project/
├── images/
│   └── cat.jpg
└── pages/
    └── gallery.html
```

Because `gallery.html` is inside the `pages` folder, it must move up one directory and then enter `images` to find the picture:

```html
<img src="../images/cat.jpg" alt="A cat sitting beside a window">
```

The sequence `..` means “the parent directory.” A path such as `images/cat.jpg` would only be correct if the HTML file were located in the `project` directory.

#### Figures and Captions

When an image or illustration is a self-contained part of the content and needs a caption, use `<figure>` and `<figcaption>`:

```html
<figure>
  <img src="images/paris.jpg" alt="The Eiffel Tower viewed from a nearby street">
  <figcaption>The Eiffel Tower in Paris.</figcaption>
</figure>
```

The `<figure>` element can contain images, diagrams, code examples, or other self-contained content. Its caption provides context for the item.

### Audio and Video

The `<audio>` element embeds an audio player. The `controls` attribute allows users to play, pause, and adjust the audio. Other attributes include `loop` to repeat playback and `preload` to provide a hint about loading behavior.

```html
<audio controls preload="metadata">
  <source src="media/podcast.mp3" type="audio/mpeg">
  <source src="media/podcast.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
```

The `<source>` elements allow the browser to select a format it supports. The text after the source elements is fallback content for browsers that cannot play the audio element.

The `preload` attribute accepts `none`, `metadata`, or `auto`. It is a hint to the browser, not a guarantee that the entire file will be downloaded immediately. Avoid autoplaying audio. Unexpected sound can be disruptive, and many browsers restrict autoplay with sound. Users should remain in control of playback.

The `<video>` element works in a similar way, but it displays a video player. The `poster` attribute specifies an image to show before playback begins.

```html
<video controls width="640" poster="images/video-poster.jpg" preload="metadata">
  <source src="media/travel-video.mp4" type="video/mp4">
  <source src="media/travel-video.webm" type="video/webm">
  Your browser does not support embedded video.
</video>
```

For accessibility, provide captions for spoken content when appropriate, and do not rely on video alone to communicate important information. Large media files can slow a page, so choose suitable formats, dimensions, and loading strategies.

## HTML Forms

Forms provide a standard way to collect information from users. They are used in login pages, registration forms, search tools, booking systems, surveys, and contact pages.

The `<form>` element groups the controls and defines where and how the submitted data should be sent. Two important attributes are:

- `action`: the URL that receives the submitted form data.
- `method`: the HTTP method used to submit the form, commonly `get` or `post`.

```html
<form action="/contact" method="post">
  <!-- Form controls are placed here. -->
</form>
```

A GET form places its form data in the URL, which makes it suitable for searches and other requests that retrieve information. A POST form sends its data in the request body and is commonly used when submitting or changing information. **POST does not encrypt data.** HTTPS is required to protect data while it travels between the browser and server, and the server must still validate and handle the submitted information securely.

### Common Input Types

The `<input>` element supports several types. Choosing an appropriate type helps the browser provide a suitable control and basic validation.

```html
<form action="/register" method="post">
  <label for="full-name">Full name</label>
  <input type="text" id="full-name" name="fullName" required>

  <label for="email">Email address</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Password</label>
  <input type="password" id="password" name="password" required>

  <label for="age">Age</label>
  <input type="number" id="age" name="age" min="10" max="100">

  <label for="website">Website</label>
  <input type="url" id="website" name="website">

  <label for="search">Search</label>
  <input type="search" id="search" name="search">

  <label for="start-date">Start date</label>
  <input type="date" id="start-date" name="startDate">

  <label for="theme">Choose a theme color</label>
  <input type="color" id="theme" name="theme" value="#336699">

  <label for="rating">Rating</label>
  <input type="range" id="rating" name="rating" min="1" max="10" value="5">

  <button type="submit">Create account</button>
</form>
```

Other useful input types include `checkbox`, `radio`, `file`, `tel`, `time`, `datetime-local`, and `hidden`. Use the type that best matches the information being collected. For example, the color picker must use `type="color"`, not `type="date"`.

### Labels and the `name` Attribute

Every form control that asks the user for information should have a clear label. A label can be associated with a control by using the same value in the label's `for` attribute and the control's `id` attribute.

```html
<label for="city">City</label>
<input type="text" id="city" name="city">
```

The `name` attribute is especially important because it identifies the field when the form is submitted. An input with an `id` but no `name` is not normally included in the submitted form data.

### Common Form Attributes

The following attributes control how a form field behaves:

- `required` prevents submission until the field has a value that satisfies the control's basic requirements.
- `placeholder` displays a short hint inside an empty field. It should not replace a visible label.
- `value` defines an initial or submitted value, depending on the input type.
- `min`, `max`, and `step` define numeric or date constraints where supported.
- `checked` marks a checkbox or radio button as selected initially.
- `disabled` makes a control unavailable and excludes it from normal form submission.
- `readonly` prevents the user from editing a value while keeping it part of form submission.

```html
<label for="quantity">Quantity</label>
<input type="number" id="quantity" name="quantity" min="1" max="20" value="1" required>

<label>
  <input type="checkbox" name="newsletter" value="yes" checked>
  Subscribe to the newsletter
</label>
```

Browser validation is useful, but it is not a security boundary. The server must validate all submitted data because clients can modify requests or bypass browser-side checks.

### Checkboxes and Radio Buttons

A **checkbox** is appropriate when users may select multiple independent options. A **radio group** is appropriate when the user must select one option from a set. Radio buttons belong to the same group when they share the same `name` value.

```html
<fieldset>
  <legend>Additional options</legend>
  <label><input type="checkbox" name="extras" value="window"> Window seat</label>
  <label><input type="checkbox" name="extras" value="meal"> Special meal</label>
</fieldset>

<fieldset>
  <legend>Travel type</legend>
  <label><input type="radio" name="travelType" value="business" required> Business</label>
  <label><input type="radio" name="travelType" value="leisure"> Leisure</label>
</fieldset>
```

`<fieldset>` groups related controls, while `<legend>` provides a caption for that group.

### Text Areas, Select Menus, Datalists, and Buttons

Use `<textarea>` when users need to enter multiple lines of text:

```html
<label for="message">Message</label>
<textarea id="message" name="message" rows="5" required></textarea>
```

Use `<select>` and `<option>` to provide a list of choices:

```html
<label for="destination">Destination</label>
<select id="destination" name="destination" required>
  <option value="">Choose a destination</option>
  <option value="paris">Paris</option>
  <option value="tokyo">Tokyo</option>
  <option value="new-york">New York</option>
</select>
```

A `<datalist>` provides suggestions while still allowing the user to enter a value that is not in the list:

```html
<label for="browser">Preferred browser</label>
<input id="browser" name="browser" list="browsers">
<datalist id="browsers">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Safari">
</datalist>
```

Use `<button>` to create an interactive button. Inside a form, specify its `type` so that its behavior is clear:

```html
<button type="submit">Send</button>
<button type="reset">Clear form</button>
<button type="button">Open details</button>
```

A button without an explicit type inside a form generally behaves as a submit button. Being explicit helps prevent accidental form submission.

## Semantic HTML

Semantic HTML means choosing elements according to the meaning and role of the content, rather than choosing them only for their default appearance. A semantic page is easier for browsers, search engines, developers, and assistive technologies to understand.

The most common semantic elements include:

- `<header>` introduces a page or a section. It may contain a logo, title, or introductory content.
- `<nav>` contains a group of major navigation links.
- `<main>` contains the page's primary content. A page should normally have one main element.
- `<section>` groups related content under a common topic, usually with a heading.
- `<article>` represents a self-contained piece of content that could make sense independently, such as a news story or blog post.
- `<aside>` contains related but secondary information, such as a sidebar or note.
- `<footer>` contains closing information for a page or section, such as copyright details or related links.

A simple page structure might look like this:

```html
<body>
  <header>
    <h1>Travel Journal</h1>
    <nav aria-label="Main navigation">
      <a href="index.html">Home</a>
      <a href="destinations.html">Destinations</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Discover Paris</h2>
      <p>Paris offers museums, historic streets, and remarkable architecture.</p>
    </article>
    <aside>
      <h2>Travel tip</h2>
      <p>Check local transport options before your visit.</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Travel Journal</p>
  </footer>
</body>
```

Use a `<section>` when you are grouping content by topic, and use an `<article>` when the content is independently meaningful. Do not add semantic elements simply to make the page look organized; the chosen element should fit the content's role.

### Comments and Disclosure Widgets

HTML comments allow developers to leave notes in source code. They are not displayed as page content:

```html
<!-- Main navigation begins here -->
<nav>
  <!-- Navigation links go here -->
</nav>
```

The `<details>` element creates a disclosure widget that users can open and close. The `<summary>` element provides its visible label:

```html
<details>
  <summary>What is HTML?</summary>
  <p>HTML describes the structure and meaning of web content.</p>
</details>
```

This is useful for frequently asked questions or optional supporting information.

## SVG Graphics

**Scalable Vector Graphics (SVG)** is a format for describing two-dimensional graphics using shapes, paths, text, and other drawing instructions. Unlike raster images, SVG graphics can scale to different sizes without becoming pixelated. SVG is useful for logos, icons, diagrams, and simple illustrations.

An SVG drawing uses a coordinate system. The top-left corner is normally `(0, 0)`. Increasing the x-coordinate moves to the right, while increasing the y-coordinate moves downward.

### A Basic SVG Canvas

The `<svg>` element defines the drawing area. The following example creates a blue rectangle:

```html
<svg width="220" height="140" viewBox="0 0 220 140" role="img" aria-labelledby="rect-title">
  <title id="rect-title">A blue rectangle</title>
  <rect x="20" y="20" width="180" height="100" fill="lightblue" stroke="black" stroke-width="2" />
</svg>
```

The `viewBox` defines the coordinate system used for the drawing. It allows the SVG to scale while preserving the internal proportions. The `<title>` element provides an accessible name for the graphic when needed.

### Common SVG Shapes

SVG includes elements for common shapes. A line is created with `<line>`, a rectangle with `<rect>`, and a circle with `<circle>`.

```html
<svg width="220" height="160" viewBox="0 0 220 160">
  <line x1="10" y1="10" x2="210" y2="10" stroke="black" stroke-width="3" />
  <rect x="20" y="30" width="80" height="60" fill="lightblue" stroke="black" />
  <circle cx="160" cy="60" r="30" fill="tomato" />
  <text x="20" y="130" font-size="18" fill="black">SVG example</text>
</svg>
```

The `<text>` element places text at a coordinate. The `x` and `y` attributes identify the starting point and baseline position. Properties such as `fill`, `stroke`, and `stroke-width` control the appearance of shapes.

### Creating More Complex Shapes with `<path>`

The `<path>` element describes a shape using commands inside its `d` attribute. Common commands include:

- `M` — move to a coordinate without drawing.
- `L` — draw a straight line to a coordinate.
- `H` and `V` — draw horizontal or vertical lines.
- `C` — draw a cubic Bézier curve.
- `Z` — close the current path.

For example, this code creates a triangle:

```html
<svg width="200" height="180" viewBox="0 0 200 180">
  <path d="M100 10 L190 160 L10 160 Z"
        fill="lightblue" stroke="black" stroke-width="2" />
</svg>
```

The path begins at `(100, 10)`, draws a line to `(190, 160)`, then to `(10, 160)`, and finally closes the shape.

## Image Maps

An **image map** defines clickable regions within a single image. It can be useful for diagrams or maps where different areas lead to different pages. The image is connected to a `<map>` element using the `usemap` attribute. Each `<area>` element defines one clickable region.

```html
<img src="images/world-map.jpg" alt="World map with links to regional travel guides" usemap="#worldmap" width="600">

<map name="worldmap">
  <area shape="rect" coords="50,50,200,160" href="north-america.html" alt="North America">
  <area shape="circle" coords="320,100,40" href="europe.html" alt="Europe">
  <area shape="poly" coords="390,40,500,70,470,150,410,130" href="asia.html" alt="Asia">
</map>
```

The `shape` attribute identifies the region's geometry: `rect` for a rectangle, `circle` for a circle, and `poly` for a polygon. The `coords` attribute supplies the coordinates for the selected shape. Coordinates are measured relative to the image's original dimensions, so resizing or making the image responsive can require additional care.

Image maps are less common in modern responsive interfaces than ordinary links, buttons, or SVG-based interactive graphics. They are still worth understanding because they demonstrate how images can contain multiple interactive regions.

## Key Takeaways

- Use `alt` text to communicate the purpose of meaningful images.
- Relative paths are resolved from the current HTML file's location.
- Audio and video controls should let users control playback.
- Use labels, names, and suitable input types when building forms.
- Browser-side validation improves usability but does not replace server-side validation.
- Semantic HTML gives content a meaningful structure.
- SVG is useful for scalable diagrams and graphics.
- Image maps define clickable regions inside an image.

## Practical Project — A Small Travel Website

Create a simple multi-page travel website using the topics from this lecture. Keep the visual design basic for now; the focus is on correct HTML structure and functionality.

### Required Pages

1. **Home (`index.html`)** — Add a header with navigation, a hero image or video, a short introduction, a newsletter form, and a footer.
2. **Destinations (`destinations.html`)** — Display destinations using `<figure>` and `<figcaption>`. Include an audio player and one image map.
3. **Booking (`booking.html`)** — Build a booking form with name, email, destination, travel date, number of travelers, comments, preferences, and travel type. Use labels for every field.
4. **About (`about.html`)** — Describe the travel agency using semantic elements. Add a simple SVG graphic and an FAQ using `<details>` and `<summary>`.
5. **Contact (`contact.html`)** — Show contact details and a contact form.

### Requirements

Use images, audio, and video where appropriate. Demonstrate correct use of relative paths, `alt`, `controls`, `poster`, and `<source>`. Include common form controls and attributes such as `required`, `placeholder`, `checked`, and `disabled`. Organize each page with semantic HTML elements. Create a small SVG illustration and add an image map to one destination image.

**Reference solution:** [Travel website example](https://alitigui.github.io/Front_end_solutions/Lecture3/solution/index.html)
