## Learning Objectives

By the end of this lecture, students should be able to:

- Explain how the browser represents a webpage through the Document Object Model.
- Select, update, create, and remove HTML elements with JavaScript.
- Respond to user actions with event listeners.
- Recognize common Browser Object Model features.
- Convert between JavaScript data and JSON.
- Store simple information using cookies, local storage, and session storage.
- Encode URL components and create downloadable files with Blob objects.
- Explain how WebSockets support real-time communication.

## Introduction to the Document Object Model

When a browser loads an HTML document, it parses the markup and creates an object representation of the page called the **Document Object Model (DOM)**. The DOM organizes the document as a tree of nodes. Elements, text, and attributes are represented in this structure, and JavaScript can use the DOM API to inspect and modify it.

For example, an HTML page may contain a heading, paragraph, and button. The browser creates corresponding objects in the DOM tree. JavaScript can select the heading, change its text, listen for a button click, or add a new element to the page.

The DOM is not the same thing as the original HTML source. It is the browser's current structured representation of the document, and JavaScript changes can update that representation while the page is open.

![DOM tree](./attachments/dom.webp)

## Connecting JavaScript to the Page

JavaScript can be written inside the HTML document or loaded from an external file. For maintainability, external files are generally preferred:

```html
<script src="scripts/main.js" defer></script>
```

The `defer` attribute ensures that the browser parses the document before executing the classic external script. A module script is deferred by default:

```html
<script type="module" src="scripts/main.js"></script>
```

When a script is loaded without `defer` near the top of the document, it may execute before the elements it needs have been parsed. Choosing an appropriate script-loading strategy helps avoid selecting elements before they exist.

## Selecting DOM Elements

Before JavaScript can change an element, it needs to select that element from the DOM. The DOM provides several selection methods.

### Selecting by ID

`document.getElementById()` returns the element with the specified ID, or `null` if no matching element exists:

```javascript
const pageTitle = document.getElementById("page-title");
```

Because an ID should be unique within a page, this method is useful when targeting one known element.

### Selecting by Tag Name or Class Name

`getElementsByTagName()` returns a live `HTMLCollection` containing elements with the specified tag name. `getElementsByClassName()` returns a live collection of elements containing the specified class:

```javascript
const paragraphs = document.getElementsByTagName("p");
const menuItems = document.getElementsByClassName("menu-item");
```

A live collection updates as the document changes. This behavior can be useful, but it can also be surprising when elements are added or removed while a collection is being processed.

### Selecting with CSS Selectors

`querySelector()` accepts a CSS selector and returns the first matching element, or `null`. `querySelectorAll()` returns a static `NodeList` containing all matching elements:

```javascript
const firstButton = document.querySelector("button.primary");
const textInputs = document.querySelectorAll('input[type="text"]');
```

CSS selectors make these methods flexible because they can target elements by tag, class, ID, attribute, and relationships.

Always check whether an element was found before trying to modify it:

```javascript
const title = document.querySelector("#page-title");

if (title) {
  title.textContent = "Updated title";
}
```

## Changing DOM Content and Appearance

After selecting an element, JavaScript can modify its text, HTML content, form value, attributes, or classes.

### Updating Text and HTML

The `textContent` property reads or replaces the text content of an element:

```javascript
const message = document.querySelector("#message");
message.textContent = "Your changes have been saved.";
```

The `innerHTML` property reads or replaces the HTML markup inside an element:

```javascript
const result = document.querySelector("#result");
result.innerHTML = "<strong>Success!</strong> Your profile was updated.";
```

Be careful with `innerHTML`. Inserting untrusted user input through `innerHTML` can create a cross-site scripting (XSS) vulnerability because the browser may interpret the input as markup or executable content. When displaying user-provided text, prefer `textContent`.

### Updating Form Values

Form controls expose a `value` property that can be read or changed:

```javascript
const searchInput = document.querySelector("#search");
searchInput.value = "JavaScript";
```

Checkboxes and radio buttons expose a `checked` property:

```javascript
const newsletter = document.querySelector("#newsletter");
console.log(newsletter.checked);
```

### Updating Styles

JavaScript can update inline styles through the `style` property:

```javascript
const card = document.querySelector(".card");
card.style.backgroundColor = "#eef5fa";
card.style.fontSize = "1.1rem";
```

For larger style changes, it is usually better to add or remove CSS classes. This keeps presentation rules in the stylesheet and behavior in JavaScript:

```javascript
const card = document.querySelector(".card");
card.classList.add("highlight");
card.classList.remove("muted");
card.classList.toggle("active");

console.log(card.classList.contains("active"));
```

The `classList` API is generally preferable to repeatedly replacing an element's complete `className` string.

### Managing Attributes

The DOM provides methods for reading and changing attributes:

```javascript
const image = document.querySelector("img");

image.setAttribute("alt", "A mountain landscape");
image.setAttribute("loading", "lazy");

console.log(image.getAttribute("alt"));
image.removeAttribute("loading");
```

Some commonly used attributes are also reflected as element properties, such as `image.src` and `link.href`. For form fields, use properties such as `value`, `checked`, and `disabled` when you need the current control state.

## Event Handling

A webpage becomes interactive when JavaScript responds to events. An **event** is an action or occurrence that the browser reports, such as a click, key press, input change, form submission, or page load.

Use `addEventListener()` to register a function that should run when a particular event occurs:

```html
<button id="hello-button" type="button">Say hello</button>
```

```javascript
const button = document.querySelector("#hello-button");

button.addEventListener("click", () => {
  console.log("The button was clicked.");
});
```

The first argument identifies the event type. The second argument is the callback function that handles the event.

### Common Event Types

| Event | Typical purpose |
| --- | --- |
| `click` | A user activates an element with a pointer or equivalent action. |
| `input` | The value of an input control changes. |
| `change` | A control's value is committed or changed, depending on the control. |
| `submit` | A form is submitted. |
| `keydown` | A keyboard key is pressed. |
| `focus` | An element receives focus. |
| `blur` | An element loses focus. |
| `scroll` | A scrollable area is scrolled. |

For a form, listen to the `submit` event and call `preventDefault()` when JavaScript should handle the submission instead of allowing the browser's default navigation:

```javascript
const form = document.querySelector("#contact-form");

form.addEventListener("submit", event => {
  event.preventDefault();
  console.log("The form is ready to be processed.");
});
```

Do not prevent default form submission without replacing the behavior with a working submission process. If data must be sent to a server, the application should validate it and submit it to the appropriate endpoint.

### The Event Object

The browser passes an event object to the listener. It contains information about the event, including the element that triggered it:

```javascript
button.addEventListener("click", event => {
  console.log("Event type:", event.type);
  console.log("Clicked element:", event.currentTarget);
});
```

`event.target` is the element where the event originated, while `event.currentTarget` is the element to which the listener is attached. They can be different when an event bubbles from a nested element.

### Event Delegation

Events often bubble from a child element toward its ancestors. This allows a parent to handle events from multiple children using one listener. This pattern is called **event delegation**:

```html
<ul id="task-list">
  <li><button type="button" data-task="1">Complete task 1</button></li>
  <li><button type="button" data-task="2">Complete task 2</button></li>
</ul>
```

```javascript
const taskList = document.querySelector("#task-list");

taskList.addEventListener("click", event => {
  const button = event.target.closest("button[data-task]");

  if (!button || !taskList.contains(button)) {
    return;
  }

  console.log("Selected task:", button.dataset.task);
});
```

Event delegation is useful when list items are added dynamically because the parent listener can handle events from new children without registering a separate listener for each one.

## Creating, Inserting, Cloning, and Removing Elements

The DOM API can create new elements dynamically. Start with `document.createElement()`, set the element's content or attributes, and then insert it into the document.

```javascript
const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was created with JavaScript.";
newParagraph.classList.add("notice");

const container = document.querySelector("#container");
container.append(newParagraph);
```

