# Front-End Web Development

Welcome to the **Front-End Web Development** course by **Bayt-al-Hikmah**. This course introduces the core technologies used to build websites and browser-based applications. It is designed for learners who are starting from the fundamentals and want to progress toward building complete, responsive, interactive web pages.

The course follows a practical learning path. Students first learn how the Web works, then use HTML to structure content, CSS to design and arrange it, and JavaScript to add behaviour. The final lessons connect these skills through browser APIs, client-side storage, and a small application project.

> **Course focus:** This course teaches the foundations of front-end development using HTML, CSS, and vanilla JavaScript. Frameworks such as React or Vue, build tools, and back-end development are outside its main scope and can be studied after these foundations are secure.

## Who This Course Is For

No previous web-development or programming experience is required. Students should be comfortable using a computer, managing files and folders, and installing basic software. Familiarity with programming concepts is helpful but not necessary.

## Learning Outcomes

By the end of the course, students should be able to:

- Explain the relationship between the Internet, the Web, browsers, servers, and HTTP.
- Create well-structured HTML pages using semantic elements, links, tables, media, and forms.
- Apply CSS to control typography, colour, spacing, positioning, and page layout.
- Build responsive layouts using Flexbox, Grid, and media queries.
- Add interaction and application logic with JavaScript.
- Work with functions, arrays, objects, classes, events, and asynchronous operations.
- Manipulate the DOM and use browser features such as storage and WebSockets at an introductory level.
- Plan, build, test, and improve a small front-end project.

## Course Roadmap

The 12 lectures are arranged in four stages. Each stage builds on the concepts and practical skills introduced earlier.

| Stage | Lecture | Topic | Main focus |
|---|---:|---|---|
| **1. Web and HTML foundations** | 1 | Understanding the Web and Front-End Development | Internet and Web fundamentals, client-server communication, HTTP, and front-end versus back-end responsibilities. |
| | 2 | Building the Structure of a Web Page with HTML | HTML documents, text, links, semantic structure, and tables. |
| | 3 | HTML Multimedia, Forms, and Semantic Elements | Images, audio, video, forms, SVG, and accessible markup. |
| **2. Styling and layout with CSS** | 4 | CSS Fundamentals and Visual Styling | CSS rules, selectors, cascade, colour, typography, and the box model. |
| | 5 | Advanced CSS Selectors, Positioning, Gradients, and Flexbox | More precise selectors, positioning, stacking, gradients, and one-dimensional layouts. |
| | 6 | CSS Grid and Responsive Web Design | Grid-based layouts, flexible tracks, media queries, and mobile-first design. |
| | 7 | CSS Transforms, Transitions, and Animations | Visual transformations, interaction states, motion, and animation. |
| **3. Programming with JavaScript** | 8 | JavaScript Fundamentals, Data Types, and Collections | Variables, values, operators, strings, arrays, and objects. |
| | 9 | JavaScript Operators, Conditions, and Loops | Decisions, comparisons, logical expressions, and repetition. |
| | 10 | JavaScript Functions, Functional Patterns, and Asynchronous Programming | Functions, scope, callbacks, Promises, `async`/`await`, and Fetch. |
| | 11 | Object-Oriented Programming and Error Handling | Objects, prototypes, classes, inheritance, and exceptions. |
| **4. Working with the browser** | 12 | DOM Manipulation, Browser APIs, Storage, and WebSockets | DOM updates, events, browser APIs, JSON, storage, files, and real-time communication. |

## Development Setup

You will need a modern browser and a code editor. The following setup is suitable for the examples in this course:

1. Install [Visual Studio Code](https://code.visualstudio.com/) or another editor that supports HTML, CSS, and JavaScript.
2. Install a modern browser such as Firefox, Chrome, or Edge.
3. Create a project folder for each exercise. Keep HTML, CSS, JavaScript, and media files organized in separate files or folders as the project grows.
4. Use the browser's Developer Tools to inspect pages, read console messages, and debug code. In most browsers, the tools can be opened with `F12` or `Ctrl` + `Shift` + `I`.
5. For local projects, use a development server such as the **Live Server** extension in Visual Studio Code. A local HTTP server is especially useful for examples that use `fetch()` or browser APIs that do not work consistently when a page is opened directly through a `file://` URL.

The course does not require a JavaScript framework or a package manager. Students can complete the core lessons with plain HTML, CSS, and JavaScript files.

## How to Study Each Lecture

Treat the code examples as experiments rather than text to copy without understanding. Read the explanation first, type the example into your own project, and observe the result in the browser. Then change one or two values and predict what will happen before refreshing the page. This habit helps connect the code to its visible behaviour.

After each topic, complete the practice task without looking at a solution. When a reference solution is provided, use it to compare approaches and identify what you could improve. Pay attention to browser errors and warnings; learning to diagnose them is an important part of front-end development.

A useful study rhythm is **one or two lectures per week**, with additional time reserved for coding practice. The actual duration will depend on students' prior experience and how much time they spend extending the exercises.

## Practical Work and Projects

The lectures include short examples and practice activities. Some lecture folders also contain reference solutions or complete sample projects. These materials are intended to support learning after students have attempted the work independently.

A recommended progression of practical projects is:

- **HTML profile or portfolio page:** practise page structure, headings, links, images, and semantic elements.
- **Multimedia information page:** combine media, captions, and a form with clear labels.
- **Responsive article or card layout:** use CSS selectors, the box model, Flexbox, and Grid.
- **Interactive component:** use JavaScript to respond to user input and update page content.
- **Final project — Todo Manager:** build an application that lets users add, complete, edit, and remove tasks, then persist the task list with browser storage. The final project should combine semantic HTML, responsive CSS, JavaScript logic, DOM manipulation, events, and data storage.

## Repository Structure

Each lecture is stored in its own folder. The Markdown file is the main lesson document; related images, exercises, and reference solutions are kept alongside it where available.

```text
Front_End/
├── README.md
├── Lecture_01/
│   ├── Lecture1.md
│   └── attachments/
├── Lecture_02/
│   ├── Lecture2.md
│   └── Solutions/
├── Lecture_03/
│   ├── Lecture3.md
│   └── Solution/
├── ...
└── Lecture_12/
    ├── Lecture12.md
    ├── attachments/
    └── Solution/
```

Folder names may use either `Solution` or `Solutions`, depending on the original lecture. Not every lecture has a separate solution folder. **The Markdown lecture files are the primary revised course material.** The pre-existing `Lecture_09/Lecture9.pdf` has been retained from the supplied archive and may not include every revision made to the Markdown version.

## Further Learning

The following resources are useful for revisiting concepts and checking browser support:

- [MDN Web Docs](https://developer.mozilla.org/) — detailed references and tutorials for HTML, CSS, JavaScript, and Web APIs.
- [web.dev](https://web.dev/learn/) — learning paths and guidance for modern web development.
- [freeCodeCamp](https://www.freecodecamp.org/learn/) — interactive lessons and practice challenges.

Use reference documentation to answer specific questions, but always test unfamiliar code in a small project. Browser behaviour and web standards evolve, so checking reliable documentation is part of a developer's normal workflow.

## Contributing

Corrections, clearer explanations, additional examples, and exercise improvements are welcome. When contributing, aim to preserve the teaching progression and explain not only *what* a feature does, but also *when* and *why* a developer would use it.

## Contact

For questions or suggestions, open an issue in the repository or use the maintainer contact details associated with the project.

---

**Bayt-al-Hikmah — Learn the foundations. Build with purpose.**
