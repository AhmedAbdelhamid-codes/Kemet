# 🏺 KEMET | كميت

### An Interactive Journey Through Ancient Egyptian History

KEMET is an interactive web experience dedicated to exploring the history of Ancient Egypt through **eras, dynasties, and kings**.

The project combines a modern, responsive interface with historical content to create an immersive journey through one of the world's oldest civilizations.

Built from scratch using **HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript**, KEMET focuses on dynamic rendering, reusable templates, native browser APIs, and performance-conscious animations — without relying on heavy JavaScript frameworks.

---

## ✨ Features

* 🏛️ **Historical Eras** — Explore the major periods of Ancient Egyptian history.
* 👑 **Kings & Dynasties** — Browse kings and their associated dynasties.
* 🔎 **Dynamic King Pages** — Every king has a dynamically generated page based on the URL query parameter.
* 📦 **Local JSON Data** — Historical data is structured and separated from the UI logic.
* 🎨 **Ancient Egyptian Inspired UI** — A visual identity inspired by Egyptian architecture, colors, and symbolism.
* 📱 **Fully Responsive** — Designed to work across desktop, tablet, and mobile devices.
* 🌀 **Scroll Animations** — Elements animate when entering the viewport.
* ⏱️ **Animated Statistics** — Counters are rendered smoothly using `requestAnimationFrame`.
* ⚡ **Dynamic Rendering** — Content is generated programmatically instead of duplicating HTML pages.
* ♿ **Semantic HTML** — Structured HTML elements are used to improve accessibility and maintainability.

---

# 🧠 Technical Highlights

## 1. Dynamic Data-Driven Architecture

Instead of hardcoding every king and historical entity into separate HTML pages, KEMET uses structured **JSON data** as the project's local data source.

The JavaScript layer reads this data and dynamically generates the required UI.

```text
JSON Data
    ↓
JavaScript Logic
    ↓
Dynamic Template
    ↓
DOM
    ↓
Rendered Page
```

This approach keeps the content separate from the presentation and makes the application easier to extend.

---

## 2. Dynamic Template Pages

One of the core ideas behind KEMET is avoiding duplicated pages.

For example:

```text
king.html?king-id=1805
```

The page reads the `king-id` from the URL, searches the corresponding entity inside the JSON data, and dynamically generates the king's page.

This means the same HTML template can represent multiple kings:

```text
king.html?king-id=1
king.html?king-id=2
king.html?king-id=3
...
```

Instead of creating:

```text
king-1.html
king-2.html
king-3.html
...
```

This makes the project more scalable and demonstrates the concept of **data-driven UI rendering** using Vanilla JavaScript.

---

## 3. Custom Data Fetching Layer

The project uses locally stored JSON files to organize its historical data.

A custom JavaScript data-access layer is used to load and process the required information before passing it to the rendering logic.

This creates a simple separation between:

```text
Data Layer
    ↓
Processing
    ↓
Rendering Layer
```

The architecture was designed to keep the UI logic independent from the actual content.

---

## 4. Advanced DOM Manipulation

KEMET relies heavily on native DOM APIs to build and update the interface dynamically.

The JavaScript layer is responsible for:

* Creating DOM elements.
* Updating existing elements.
* Injecting dynamic content.
* Generating cards and sections.
* Handling user interactions.
* Updating page content based on URL parameters.
* Applying animation states.

No frontend framework is required for the rendering system.

---

## 5. Intersection Observer API

Animations are triggered when elements enter the user's viewport using the native:

```javascript
IntersectionObserver
```

Instead of continuously listening to the `scroll` event, the browser observes the required elements and notifies the application when their visibility changes.

This provides a cleaner and more efficient approach to viewport-based animations.

---

## 6. Smooth Counters with `requestAnimationFrame`

The project includes animated numerical counters for historical statistics.

Instead of relying on:

```javascript
setInterval()
```

the animation loop uses:

```javascript
requestAnimationFrame()
```

This allows the browser to synchronize the animation with its rendering cycle, resulting in smoother visual transitions.

---

# 🛠️ Tech Stack

