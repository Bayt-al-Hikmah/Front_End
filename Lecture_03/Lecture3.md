# Lecture 03 — Media, Forms, and Semantic HTML

> **Core idea:** Choose HTML elements for the meaning and interaction of the content—media, user input, page regions, and graphics.

## Learning goals
- Add images, audio, and video with useful alternatives and controls.
- Build forms with labeled fields, appropriate input types, and clear submission behavior.
- Use semantic elements, SVG, and maps where they fit the content.
## Multimedia
HTML can embed images, audio, and video alongside text and links.
### Images
Use `<img>` to embed an image. The essential attributes are:
- **`src`**: The image URL or file path.
- **`alt`**: A text alternative that communicates the image’s purpose. Use empty `alt=""` for decorative images.
- **`title`**: Optional advisory text; browsers may show it on hover. It is not a substitute for `alt` or a reliable way to provide essential information.
#### Example
```
<img src="./cat.png" title="cat image" alt="cat picture">
```
#### Working with Paths:
Relative paths resolve from the current document’s URL. Use `..` to move up one directory and a folder name to move down into it.
#### Example:
Let’s suppose we have the following folder structure:
```
project/
├── images/
│   └── cat.jpg
└── pages/
    └── index.html
```
From `pages/index.html`, reference `images/cat.jpg` in the parent directory like this:
```
<img src="../images/cat.jpg" alt="A cat">
```
#### `<figure>` and `<figcaption>`
Use `<figure>` for self-contained media or an illustration referred to from the main content. `<figcaption>` provides its caption.
```
<figure>
    <img src="cat.jpg" alt="A cat">
    <figcaption>A cat.</figcaption>
</figure>
```
### Audio
Use `<audio>` to embed sound. Common attributes:
- **`src`**: Audio URL or path; use `<source>` when offering multiple formats.
- **`controls`**: Shows the browser’s playback controls.
- **`loop`**: Repeats playback.
- **`autoplay`**: Requests automatic playback. Browsers often block audible autoplay; provide controls and do not rely on autoplay.
- **`preload`**: Hints how much data to fetch (`none`, `metadata`, or `auto`). It is a hint, not a guarantee.
#### Example
```
<audio src="audio.mp3" controls>
</audio>
```
#### ``<source>`` tag:
Use `<source>` to offer formats the browser can choose from. It improves compatibility but cannot guarantee support in every browser. `src` gives the file path; `type` gives its media type.
```
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
</audio>
```
### Video
`<video>` shares the playback attributes used by `<audio>`:
- **`src`**: Video URL or path; use `<source>` to offer alternatives.
- **`controls`**: Shows playback controls.
- **`loop`**: Repeats playback.
- **`autoplay`**: Requests automatic playback, which browsers may block. Autoplaying video is commonly muted; always consider user control and accessibility.
- **`preload`**: Hints whether to fetch no data, metadata, or more data before playback; the browser decides what to load.
- **`poster`**: Image shown before playback starts.
#### Example
```
<video src="video.mp4" controls poster="preview.jpg">
</video>
```
Offer alternative video sources with `<source>`. Provide captions with a `<track>` element when the video contains speech or other meaningful audio.
```
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogg" type="video/ogg">
</video>
```
## Forms
### Introduction
Forms collect user input and submit it for processing. `<form>` groups controls and defines where and how their successful values are sent:
- **`action`**: Destination URL.
- **`method`**: Submission method. `GET` puts named values in the URL, so use it for retrieval and shareable searches. `POST` sends values in the request body, but does not encrypt them; use HTTPS to protect data in transit.
```
<form action="/login" method="post">
  
</form>
```
### Forms Elements:
#### Text input
A single-line text field uses `<input type="text">`.
```
<input type="text">
```
#### Password input
`<input type="password">` masks the value on screen. It does not secure the value by itself; submit it over HTTPS and handle it securely on the server.
```
<input type="password">
```
#### Number input
Use `<input type="number">` for quantities where numeric stepping makes sense. `min`, `max`, and `step` set constraints; they do not replace server-side validation.
```
<input type="number" min="1" max="10" step="1">
```
#### Email input:
`<input type="email">` gives the browser an email-oriented control and basic format validation. It does not prove that an address exists.
```
<input type="email">
```
#### Search input:
`<input type="search">` is intended for search terms. The browser may give it search-specific styling or controls.
```
<input type="search" >
```
#### Url input:
`<input type="url">` accepts a URL and provides basic format validation; it does not verify that the destination exists.
```
<input type="url">
```
#### Date input:
`<input type="date">` lets users enter a date. The browser controls the picker’s appearance.
```
<input type="date">
```
#### Color input:
`<input type="color">` lets users choose a color.
```
<input type="color">
```
#### Range input:
Use `<input type="range">` when users choose an approximate value from a bounded range, such as volume. Add `min`, `max`, and `step` to define the range.
- **min**: specifies the minimum value of the range (default is 0).
- **max**: specifies the maximum value of the range (default is `100`).    
- **step**: specifies the increment or decrement step for the range. For example, if `step="10"`, the slider will move in increments of 10.
```
<input type="range" min="0" max="100" step="2">
```
#### Checkbox input:
Checkboxes allow users to select zero or more options. Give each control a `name` and a `value` so selected choices are included in the submission.
```
<input type="checkbox">
```
#### Radio input:
Radio buttons allow one choice from a group. Give the group’s controls the same `name` and each choice a distinct `value`.
```
<input type="radio">
```
#### File input:
`<input type="file">` lets users choose files. The server must validate uploaded files; the browser’s `accept` attribute is only a hint.
```
<input type="file">
```
#### Submit input:
`<input type="submit">` submits the form. A `<button type="submit">` is a flexible alternative.
```
<input type="submit">
```
### Input attributes
#### name
The `name` attribute supplies the key used when a control’s value is submitted. Controls without a `name` are generally omitted from form data.
- **Checkboxes** with the same name can submit multiple selected values.
- **Radio buttons** with the same name form a group from which the user chooses one value.
**Example: checkbox**
```
cheese: <input type="checkbox" name="toppings" >
pepperoni: <input type="checkbox" name="toppings">
```
**Example: radio**
```
male: <input type="radio" name="gender">

female: <input type="radio" name="gender">
```
#### value:
`value` sets a control’s submitted value. For text fields it may also provide the initial value; for checkboxes and radios it identifies the selected option.
**Example: text input**
```
<input type="text" name="username" value="JohnDoe">
```
**Example: checkbox**
```
<input type="checkbox" name="toppings" value="cheese">
<input type="checkbox" name="toppings" value="pepperoni">
```
**Example: radio**
```
<input type="radio" name="gender" value="male">

<input type="radio" name="gender" value="female">
```
#### required:
`required` enables browser-side constraint validation and prevents an ordinary form submission while the control is empty. Validate all input on the server as well; client-side checks can be bypassed.
#### placeholder:
`placeholder` shows a short hint inside an empty field. It disappears as the user types and is not a replacement for a persistent `<label>`.
```
<input type="text" name="username" placeholder="Enter your username">
```
#### disabled:
`disabled` prevents interaction and excludes the control from submitted form data. Use `readonly` when a text value should remain focusable and be submitted but not edited.
```
<input type="text" name="username" value="Ali" disabled>
```
#### checked:
`checked` preselects a checkbox or radio button when the page loads.
```
<input type="radio" name="gender" value="male" checked>

<input type="radio" name="gender" value="female">
```
### Labels:
Associate each control with a descriptive `<label>`. Set the label’s `for` to the control’s `id`; clicking the label activates or focuses that control.
```
 <label for="username">Username:</label>
<input type="text" id="username" name="username" required>
```
Alternatively, nest the control inside its label:
```
<label>
        <input type="checkbox" name="subscribe"> Subscribe to newsletter
</label>
```
### Text areas:
A `<textarea>` accepts multi-line text. `rows` and `cols` suggest its visible height and width; CSS can control its rendered size.
- The `rows` attribute specifies the number of visible text lines (height).
- The `cols` attribute specifies the number of visible characters per line (width).
```
<label for="comment">Comment:</label>
<textarea id="comment" name="comment" rows="5" cols="40"></textarea>
```
### Select:
`<select>` presents a list of `<option>` choices. It selects one option by default; add `multiple` when users should choose more than one.
```
<label for="country">Country:</label>
<select id="country" name="country">
    <option value="usa">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
</select>
```
### datalist:
`<datalist>` supplies suggestions for an input while still allowing custom text. Connect the input’s `list` attribute to the datalist’s `id`.
```
    <label for="fruit">Choose a fruit:</label>
    <input type="text" id="fruit" name="fruit" list="fruits">
    <datalist id="fruits">
        <option value="Apple">
        <option value="Banana">
        <option value="Orange">
        <option value="Mango">
        <option value="Strawberry">
    </datalist>
```
### buttons:
`<button>` can submit, reset, or trigger a custom action. Set `type` explicitly: `submit`, `reset`, or `button`. Inside a form, an unspecified type defaults to submit.
```
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<button type="button">Click Me</button>
```
## Semantic HTML
### Introduction
Semantic elements describe the role of their content. Prefer them when their meaning fits instead of using `<div>` for every container. Common examples include `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
### ``<nav>`` 
Use `<nav>` for a major group of navigation links. A list is useful when the links form a set of destinations.
```
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```
### ``<header>`` 
`<header>` contains introductory content for a page or section, such as a title, logo, or navigation. A document can have more than one header.
```
<header>
    <img src="logo.png" alt="Website Logo">
    <h1>Welcome to My Website</h1>
    <p>Discover amazing content and services tailored just for you.</p>