Common insertion methods include:

| Method | Behavior |
| --- | --- |
| `append()` | Adds nodes or text at the end of an element. |
| `prepend()` | Adds nodes or text at the beginning. |
| `before()` | Inserts content before an element. |
| `after()` | Inserts content after an element. |
| `replaceWith()` | Replaces an element with other content. |

The older `insertBefore()` and `replaceChild()` methods are also available when working directly with parent-child node relationships.

To duplicate an existing element, use `cloneNode()`. Passing `true` creates a deep clone that includes descendants:

```javascript
const original = document.querySelector(".template");
const copy = original.cloneNode(true);
copy.removeAttribute("id"); // Avoid duplicating an ID.
copy.classList.add("copy");
document.body.append(copy);
```

An ID should remain unique in the document, so remove or change the ID when cloning an element that contains one. To remove an element, call `remove()`:

```javascript
const oldItem = document.querySelector(".old-item");
oldItem?.remove();
```

The optional chaining operator (`?.`) prevents an error if `oldItem` is `null` or `undefined`.

## The Browser Object Model

The **Browser Object Model (BOM)** is a general term for browser-provided objects that allow JavaScript to interact with the browsing environment. Unlike the DOM, which represents the page document, these APIs expose browser features such as the window, current URL, navigation history, and browser capabilities.

The `window` object is the global object in a browser page. Many browser APIs are available through it.

### The Window Object

The `window` object provides information about the browser window and access to browser features:

```javascript
console.log(window.innerWidth);
console.log(window.innerHeight);
console.log(window.location.href);
```

### The Location Object

The `location` object describes the current URL and can be used to navigate to another address:

```javascript
console.log(window.location.href);
console.log(window.location.hostname);

// Navigate to another page:
// window.location.href = "https://example.com";
```

Other browser-related objects include `navigator`, which provides information about the browser environment, and `history`, which allows controlled interaction with the session history. Browser APIs expose capabilities, but they do not always reveal reliable information about a user's identity or physical location.

## JSON: Exchanging and Storing Data

**JSON (JavaScript Object Notation)** is a text format commonly used to exchange structured data between a browser and a server. JSON resembles JavaScript object syntax, but it follows stricter rules:

- Object keys must be double-quoted strings.
- String values must use double quotes.
- Values can be strings, numbers, booleans, `null`, arrays, or objects.
- JSON cannot directly represent JavaScript functions or `undefined` values.

```json
{
  "name": "Amira",
  "age": 20,
  "isStudent": true,
  "courses": ["HTML", "CSS", "JavaScript"]
}
```

### Converting Between JSON and JavaScript

`JSON.stringify()` converts a JavaScript value into a JSON string. `JSON.parse()` converts a valid JSON string into a JavaScript value:

```javascript
const user = {
  name: "Amira",
  age: 20
};

const jsonText = JSON.stringify(user);
console.log(jsonText);

const restoredUser = JSON.parse(jsonText);
console.log(restoredUser.name);
```

Parsing can fail when the input is not valid JSON, so it is often appropriate to wrap `JSON.parse()` in a `try...catch` block when reading external or user-provided data.

## Client-Side Storage

Browsers provide storage mechanisms that allow a website to keep data on a user's device. These mechanisms are useful for preferences, temporary application state, and small amounts of non-sensitive data. They are not a replacement for a server-side database, and users can clear or modify client-side data.

### Cookies

Cookies are small pieces of data associated with a website. Depending on their attributes, browsers may send them with matching HTTP requests. Cookies are commonly used for session identifiers and preferences.

A simple JavaScript example is:

```javascript
document.cookie = "theme=dark; max-age=86400; path=/; SameSite=Lax";
console.log(document.cookie);
```

A cookie can be removed by setting its expiration or `max-age` in the past, using the same relevant path and domain scope. JavaScript cannot read cookies marked `HttpOnly`; that restriction helps protect sensitive cookies from client-side scripts. Cookies used for authentication should be configured carefully by the server, often with `Secure`, `HttpOnly`, and an appropriate `SameSite` value. Do not store passwords or other secrets in ordinary JavaScript-readable cookies.

