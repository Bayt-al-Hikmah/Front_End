## Learning Objectives

By the end of this lecture, students should be able to:

- Explain the role of HTML in front-end development.
- Create a valid HTML5 document.
- Distinguish document metadata from visible page content.
- Use headings, paragraphs, lists, links, and text elements appropriately.
- Group content with `div`, `span`, and semantic elements.
- Build accessible data tables using table headers and captions.

## Introduction to HTML

**HTML (HyperText Markup Language)** is the standard markup language used to describe the structure and meaning of content on the Web. It tells the browser what each part of a page represents: a heading, a paragraph, a list, a link, an image, a form, or another kind of content.

HTML is a **markup language**, not a programming language. It describes content and document structure rather than providing general-purpose programming logic. CSS is responsible for presentation, while JavaScript is responsible for interactive behavior.

HTML documents are written using **elements**. Most elements have an opening tag, content, and a closing tag. For example:

```html
<p>This is a paragraph.</p>
```

Here, `<p>` is the opening tag, `</p>` is the closing tag, and the text between them is the content. Some elements are **void elements**, which do not wrap content and therefore do not have closing tags. Examples include `<img>`, `<br>`, `<hr>`, and `<input>`.

Elements can also have **attributes**, which provide additional information or configuration. An attribute is written inside the opening tag:

```html
<a href="https://example.com">Visit Example</a>
```

In this example, `href` tells the browser where the link should lead. Attribute values are usually placed inside quotation marks.

## The Basic Structure of an HTML Document

A browser can display a small HTML fragment, but a complete page should use a clear document structure. The `<!DOCTYPE html>` declaration tells the browser to interpret the document using modern HTML standards. The `<html>` element is the root of the document and contains two main areas: `<head>` and `<body>`.

- The **`<head>`** contains metadata and references to resources such as stylesheets. Most of its contents are not displayed as page content.
- The **`<body>`** contains the content that users read and interact with.

A good starting template is:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A short description of this webpage.">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>This is my first HTML page.</p>
</body>
</html>
```

The `lang` attribute identifies the main language of the document. The character-set declaration ensures that the browser interprets characters correctly. The viewport metadata helps the page scale appropriately on mobile devices. The `<title>` element supplies the page title shown in the browser tab and is also useful to assistive technologies and search engines.

## Understanding the `<head>` Element

The `<head>` section provides information about the document and connects it to resources that the browser needs. It is not a place for the main visible content of the page.

### The Page Title and Metadata

The `<title>` element defines the page title:

```html
<title>Student Portfolio | Home</title>
```

The `<meta>` element provides metadata. The most useful metadata for a beginner to recognize includes:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Projects and information about a student web developer.">
<meta name="author" content="Student Name">
```

A description may be used by search engines when presenting a page in search results, although search engines decide how to display their snippets. The old `keywords` metadata is generally not a meaningful ranking tool for major search engines, so it should not be treated as a required optimization technique.

### Social Sharing Metadata

When a page is shared on a social platform, metadata can help determine the title, description, and image shown in the preview. Open Graph metadata is commonly used for this purpose:

```html
<meta property="og:title" content="Student Portfolio">
<meta property="og:description" content="Explore my projects and skills.">
<meta property="og:image" content="https://example.com/preview.jpg">
```

Some platforms also recognize Twitter/X card metadata. These tags are useful when a website needs controlled sharing previews, but they are not required for a simple first page.

### Linking External Resources with `<link>`

The `<link>` element connects the document to related external resources. A front-end developer most often uses it to attach a CSS file or define a favicon.

```html
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="images/favicon.png" type="image/png">
```

The `rel` attribute explains the relationship between the page and the resource. Other uses include alternate language versions, RSS feeds, and preloading critical resources. These advanced uses should be introduced when the project needs them rather than added to every page by default.

### Internal and External Scripts

JavaScript can be placed directly inside a `<script>` element, but larger projects are easier to maintain when the code is stored in an external `.js` file.

```html
<script>
  console.log("Hello from the page");
</script>
```

For an external script, use:

```html
<script src="scripts/main.js" defer></script>
```

The `defer` attribute tells the browser to download the script while parsing the HTML and execute it after the document has been parsed. This is a useful default for many classic external scripts because the JavaScript can safely work with elements declared in the page.

### The `<style>`, `<base>`, and `<noscript>` Elements

The `<style>` element allows CSS to be written inside the document's head:

```html
<style>
  body {
    font-family: Arial, sans-serif;
  }
</style>
```

For small demonstrations this is convenient, but external stylesheets are usually easier to organize and reuse as a project grows.

The `<base>` element can define a base URL or default link target for relative URLs in a document. Because it changes how relative links are resolved across the page, it should be used carefully. A beginner project rarely needs it.

The `<noscript>` element provides fallback content when scripting is unavailable or disabled. It can display a message explaining that a feature requires JavaScript:

```html
<noscript>
  <p>This application requires JavaScript to provide its full functionality.</p>
</noscript>
```