</header>
```
### ``<main>`` 
`<main>` contains the page’s dominant content. A page usually has one visible `<main>` element; it does not have to follow a `<header>` in a fixed order.
```
<main>
    <h1>About Us</h1>
    <p>We are a company dedicated to providing high-quality services.</p>

    <section>
        <h2>Our Services</h2>
        <p>Here are the services we offer...</p>
    </section>

    <article>
        <h2>Customer Testimonials</h2>
        <p>Read what our customers have to say about us.</p>
    </article>
</main>
```
### ``<article>`` 
Use `<article>` for a self-contained composition that could stand on its own, such as a post, news story, or product review.
```
<article>
    <h2>How to Use Semantic HTML</h2>
    <p>Semantic HTML is essential for creating accessible and well-structured web pages...</p>
</article>
```
### ``<section>`` 
Use `<section>` for a thematic group of related content, usually with its own heading. It can appear wherever that section belongs in the document, not only inside `<main>`.
```
<form>
    <section>
        <h3>Personal Information</h3>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
    </section>
    <section>
        <h3>Contact Information</h3>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
    </section>
</form>
```
### ``<aside>``
`<aside>` contains complementary content related to the surrounding page or section, such as a sidebar or pull quote.
### ``<footer>``
`<footer>` contains closing or supporting information for its page or section, such as copyright details or related links. It is not limited to the bottom of the document.
```
<footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
    <p>Contact: <a href="mailto:info@example.com">info@example.com</a></p>
    <nav>
        <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
        </ul>
    </nav>
