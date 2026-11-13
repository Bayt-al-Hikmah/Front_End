# Lecture 02 — HTML Structure and Content

> **Core idea:** HTML gives a document structure and meaning; browsers use that structure to present content and provide interaction.

## Learning goals
- Build a valid HTML document with a clear `head` and `body`.
- Choose elements and attributes that describe content and links.
- Structure tabular data with accessible table elements.
## Introduction to HTML
**HTML** (HyperText Markup Language) describes a page’s structure and meaning. Elements mark content such as headings, paragraphs, images, links, lists, and controls; browsers interpret that markup to build the page.

An element is usually written with a start tag, content, and an end tag. HTML also has **void elements**, which cannot contain content and have no end tag:
1. **Elements with content**: These require both an opening and a closing tag. Examples include paragraphs (`<p>...</p>`), headings (`<h1>...</h1>`), and lists (`<ul>...</ul>`).
2. **Void elements**: These cannot contain child content and have no end tag. Examples include images (`<img>`), line breaks (`<br>`), and inputs (`<input>`). A trailing slash is optional in HTML; it does not make an element self-closing.

**Attributes** add information or configure an element, such as `href` on a link or `alt` on an image. HTML files usually use the `.html` extension and are interpreted by a browser.

## Structure of an HTML document
Start with `<!DOCTYPE html>` to use standards mode. The root `<html>` element contains two main sections: `<head>` for document metadata and resource links, and `<body>` for page content.
1. **`<head>` Section**:  
    The `<head>` contains metadata and resource references. Most of its contents are not rendered as page content, though the title appears in the browser tab and metadata may be used by browsers or other services.
2. **`<body>` Section**:  
    The `<body>` contains page content users see or interact with: text, images, links, forms, and other elements.
#### Example:
```
<!DOCTYPE html>
<html>
  <head>
    <title>My Webpage</title>
    <meta name="description" content="This is a sample webpage.">
  </head>
  <body>
    <h1>Welcome to My Webpage</h1>
    <p>This is a paragraph of text.</p>
  </body>
</html>
```
## Head elements
The `<head>` contains the document title, metadata, and links to resources.
### `<title>`
Sets the document title shown in the browser tab and used by bookmarks and assistive contexts.
```
<title>My Title</title>
```
### meta:
Provides **metadata** such as character encoding, author, description, and viewport settings.
#### Character encoding:
Specifies the character encoding for the document. UTF-8 is the most commonly used encoding.
```
<meta charset="UTF-8">
```
#### Viewport settings:
Sets the layout viewport so the page can scale to the device width.
```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
#### Page Description:
Provides a short page summary. Search engines may use it in results, but decide how to display those results themselves.
```
<meta name="description" content="This is a sample webpage about HTML meta tags.">
```
#### Keywords:  
Specifies keywords associated with the page. Major search engines generally do not use this field for ranking.
```
<meta name="keywords" content="HTML, meta tags, web development, SEO">
```
#### Author Information:
Specifies the author of the webpage.
```
<meta name="author" content="Ali tigui">
```
#### Open Graph Metadata:
Provides title, description, and image metadata that some services use when the page is shared.
```
<meta property="og:title" content="Sample Webpage">
<meta property="og:description" content="This is a sample webpage about meta tags.">
<meta property="og:image" content="https://www.example.com/image.jpg">
```
#### Twitter Card Metadata:
Provides card metadata for services that support these tags. Open Graph tags are also commonly supported.
```
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Sample Webpage">
<meta name="twitter:description" content="This is a sample webpage about meta tags.">
<meta name="twitter:image" content="https://www.example.com/image.jpg">
```
### Link:
`<link>` declares a relationship between the document and an external resource, such as a stylesheet, icon, or alternate feed.
#### Linking Stylesheets (CSS):
The most common use of the `<link>` tag is to connect an external CSS file to style the webpage.
```
<link rel="stylesheet" href="styles.css">
```
#### Linking Favicons:
A favicon is a small icon displayed in the browser tab or bookmark bar.
```
<link rel="icon" href="favicon.ico" type="image/x-icon">
```
#### Linking Alternate Versions of the Page:
Provide alternate versions of the page, such as a PDF or a different language.
```
<link rel="alternate" href="document.pdf" type="application/pdf">
```
#### Linking Fonts:
Link a stylesheet that provides fonts. Consider performance, privacy, and licensing when loading third-party fonts.
```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
```
#### Linking RSS Feeds:
RSS (Really Simple Syndication) feeds distribute website updates in a standardized format. Linking a feed lets users and applications subscribe to those updates.

```
<link rel="alternate" type="application/rss+xml" href="feed.xml">
```
#### Linking Preload Resources:
Request an important resource early when the page needs it soon. Preload only resources known to be critical; unnecessary preloads compete for bandwidth.
```
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```
#### Link tag attributes:
- **`rel`**: Specifies the relationship between the current document and the linked resource. Common values include:
    - `stylesheet` for CSS files
    - `icon` for favicons
    - `preload` for preloading resources
    - `alternate` for alternate versions or RSS feeds
- **`href`**: Specifies the URL of the external resource.
- **`type`**: Defines the MIME type of the linked resource (e.g., `text/css`, `image/x-icon`).
- **`media`**: Specifies the media type or device the resource is intended for (e.g., `screen`, `print`).
- **`as`**: Used with `rel="preload"` to specify the type of resource being preloaded (e.g., `font`, `script`, `image`).
- **`crossorigin`**: Indicates whether the resource should be fetched with a CORS request (used for fonts or other cross-origin resources).
### style:
`<style>` embeds CSS in the document. For larger projects, an external stylesheet is easier to reuse and maintain.
```
    <style>
      /* CSS rules go here */
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
      }
      h1 {
        color: #333;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
      }
    </style>