## Working with Content in the `<body>`

The body contains the content that forms the visible page. HTML provides elements for headings, paragraphs, lists, links, quotations, and other common content types. Choosing elements based on their meaning makes a document easier to read, maintain, and navigate.

### Headings and Paragraphs

HTML provides six heading levels, from `<h1>` to `<h6>`. They communicate the hierarchy of the content: `<h1>` is the main heading, while lower levels introduce subsections.

```html
<h1>Introduction to Web Development</h1>
<p>Web development combines several technologies to create websites and applications.</p>

<h2>Front-End Development</h2>
<p>Front-end developers build the interface users interact with.</p>

<h3>Core Technologies</h3>
<p>HTML, CSS, and JavaScript are the foundation of front-end development.</p>
```

Headings should represent the document's structure, not simply provide a larger font size. Avoid choosing a heading level only because its default appearance looks suitable; CSS can change how any heading looks.

The `<p>` element represents a paragraph. Browsers normally place space between paragraphs, separating distinct ideas into readable blocks.

### Line Breaks and Thematic Breaks

The `<br>` element creates a line break inside content where a line break is meaningful, such as an address or a poem. It should not be used repeatedly to create page spacing; CSS is the correct tool for controlling layout and spacing.

The `<hr>` element represents a thematic change between sections of content. Browsers commonly display it as a horizontal line, but its meaning is more important than its appearance.

### Emphasis and Text Meaning

HTML provides elements that communicate the meaning of text:

- `<strong>` indicates strong importance.
- `<em>` indicates stress emphasis.
- `<b>` draws attention without adding the same importance as `<strong>`.
- `<i>` marks text that is set apart from normal prose, such as a technical term or a phrase in another language.
- `<u>` marks a non-textual annotation, although underlining should be used carefully because users often interpret underlined text as a link.
- `<sup>` and `<sub>` represent superscript and subscript text.

```html
<p><strong>Important:</strong> Save your work before closing the editor.</p>
<p>You should <em>always</em> test your page in a browser.</p>
<p>Water is written as H<sub>2</sub>O.</p>
<p>Einstein's equation is E = mc<sup>2</sup>.</p>
```

For characters that have a special meaning in HTML, use character references. For example, `&lt;` displays `<`, `&gt;` displays `>`, and `&amp;` displays `&`. The `&copy;` reference displays the copyright symbol.

### Lists

Lists organize related items and make information easier to scan. HTML supports three common list structures:

An **unordered list** uses `<ul>` when the order of the items is not important. Each item is placed inside an `<li>` element:

```html
<h2>Technologies</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

An **ordered list** uses `<ol>` when the sequence matters, such as instructions or steps:

```html
<ol>
  <li>Create the HTML file.</li>
  <li>Add the page structure.</li>
  <li>Open the file in a browser.</li>
</ol>
```

A **description list** uses `<dl>` to associate terms with descriptions. Each term is written with `<dt>` and its description with `<dd>`:

```html
<dl>
  <dt>HTML</dt>
  <dd>Defines the structure and meaning of webpage content.</dd>
  <dt>CSS</dt>
  <dd>Controls the visual presentation of webpage content.</dd>
</dl>
```

Lists can also be nested. A nested list should be placed inside the `<li>` item to which it belongs.

### Classes and IDs

HTML attributes let us identify elements so that CSS and JavaScript can work with them. The `class` attribute is used to group one or more elements under a shared name. Multiple elements can use the same class, and one element can have multiple class names.

```html
<p class="notice important">Read the instructions carefully.</p>
<p class="notice">Your changes have been saved.</p>
```

The `id` attribute identifies one particular element in a document. An ID should be unique within the page.

```html
<section id="contact">
  <h2>Contact</h2>
</section>
```

Classes are commonly used for styling groups of elements. IDs are useful for unique targets, such as a section that a link scrolls to.

### Links and Navigation

The `<a>` element creates a hyperlink. Its `href` attribute defines the destination:

```html
<a href="https://developer.mozilla.org/">Read the MDN documentation</a>
```

A link can point to another website, another file, a location within the current page, an email address, or a phone number.

```html
<!-- Link to another page -->
<a href="about.html">About Us</a>

<!-- Link to a section on the current page -->
<a href="#projects">View Projects</a>

<!-- Email link -->
<a href="mailto:hello@example.com">Send an email</a>

<!-- Phone link -->
<a href="tel:+213123456789">Call us</a>
```

For a link that opens a new tab, use `target="_blank"`. It is good practice to include `rel="noopener"` as well:

```html
<a href="https://example.com" target="_blank" rel="noopener">
  Open Example in a new tab