```
### Comment
HTML comments (`<!-- ... -->`) are notes in the source code. Browsers do not render them as page content, but users can still inspect them in the source.
```
<!--
comment here
-->
```
### `<details>` and `<summary>`
`<details>` creates a disclosure widget. Put its visible label in the first-child `<summary>`; the remaining content can be shown or hidden by the browser.
```
<details>
    <summary>Click to expand</summary>
    <p>This is the hidden content that will be revealed when the summary is clicked.</p>
</details>
```
## SVG and image maps
### SVG
**Scalable Vector Graphics (SVG)** describes graphics with shapes and paths rather than a fixed grid of pixels. It scales cleanly and is useful for icons, diagrams, and illustrations. SVG can be embedded in HTML or loaded as an image.
#### Creating SVG
Use `<svg>` to define a coordinate space and its dimensions. Add elements such as `<circle>`, `<rect>`, `<line>`, `<text>`, and `<path>` inside it.
#### Drawing lines
`<line>` draws a segment from (`x1`, `y1`) to (`x2`, `y2`). `stroke` sets its color; `stroke-width` sets its thickness.


**Example:**
```
<svg width="200" height="200">
    <line x1="10" y1="10" x2="190" y2="190" stroke="black" stroke-width="2" />
</svg>
```
In the default SVG coordinate system, `(0, 0)` is at the top left; x increases to the right and y increases downward.
#### Drawing rectangles
`<rect>` draws a rectangle positioned by `x` and `y`, sized by `width` and `height`, and styled with `fill`, `stroke`, and `stroke-width`.


**Example**:
```
<svg width="200" height="200">
    <rect x="10" y="10" width="180" height="180" fill="lightblue" stroke="black" stroke-width="2" />