```
### script:
`<script>` embeds or loads JavaScript. A classic script in the head may run before the document is parsed; use `defer` when it should wait until parsing finishes.
#### Inline JavaScript:
Write JavaScript directly inside a `<script>` element for a small example or page-specific code.
```
   <script>
      // JavaScript code goes here
      alert("Hello, World!");
    </script>
```
#### External JavaScript:
Load an external JavaScript file with `src`. Add `defer` when a classic script depends on parsed document elements:
```
<script src="script.js" defer></script>
```
### `<base>`
Sets the base URL used to resolve relative URLs and/or the default browsing context for links and forms. It affects every relative URL in the document, so use it sparingly. A document can have only one `<base>` element.
Its main attributes are:
1. **`href`**: Specifies the base URL for all relative URLs in the document.
2. **`target`**: Defines the default target for all links and forms in the document.  

```
<base href="https://www.example.com/" target="_blank">
```
### `<noscript>`
Provides fallback content when scripting is disabled. Keep essential information and navigation available without JavaScript when practical.
#### Providing alternate content
Use `<noscript>` to explain what is unavailable or provide a fallback when scripting is disabled:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Noscript Example</title>
    <script>
      document.write("<p>This content is loaded with JavaScript.</p>");
    </script>
  </head>
  <body>
    <noscript>
      <p>This content is displayed because JavaScript is disabled.</p>
    </noscript>
  </body>
</html>
```
#### Redirecting Users:
Avoid using `<noscript>` as a redirect mechanism; a page that works without JavaScript is usually more accessible and predictable. A legacy redirect can be written as follows:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Noscript Example</title>
    <script>
      // JavaScript code
    </script>
    <noscript>
      <meta http-equiv="refresh" content="0; url=https://www.example.com/no-js-version">
    </noscript>
  </head>
  <body>
    <p>Welcome to the JavaScript-enabled version of the website.</p>
  </body>
</html>