### Local Storage

`localStorage` stores string key-value pairs for a given origin. The data normally remains available after the browser is closed and reopened, until it is removed by the application or user.

```javascript
localStorage.setItem("username", "Amira");

const username = localStorage.getItem("username");
console.log(username);

localStorage.removeItem("username");
```

To store an object, convert it to JSON first:

```javascript
const settings = {
  theme: "dark",
  language: "en"
};

localStorage.setItem("settings", JSON.stringify(settings));

const savedText = localStorage.getItem("settings");
const savedSettings = savedText ? JSON.parse(savedText) : null;
```

Because stored values can be edited or corrupted, parsing should be protected with error handling in real applications. Do not store sensitive authentication secrets in local storage. Any JavaScript running on the page can read it, so an XSS vulnerability could expose the data.

### Session Storage

`sessionStorage` has a similar API to `localStorage`, but its data is scoped to a page session for a particular tab. It is normally cleared when that tab or browsing context ends.

```javascript
sessionStorage.setItem("currentStep", "2");

const currentStep = sessionStorage.getItem("currentStep");
console.log(currentStep);

sessionStorage.removeItem("currentStep");
```

Both local storage and session storage provide `clear()` to remove all entries for the current origin and storage area. Use this method carefully because it removes more than one key.

## URL Encoding and Query Parameters

URLs have a structure, and some characters have special meanings within that structure. **Percent encoding** represents characters that cannot safely appear literally in a URL component. For example, a space can be encoded as `%20`, and an ampersand can be encoded as `%26`.

Use `encodeURIComponent()` when encoding an individual value that will be placed inside a URL component, such as a query parameter:

```javascript
const searchTerm = "web development & design";
const encodedTerm = encodeURIComponent(searchTerm);

console.log(encodedTerm);
```

To decode a component, use `decodeURIComponent()`:

```javascript
const decodedTerm = decodeURIComponent(encodedTerm);
console.log(decodedTerm);
```

For constructing query strings, `URLSearchParams` is often easier and less error-prone than manually concatenating encoded values:

```javascript
const params = new URLSearchParams({
  search: "web development & design",
  page: "2"
});

const queryString = params.toString();
console.log(queryString);
```

Do not encode an entire URL with `encodeURIComponent()` when only one query value needs encoding. Encode the individual component instead.

## Blobs and File Downloads

A **Blob** represents immutable raw data, such as text or binary content. Blobs are useful when a browser application needs to create a file for the user to download or process file data selected by the user.

### Creating and Downloading a Blob

```javascript
const textData = "Hello, this file was created in the browser.";
const blob = new Blob([textData], { type: "text/plain" });
const objectUrl = URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = objectUrl;
link.download = "message.txt";
link.click();

URL.revokeObjectURL(objectUrl);
```

`URL.createObjectURL()` creates a temporary URL that points to the Blob. After the download is initiated and the URL is no longer needed, call `URL.revokeObjectURL()` to release the resource. For larger applications, schedule cleanup after the browser has had time to start using the URL.

### Reading a User-Selected File

An `<input type="file">` control lets the user select a file. Modern browsers provide `File` objects that can be read with methods such as `text()`:

```html
<input type="file" id="file-input" accept="text/plain">
```

```javascript
const fileInput = document.querySelector("#file-input");

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];

  if (!file) {
    return;
  }

  try {
    const content = await file.text();
    console.log(content);
  } catch (error) {
    console.error("Could not read the file:", error);
  }
});
```

The `FileReader` API is also available and is still useful in some workflows. It reads Blob or File contents asynchronously through events:

```javascript
const blob = new Blob(["Hello from a Blob."], { type: "text/plain" });
const reader = new FileReader();

reader.addEventListener("load", () => {
  console.log(reader.result);
});

reader.addEventListener("error", () => {
  console.error("File could not be read.");
});

reader.readAsText(blob);
```