</svg>
```
#### Drawing a circle
`<circle>` uses `cx` and `cy` for its center and `r` for its radius. Use `fill`, `stroke`, and `stroke-width` to style it.


**Example:**
```
<svg width="200" height="200">
    <circle cx="100" cy="100" r="50" fill="lightblue" stroke="black" stroke-width="2" />
</svg>
```
#### Writing text:
`<text>` draws text at (`x`, `y`), where `y` marks the baseline. `font-family`, `font-size`, and `fill` control its appearance.


**Example:**
```
<svg width="200" height="100">
    <text x="10" y="50" font-family="Arial" font-size="20" fill="black">Hello!</text>
</svg>
```
#### Working with path
Use `<path>` for shapes described by drawing commands in its `d` attribute. `fill`, `stroke`, and `stroke-width` style the result. Common path commands include:
    - **`M` (Move To)**: Moves the pen to a specific point without drawing.
    - **`L` (Line To)**: Draws a straight line to a specific point.
    - **`C` (Curve To)**: Draws a cubic Bézier curve.
    - **`S` (Smooth Curve To)**: Draws a smooth cubic Bézier curve.    
    - **`Z` (Close Path)**: Closes the path by drawing a line back to the starting point.

  
**Example**:    
creating triangle
```
<svg width="200" height="200">
    <path d="M100 10 L190 190 L10 190 Z" fill="lightblue" stroke="black" stroke-width="2" />
</svg>
```
- **`M100 10`**: Move the pen to the starting position `(100, 10)`.
- **`L190 190`**: Draw a line from the current position to `(190, 190)`.
- **`L10 190`**: Draw a line from the current position to `(10, 190)`.
- **`Z`**: Close the path by drawing a line back to the starting point.


**output:**
```svg
<svg width="200" height="200">
    <path d="M100 10 L190 190 L10 190 Z" fill="lightblue" stroke="black" stroke-width="2" />
    </svg>
```
### Image maps
An image map defines clickable regions on an image. Set the image’s `usemap` to `#name`, then add a `<map name="name">` containing one `<area>` for each region.
```
<img src="world-map.jpg" alt="World Map" usemap="#worldmap">
<map name="worldmap">
 <!--
 here we declare the areas
 -->
</map>
```
#### Defining areas
An `<area>` can use these attributes:
1. **`href`**: Specifies the link that the user will navigate to when clicking on the area.
2. **`alt`**: Names the link or action for assistive technology; it does not replace the image’s own `alt` text.
3. **`shape`**: Defines the shape of the clickable area. It can be one of the following:
    - `rect` (rectangle)
    - `circle` (circle)
    - `poly` (polygon)
4. **`coords`**: Specifies the coordinates of the area. The format of the coordinates depends on the chosen shape:
    - For `rect`: `x1,y1,x2,y2` (top-left and bottom-right corners).
    - For `circle`: `x,y,radius` (center coordinates and radius).
    - For `poly`: `x1,y1,x2,y2,x3,y3,...` (vertices of the polygon).