```
## Body elements
The `<body>` contains the page content users see or interact with.
### Paragraphs:
Use `<p>` for a paragraph of text. Browsers display paragraphs as blocks by default; CSS controls their presentation.
```
<p>This is a paragraph.</p>
```
### Headings
HTML provides six heading levels, `<h1>` through `<h6>`, for a document’s hierarchy. Choose a level based on structure, not visual size; CSS controls appearance. A page may contain multiple `<h1>` elements in some contexts, but a clear heading outline is the practical goal.
1. **`<h1>`**: The main heading for a page or section.
2. **`<h2>`**: Used for major section headings.
3. **`<h3>`**: Used for subheadings under `<h2>` sections.
4. **`<h4>`**: Used for further subsections.
5. **`<h5>`**: Used for minor headings.
6. **`<h6>`**: The lowest level of heading, used for small or less important headings.
```
<h1>Main Title</h1>
<h2>Section Heading</h2>
<h3>Subheading</h3>
<h4>Minor Subheading</h4>
<h5>Small Heading</h5>
<h6>Least Important Heading</h6>
```
### Breaking Line in HTML
Use the void element `<br>` for a line break within the same block of text, such as a postal address or a poem. Do not use it to create visual spacing; use CSS or a new paragraph.
```
<p>This is the first line.<br>This is the second line.</p>
```
### Horizontal Line in HTML
`<hr>` marks a thematic break between sections of content. Browsers commonly render it as a horizontal line; CSS controls its appearance. It is a void element.
```
<p>This is the first section of content.</p>
<hr>
<p>This is the second section of content.</p>
```
### Styling Text in HTML:
HTML includes elements that convey meaning as well as elements with presentational or specialized uses:
#### ``<em>``Tag:
Used to emphasize text. Browsers typically render it in _italics_, it Indicates that the text has stress emphasis.
```
<p>This is <em>important</em> text.</p>
```
**Output**: This is _important_ text.
#### `<i>` Tag:
Marks text set apart from surrounding prose without added emphasis, such as a technical term or foreign phrase.
```
<p>The term <i>et cetera</i> is often abbreviated as <i>etc.</i></p>
```
**Output**: The term _et cetera_ is often abbreviated as _etc._
#### `<u>` Tag
Marks text with a non-textual annotation. Browsers often underline it; do not use it as a substitute for emphasis or to imitate links.
```
<p>This is <u>underlined</u> text.</p>
```
**Output**: This is <u>underlined</u> text.
#### `<b>` Tag
Draws attention to text without adding importance, such as keywords or product names.
```
<p>This is <b>bold</b> text.</p>
```
**Output**: This is **bold** text.
#### `<strong>` Tag:
Marks text with strong importance, seriousness, or urgency. Browsers commonly render it in bold.
```
<p>This is <strong>very important</strong> text.</p>
```
**Output**: This is **very important** text.
#### `<sup>` Tag
Marks superscript text, such as an exponent or ordinal suffix.
```
<p>E = mc<sup>2</sup></p>
```
**Output**: E = mc².
#### `<sub>` Tag
Marks subscript text, such as the `2` in a chemical formula.
```
<p>H<sub>2</sub>O is the chemical formula for water.</p>
```
**Output**: H₂O is the chemical formula for water.
#### Special Characters:
Special characters (e.g., symbols, accents, or reserved characters) can be added to HTML using [**character entities**](https://symbl.cc/en/html-entities/). These are codes that represent characters not available on a standard keyboard or have special meanings in HTML.  
**Example :**
```
<p>Copyright &copy; 2023 My Company. All rights reserved.</p>
<p>Price: &euro;50.00</p>
<p>5 &lt; 10 is true.</p>
```
**Output**:  
Copyright © 2023 My Company. All rights reserved.  
Price: €50.00  
5 < 10 is true.
### Lists in HTML:
Use lists to group related items: unordered when order is unimportant, ordered when sequence matters, and description lists for terms with associated descriptions.
#### Unordered Lists (`<ul>`):
Use an unordered list when item order does not matter. Each item belongs in an `<li>` (list item) element.
```
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>
```
**Output**:
- Apple
- Banana
- Orange
 #### Ordered Lists (`<ol>`)
Used to create a list of items where the order matters (e.g., steps in a recipe). Each item is wrapped in a `<li>` tag.
```
<ol>
  <li>Preheat the oven.</li>
  <li>Mix the ingredients.</li>
  <li>Bake for 30 minutes.</li>