URL encoding and Blobs solve different problems. URL encoding prepares a component for use in a URL. A Blob represents data that can be processed or downloaded as a file.

## WebSockets and Real-Time Communication

Most traditional HTTP interactions follow a request-response pattern: the browser sends a request and the server returns a response. This works well for loading pages and retrieving data, but some applications need information to move continuously in both directions.

A **WebSocket** provides a persistent, full-duplex connection between a browser and a WebSocket server. Once the connection is established, either side can send messages without opening a new HTTP request for every message. This is useful for live chat, collaborative editing, game state, notifications, and dashboards.

A WebSocket is not a server by itself. The application must connect to a real server endpoint that supports the WebSocket protocol. The example below uses a placeholder URL and will work only after it is replaced with an actual WebSocket server address.

### Opening a Connection

Use `wss://` for an encrypted WebSocket connection and `ws://` for an unencrypted one. Public websites should normally use the secure form:

```javascript
const socket = new WebSocket("wss://your-server.example.com/socket");
```

### Listening for WebSocket Events

The WebSocket object emits events as the connection changes state:

| Event | Meaning |
| --- | --- |
| `open` | The connection has been established. |
| `message` | A message has been received. |
| `error` | An error occurred. |
| `close` | The connection has closed. |

```javascript
socket.addEventListener("open", () => {
  console.log("Connected to the server.");
  socket.send("Hello server!");
});

socket.addEventListener("message", event => {
  console.log("Message received:", event.data);
});

socket.addEventListener("error", error => {
  console.error("WebSocket error:", error);
});

socket.addEventListener("close", () => {
  console.log("Connection closed.");
});
```

### Sending and Closing Messages

The `send()` method sends data when the connection is open. The `close()` method starts closing the connection:

```javascript
if (socket.readyState === WebSocket.OPEN) {
  socket.send("A new message");
}

socket.close();
```

Before sending a message, check that the connection is open. A production application should also consider reconnection behavior, message validation, authentication, authorization, and server-side rate limits. WebSocket messages must not be trusted simply because they arrived over an established connection.

## Key Takeaways

- The DOM is the browser's structured representation of an HTML document.
- JavaScript can select, update, create, clone, and remove DOM elements.
- Use `textContent` for ordinary user-provided text; be careful when inserting content with `innerHTML`.
- Event listeners connect user actions to application behavior.
- The BOM exposes browser features such as the window and current location.
- JSON converts structured JavaScript data to and from text.
- Cookies, local storage, and session storage have different purposes and security characteristics.
- URL encoding is for URL components; Blobs are useful for file data.
- WebSockets provide an ongoing two-way connection to a WebSocket server.

## Final Project — A Persistent Task Manager

Build a responsive task-management application that brings together the HTML, CSS, and JavaScript skills covered in this course. The goal is to create a small but complete front-end application with a clear interface and reliable behavior.

### Core Functionality

Users should be able to add tasks with a title, description, and optional due date. They should be able to mark tasks as complete or incomplete, edit task details, delete tasks, and filter the list to show all, active, or completed tasks.

### Data Persistence

Save the task list in `localStorage` and restore it when the page is reopened. Store the data as JSON. Provide an export option that creates a JSON file with a Blob, and an import option that reads a selected JSON file. Validate imported data and handle invalid JSON or missing fields gracefully.

### Interface and User Experience

Use CSS Grid for the overall layout and Flexbox for task cards and controls. The interface should work on both narrow and wide screens. Add clear focus states, labels for form fields, helpful validation messages, and restrained transitions. Do not rely on color alone to communicate whether a task is complete.

### JavaScript Design

Use a class or another clear structure to represent tasks and manage task operations. Separate functions for reading, saving, rendering, adding, editing, and deleting tasks. Use `async`/`await` when reading imported files with asynchronous APIs, and include error handling for invalid file content.

**Reference solution:** [Task manager example](https://alitigui.github.io/Front_end_solutions/Lecture12/Solution/index.html)