Coordinates are measured against the image’s intrinsic dimensions, which makes image maps harder to maintain with responsive scaling. A visual editor can help generate polygon coordinates; verify the result at different sizes and provide equivalent accessible links when needed.

**Example :**
```
  <img src="world-map.jpg" alt="World Map" usemap="#worldmap">
  <map name="worldmap">
    <area shape="rect" coords="50,50,200,200" href="north-america.html" alt="North America">

    <area shape="circle" coords="300,150,50" href="europe.html" alt="Europe">
    <area shape="poly" coords="400,50,450,100,400,150,350,100" href="asia.html" alt="Asia">
  </map>
```
## Task
#### Objective:
Create a basic travel website with multiple pages, incorporating multimedia, forms, semantic HTML, and SVG.
#### Pages:
1. **Home Page (index.html):**    
    - Show a header with a navigation bar.
    - Include a large image or a video showcasing a travel destination.
    - Add a brief introduction to the website using semantic HTML (`<main>`, `<article>`, `<section>`).
    - Include a form to subscribe to a newsletter (email input, submit button).
    - Add a footer with copyright information and links to the "About Us" and "Contact Us" pages.
2. **Destinations Page (destinations.html):**
    - Show a header with a navigation bar.
    - Display a list of travel destinations. Each destination should be presented as a `<figure>` with an `<img>` and a `<figcaption>`.
    - Use an image map on one of the destination images to link to more details about specific areas within that destination.
    - Include a simple audio player with a relaxing travel-themed song.
3. **Booking Page (booking.html):**
    - Show a header with a navigation bar.
    - Create a booking form with the following fields:
        - Name (text input, required, with placeholder)
        - Email (email input, required)
        - Destination (select dropdown with a few destination options)
        - Travel Date (date input)
        - Number of Travelers (number input, with min and max)
        - Comments (textarea)
        - Preferences (checkboxes for options like "Window Seat," "Vegetarian Meal")
        - Travel Type (radio buttons for "Business," "Leisure")
        - Submit button
    - Use `<label>` tags to clearly associate labels with form fields.
4. **About Us Page (about.html):**
    - Show a header with a navigation bar.
    - Provide information about the travel agency using semantic HTML (`<main>`, `<article>`, `<section>`).
    - Include an SVG graphic (e.g., a simple airplane or globe) created using `<svg>`, `<path>`, or other SVG elements.
    - Use `<details>` and `<summary>` to add expandable sections for FAQs.
5. **Contact Us Page (contact.html):**
    - Show a header with a navigation bar.
    - Include contact information (address, phone, email).
    - Add a simple contact form (name, email, message textarea, submit button).
#### Requirements:
- **Multimedia:**
    - Use `<img>`, `<audio>`, and `<video>` tags.
    - Demonstrate correct use of `src`, `alt`, `title`, `controls`, `autoplay`, `loop`, `poster`, and `<source>` tags.
    - Use `<figure>` and `<figcaption>` where appropriate.
    - Practice using relative file paths for images and other media.
- **Forms:**
    - Implement all the form elements mentioned in the lecture (text, password, number, email, etc.).
    - Use appropriate attributes (`name`, `value`, `required`, `placeholder`, `disabled`, `checked`).
    - Use `<label>`, `<textarea>`, `<select>`, `<option>`, `<datalist>`, and `<button>` tags.
    - Organize the forms logically.
- **Semantic HTML:**
    - Structure the pages using `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>` (if applicable), and `<footer>`.
    - Use HTML comments (`<!-- ... -->`) to annotate source code; browsers do not display them as page content.
    - Employ `<details>` and `<summary>` where suitable.
- **SVG and Maps:**
    - Create a simple SVG graphic.
    - Implement an image map on one of the images.
    - Use the `<map>`, `<area>`, `usemap`, `shape`, and `coords` attributes.
#### Solution:
You can find our solution here: https://alitigui.github.io/Front_end_solutions/Lecture3/solution/index.html