</ol>
```
**Output**:
1. Preheat the oven.
2. Mix the ingredients.
3. Bake for 30 minutes.
#### Definition Lists (`<dl>`)
Used to create a list of terms and their definitions (like a dictionary).  

**Syntax**:

- `<dl>`: Wraps the entire list.
- `<dt>`: Defines the term.
- `<dd>`: Defines the description or definition of the term.
```
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language, used for creating web pages.</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets, used for styling web pages.</dd>
</dl>
```
**Output**:  
**HTML**  
HyperText Markup Language, used for creating web pages.  
**CSS**  
Cascading Style Sheets, used for styling web pages.
#### Nested Lists
Nest a list inside a list item to represent sub-items or a hierarchy.
```
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables
    <ul>
      <li>Carrot</li>
      <li>Broccoli</li>
    </ul>
  </li>
</ul>
```
**Output**:
- Fruits
    - Apple
    - Banana
- Vegetables
    - Carrot
    - Broccoli
### Class and ID Attributes in HTML
Use `class` and `id` to identify elements for styling, scripting, and navigation. A class can be shared; an `id` should be unique in the document.
#### `class` Attribute
Groups elements that share a purpose or style. An element can have multiple space-separated classes.
```
<p class="highlight">This is a highlighted paragraph.</p>
<p class="highlight">This is another highlighted paragraph.</p>
```
#### `id` Attribute:
Identifies one element in the document. Keep each `id` unique.
```
<p id="intro">This is the introduction paragraph.</p>
<p>This is a regular paragraph.</p>
```
### Links in HTML:
The `<a>` element creates a hyperlink to another page, a page section, or another resource.
#### Basic Link Syntax:
- **Tag**: `<a>`
- **Attribute**: `href` (hypertext reference) specifies the destination of the link.
- **Content**: The text or element inside the `<a>` tag becomes clickable.
```
<a href="https://www.example.com">Visit Example.com</a>
```
**Output**:  
[Visit Example.com](https://www.example.com/)  

#### Types of Links
**Absolute Links**  
Point to a full URL (including the protocol, e.g., `https://`). Used for linking to external websites.
```
<a href="https://www.google.com">Go to Google</a>
```
**Relative Links**  
Point to a file or resource within the same website.
```
<a href="about.html">About Us</a>
```
This links to `about.html`, resolved relative to the current page’s URL.
**Internal Links (Anchor Links)**  
Point to a specific section within the same page using the `id` attribute.
```

<a href="#section2">Jump to Section 2</a>
<h2 id="section2">Section 2</h2>
<p>This is the content of Section 2.</p>
```
It is used to navigate through our webpage.
**Email Links**  
Open the user's default email client with a pre-filled email address.
```
<a href="mailto:example@example.com">Send Email</a>
```
**Phone Links**   
Open the user's default phone app with a pre-filled phone number.
```
<a href="tel:+1234567890">Call Us</a>
```
#### **Link Attributes**
**`target` Attribute**   
Specifies where to open the linked resource.
- `_blank`: Opens the link in a new browsing context, usually a tab. For compatibility with older browsers, consider `rel="noopener"` when linking to an untrusted page.
- `_self`: Opens the link in the same tab (default behavior).
```
<a href="https://www.example.com" target="_blank">Open in New Tab</a>
```
**`title` Attribute**
Provides advisory information, often shown as a tooltip. Do not rely on it as the link’s accessible name.
```
<a href="https://www.example.com" title="Visit Example.com">Example</a>
```
### `<div>` and `<span>` tags:

#### `<div>` Tag
`<div>` is a generic block container. Use it when no more meaningful semantic element fits, such as when a wrapper is needed for styling or scripting.
```
<div>
  <h2>This is a heading inside a div</h2>
  <p>This is a paragraph inside a div.</p>
</div>
```
#### `<span>` Tag
`<span>` is a generic inline container, useful for styling or scripting a phrase within surrounding text.
```
<p>This is a <span style="color: red;">highlighted</span> word.</p>
```
### Default inline and block layout
#### Block Elements
Many elements, such as `<div>`, headings, and paragraphs, display as blocks by default: they start on a new line and normally fill the available inline space. CSS can change an element’s `display` behavior.
#### Inline Elements
Elements such as `<span>`, `<a>`, `<strong>`, and `<em>` display inline by default and flow with surrounding text. Treat “block” and “inline” as default CSS layout behavior, not fixed categories that determine meaning.
## Tables:
### Creating table
Use tables for tabular data, not page layout. `<tr>` creates a row; `<td>` creates a data cell and `<th>` a header cell. Add row and column headers so cell relationships are clear to assistive technology. The legacy `border` attribute appears in these introductory examples; production styling belongs in CSS.
```
<table>
<caption>Example Table</caption>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
    </tr>
    <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
        <td>Row 1, Cell 3</td>
    </tr>
    <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
        <td>Row 2, Cell 3</td>
    </tr>
</table>
```
**Output:**

<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
    </tr>
    <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
        <td>Row 1, Cell 3</td>
    </tr>
    <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
        <td>Row 2, Cell 3</td>
    </tr>
</table>  

### Adding a caption
Use `<caption>` to give the table a concise title or description. Place it as the first child of `<table>` so it is associated with the table.
```
<table>
    <caption>Employee Details</caption> <!-- Caption added here -->
    <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>Marketing</td>
        <td>$60,000</td>
    </tr>
    <tr>
        <td>Jane Smith</td>
        <td>Engineering</td>
        <td>$80,000</td>
    </tr>
</table>
```
**Output:**  
<table>
    <caption>Employee Details</caption>
    <tr>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>Marketing</td>
        <td>$60,000</td>
    </tr>
    <tr>
        <td>Jane Smith</td>
        <td>Engineering</td>
        <td>$80,000</td>
    </tr>
</table>  

### colspan and rowspan Attributes
#### `colspan` Attribute:
`colspan` makes a cell span multiple columns.
```
<table border="1">
    <tr>
        <th colspan="2">Name</th> 
        <th>Age</th>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>25</td>
    </tr>
    <tr>
        <td>Jane</td>
        <td>Smith</td>
        <td>30</td>
    </tr>
</table>
```
**Output:**  

<table border="1">
    <tr>
        <th colspan="2">Name</th> <!-- Merges two columns -->
        <th>Age</th>
    </tr>
    <tr>
        <td>John</td>
        <td>Doe</td>
        <td>25</td>
    </tr>
    <tr>
        <td>Jane</td>
        <td>Smith</td>
        <td>30</td>
    </tr>
</table>  

#### `rowspan` Attribute:
`rowspan` makes a cell span multiple rows.
```
<table border="1">
    <tr>
        <th rowspan="2">ID</th> <!-- Merges two rows -->
        <th>Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>25</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Jane Smith</td>
        <td>30</td>
    </tr>
</table>
```
**Output:**  

<table border="1">
    <tr>
        <th rowspan="2">ID</th>
        <th>Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>25</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Jane Smith</td>
        <td>30</td>
    </tr>
</table>  

#### Combining `rowspan` and `colspan`
Combine both attributes when a table’s data relationships require a cell to cover multiple rows and columns.
```
<table border>
    <tr>
        <th rowspan="2">ID</th>
        <th colspan="2">Name</th>
        <th rowspan="2">Age</th>
    </tr>
    <tr>
        <th>First Name</th>
        <th>Last Name</th>
    </tr>
    <tr>
        <td>1</td>
        <td>John</td>
        <td>Doe</td>
        <td>25</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Jane</td>
        <td>Smith</td>
        <td>30</td>
    </tr>
</table>
```
**Output:**  