| Technology                    | Usage                                         |
| ----------------------------- | --------------------------------------------- |
| **HTML5**                     | Semantic page structure                       |
| **CSS3**                      | Styling, animations, responsive customization |
| **Bootstrap 5**               | Grid system and responsive layout             |
| **JavaScript ES6+**           | Application logic and dynamic rendering       |
| **JSON**                      | Local historical data storage                 |
| **DOM API**                   | Dynamic UI generation and manipulation        |
| **Intersection Observer API** | Viewport-based animations                     |
| **requestAnimationFrame**     | Smooth numerical animations                   |
| **Git & GitHub**              | Version control and project hosting           |

---

# 📂 Project Structure

```text
Kemet/
│
├── index.html
├── Eras.html
├── kings.html
├── king.html
├── whyKemet.html
│
├── css/
│   ├── bootstrap.min.css
│   └── custom stylesheets
│
├── js/
│   ├── application logic
│   ├── dynamic rendering
│   ├── data handling
│   └── animations
│
├── data/
│   ├── eras.json
│   └── kings.json
│
└── phots/
    ├── images
    ├── icons
    ├── logo
    └── other media
```

---

# 🏗️ Application Flow

The general rendering process can be summarized as:

```text
User opens a page
        ↓
JavaScript initializes
        ↓
Data is loaded from JSON
        ↓
Application processes the data
        ↓
Required entity is identified
        ↓
Dynamic template is generated
        ↓
DOM is updated
        ↓
Animations & interactions are initialized
```

For dynamic king pages:

```text
king.html?king-id=1805
        ↓
Read URLSearchParams
        ↓
Extract king-id
        ↓
Search kings.json
        ↓
Find matching king
        ↓
Generate template
        ↓
Render king information
```

---

# 🎯 Why KEMET?

KEMET was created as an attempt to combine **historical storytelling with modern frontend development**.

The goal wasn't simply to display information, but to make the user feel like they are moving through a historical journey.

The project focuses on:

* Presenting historical information in a structured way.
* Making large amounts of content easier to explore.
* Practicing data-driven interfaces.
* Building reusable rendering logic.
* Creating responsive and interactive experiences.
* Applying native JavaScript APIs in a real-world project.

---

# 📚 What I Learned

Building KEMET helped me strengthen my understanding of several frontend concepts:

* Working with structured JSON data.
* Designing a data-driven UI.
* Reading and handling URL query parameters.
* Creating reusable dynamic templates.
* Advanced DOM manipulation.
* Working with asynchronous JavaScript.
* Using native browser APIs.
* Implementing `IntersectionObserver`.
* Creating animation loops with `requestAnimationFrame`.
* Building responsive interfaces with Bootstrap and CSS.
* Organizing frontend code into reusable responsibilities.
* Thinking about scalability instead of duplicating pages.

Most importantly, the project helped me move from **writing individual webpage sections** to thinking about how a complete frontend application should be structured.

---

# 🚀 Future Improvements

Although the current version is complete, KEMET can be extended in the future with:

* 🏺 Detailed monuments and artifacts database.
* 🔍 Advanced search and filtering.
* 🗺️ Interactive map of Ancient Egyptian sites.
* 📜 More detailed dynasty timelines.
* 🌐 Multilingual support.
* 🔗 A dedicated backend/API instead of local JSON.
* ⚡ Migration to a modern frontend framework such as Angular.
* 🌙 Additional accessibility and UX improvements.

---

# 📸 Project Preview

> Screenshots and a visual showcase can be added here to demonstrate the main pages and interactions.

---

# 🌐 Live Demo

**KEMET — Explore Ancient Egypt**

👉 [Live Demo](https://ahmedabdelhamid-codes.github.io/Kemet/)

---

# 👨‍💻 Author

**Ahmed Abdelhamid**

Frontend Developer | Software Engineering Student

Interested in building interactive, responsive, and data-driven web experiences.

---

## ⭐ Support

If you found the project interesting, consider giving the repository a ⭐ on GitHub.
It helps support the project and motivates further development.

---

<p align="center">
  Built with ❤️ and JavaScript
</p>
