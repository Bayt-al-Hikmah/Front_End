# Lecture Writing Template

Use this pattern when creating or revising a lecture. Keep the section that fits the topic; do not add headings just to fill a template.

## Lecture flow

1. **Orient the reader.** State what the lecture covers and why an engineer would use it.
2. **Give the mental model.** Explain the central idea in one or two sentences before listing details.
3. **Build from simple to specific.** Introduce the smallest useful example, then add options, variations, and edge cases.
4. **Show the idea in use.** Include a short example and explain the result or the parts that matter.
5. **Make choices clear.** Compare alternatives when learners could confuse them; explain when each fits.
6. **Close the loop.** Summarize the key decisions and give practice that uses the same skills taught above.

## Lecture opening

````markdown
# Lecture NN — [specific topic]

> **Core idea:** [The one model that connects this lecture’s topics.]

## Learning goals
- [Action verb] [observable skill or decision].
- [Action verb] [observable skill or decision].
- [Action verb] [observable skill or decision].
````

Use three to five goals. Prefer verbs such as *identify, explain, choose, build, trace,* and *debug*. Avoid topic-only goals such as “CSS” or “JavaScript.”

## Concept section

````markdown
### [Concept]

[Definition and purpose: what it is, and why it matters.]

```language
[Small, complete example]
````

[Explain the result, the important syntax, and when to use it.]

> **Watch for:** [A common mistake, limitation, or boundary.]
```

For short reference items, combine the definition and use case in one or two sentences. Add a warning only when it prevents a likely error.

## Comparison section

Use a compact table when options solve similar problems. Compare by *purpose, behavior, and trade-off*; do not repeat the same explanation below the table.

## Practice section

State the goal, requirements, and expected result. Keep solution code separate from the prompt. Each task should exercise concepts already explained in the lecture.

## Editing rules

- Put one main idea in each paragraph. Lead with the idea, then add its reason or consequence.
- Prefer direct verbs and concrete subjects: “The browser sends a request” instead of “We can see that a request is sent.”
- Remove repeated introductions, filler, and claims that do not help a learner make a decision.
- Preserve every distinct concept, rule, example, limitation, and exercise when shortening a lecture.
- Explain technical terms at first use; use the same term consistently afterward.
- Make code examples internally consistent and runnable when practical. Explain omitted setup.
- Keep a quick-reference value: syntax, defaults, constraints, outputs, and common failure modes should be easy to scan.
- Use accessible language and meaningful alternatives for images; avoid claims that confuse convenience with security or browser behavior with server behavior.