<table border>
    <tr>
        <th rowspan="2">ID</th>
        <th colspan="2">Name</th>
        <th rowspan="2">Age</th>
    </tr>
    <tr>
        <th>First Name</th>
        <th>Last Name</th>
    </tr>
    <tr>
        <td>1</td>
        <td>John</td>
        <td>Doe</td>
        <td>25</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Jane</td>
        <td>Smith</td>
        <td>30</td>
    </tr>
</table>  

## Tasks:
## Task 1: Personal Portfolio Website

#### Objective
Create a **personal portfolio webpage** using HTML to showcase your skills, projects, and contact information.
#### Requirements:
1. Basic Structure (`<head>` & `<body>`)
	- Use `<!DOCTYPE html>` and proper HTML5 structure.
	- Add a meaningful `<title>` (e.g., "John Doe - Portfolio").
	- Include meta tags for **description**, **viewport**, and **UTF-8 encoding**.
2. Navigation Bar (Menu)
	- Create a navigation bar (`<nav>`) with links to:
	    - **Home** (links to the top of the page).
	    - **About Me** (links to a section).
	    - **Projects** (links to a section).
	    - **Contact** (links to a section).
3. Sections (Using `<div>` or `<section>`)
	- **Hero Section (Home)**:
	    - A heading (`<h1>`) with your name.
	    - A short introduction (`<p>`).
	    - An image (use `<img>` with `alt` text).
	- **About Me Section**:
	    - A heading (`<h2>`).
	    - A paragraph (`<p>`) describing yourself.
	    - An **unordered list** (`<ul>`) of skills.
	- **Projects Section**:
	    - A heading (`<h2>`).
	    - A **table** (`<table>`) listing:
    - **Project Name**, **Description**, and **Year** as column headers (`<th scope="col">`).
	    - At least 3 projects (rows).
	- **Contact Section**:
	    - A heading (`<h2>`).
	    - A **link** (`<a>`) to your email (`mailto:`).
	    - A **phone link** (`tel:`).
	    - A **social media link** (e.g., LinkedIn, GitHub).
4. Footer
	- A `<footer>` with:
	    - Copyright symbol (`&copy;`) and current year.
	    - A **horizontal line** (`<hr>`) above it.
5. Bonus (Optional)
	- Add a **favicon** (use `<link rel="icon">`).
	- Use `<strong>`, `<em>`, or `<span>` for text styling.
#### Solution
You can find our solution here: https://alitigui.github.io/Front_end_solutions/Lecture2/solution1/portfolio.html
### Task 2: 
#### Objective:
Design a **weekly school timetable** using advanced HTML table features (`colspan`, `rowspan`, `<caption>`).
#### Requirements:
1. Basic Table Structure
	- Add borders with CSS. (`border="1"` is shown in the examples as a legacy attribute.)
	- Add a `<caption>` (e.g., "Class 10A Weekly Timetable").
2. Table Headers (`<thead>`)
	- First row: Days of the week (`<th>` for Monday to Friday).
	- Second row: Time slots (`<th>` for "8:00 AM", "9:00 AM", etc.).
3. Table Body (`<tbody>`)
	- Use **`rowspan`** for subjects that span multiple hours (e.g., Math from 8 AM to 10 AM).
	- Use **`colspan`** for merged cells (e.g., "Lunch Break" across all days).
	- Include at least **5 subjects** (Math, Science, History, etc.).
4. Special Rows
	- **Lunch Break**: A row with `colspan="5"`.
	- **Free Period**: A cell with `rowspan="2"`.
5. Footer (`<tfoot>`)
	- Add a footer with a note (e.g., "Timetable subject to change").
6. Bonus (Optional)
	- Add a **"Notes" column** with `<ul>` for reminders.
	- Use `<abbr>` for abbreviations (e.g., `<abbr title="Physical Education">PE</abbr>`).
#### Solution
You can find our solution here: https://alitigui.github.io/Front_end_solutions/Lecture2/solution2/timetable.html