</a>
```

Use meaningful link text. A label such as “Read the course outline” is more informative than “Click here,” especially for users navigating with assistive technologies.

### Generic Containers: `<div>` and `<span>`

The `<div>` element is a generic block container. It groups related elements when no more meaningful semantic element is appropriate. Developers commonly use it to create layout containers or apply a shared class.

The `<span>` element is a generic inline container. It is useful for targeting a small piece of text without creating a separate block.

```html
<div class="card">
  <h2>HTML</h2>
  <p>HTML provides the <span class="highlight">structure</span> of a page.</p>
</div>
```

These elements do not communicate a specific meaning by themselves. When an element such as `<header>`, `<nav>`, `<main>`, or `<section>` more accurately describes the content, prefer that semantic element.

### Block and Inline Display Behavior

By default, many HTML elements behave as **block-level** or **inline** elements. Block elements normally begin on a new line and occupy the available width of their containing block. Paragraphs, headings, and `<div>` elements are common examples.

Inline elements normally flow within the surrounding text and occupy only the space their content needs. `<a>`, `<strong>`, `<em>`, and `<span>` are common examples.

These are default display behaviors, not permanent limitations. CSS can change an element's display mode using properties such as `display: block`, `display: inline`, `display: inline-block`, `display: flex`, and `display: grid`. We will explore these properties in the CSS lectures.

## Creating Tables

HTML tables represent **tabular data**: information organized into rows and columns. They should not be used to create the overall layout of a webpage. Modern page layouts should use CSS Grid or Flexbox, which are covered in later lectures.

A basic table uses:

- `<table>` as the table container.
- `<tr>` to create a row.
- `<th>` for a header cell.
- `<td>` for a data cell.

```html
<table>
  <caption>Student Results</caption>
  <thead>
    <tr>
      <th scope="col">Student</th>
      <th scope="col">Subject</th>
      <th scope="col">Grade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Amira</th>
      <td>Mathematics</td>
      <td>18</td>
    </tr>
    <tr>
      <th scope="row">Yacine</th>
      <td>Science</td>
      <td>16</td>
    </tr>
  </tbody>
</table>
```

The `<caption>` gives the table a title. The `<thead>`, `<tbody>`, and `<tfoot>` elements group the table's header, main content, and footer. The `scope` attribute on header cells helps browsers and assistive technologies associate headers with their corresponding data cells.

### Merging Cells with `colspan` and `rowspan`

The `colspan` attribute makes one cell span multiple columns. It is useful for a heading that groups related columns or a timetable break that covers several day columns.

```html
<table>
  <tr>
    <th colspan="2">Student Name</th>
    <th>Grade</th>
  </tr>
  <tr>
    <td>Amira</td>
    <td>Benali</td>
    <td>18</td>
  </tr>
</table>
```

The `rowspan` attribute makes a cell span multiple rows. For example, a subject that continues through two time periods can occupy both rows:

```html
<table>
  <tr>
    <th>Time</th>
    <th>Monday</th>
  </tr>
  <tr>
    <td>08:00–09:00</td>
    <td rowspan="2">Mathematics</td>
  </tr>
  <tr>
    <td>09:00–10:00</td>
  </tr>
</table>
```

When cells span multiple rows or columns, plan the table carefully so that each row has the intended number of occupied columns. Incorrect spans can make a table difficult to understand and navigate.

Avoid using the old `border` attribute to style tables. Presentation should be handled with CSS, which we will study in the next lectures.

## Key Takeaways

- HTML describes the structure and meaning of webpage content.
- A complete document includes `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.
- Metadata belongs in the head; visible page content belongs in the body.
- Use headings to create a meaningful content hierarchy.
- Use lists for related items and links for navigation.
- Prefer semantic elements when they describe the content more accurately than generic containers.
- Use HTML tables for data, not page layout.

## Practical Exercises

### Task 1 — Personal Portfolio Page

Create a one-page personal portfolio using HTML only. The goal is to practice document structure and the elements introduced in this lecture.

Your page should include a navigation menu with links to **Home**, **About**, **Projects**, and **Contact**. Add a hero section with your name, a short introduction, and an image with meaningful alternative text. Create an About section with a paragraph and a list of skills. In the Projects section, use a table to list at least three projects, including each project's name, description, and year. In the Contact section, add an email link, phone link, and a social profile link. Finish with a footer containing a copyright notice.

Use a proper document structure, a descriptive page title, UTF-8 character encoding, and the responsive viewport metadata. Add a favicon as an optional improvement.

**Reference solution:** [Personal portfolio example](https://alitigui.github.io/Front_end_solutions/Lecture2/solution1/portfolio.html)

### Task 2 — Weekly Timetable

Create a weekly school timetable using an HTML table. Include a caption, weekday headings, time slots, at least five subjects, and a note in the footer. Use `rowspan` for a class that lasts multiple periods and `colspan` for a break that spans several days. Add a notes column as an optional extension.

**Reference solution:** [Weekly timetable example](https://alitigui.github.io/Front_end_solutions/Lecture2/solution2/timetable.html)

**Class discussion:** What makes a table different from a set of `div` elements? In which situation would using a table improve the meaning and accessibility of the content?
