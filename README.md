# Mermir

## About

Mermir is a tool that allows you to launch complex workflows in npm using the MermaidJS flowcharts. It allows your to use all power of modern diagraming tool in order to describe and launch complex workflows.

## Installation

`npm i mermir`

## Getting started

First, you should create a MermaidJS diagram file at the root of your project named `mermir.mermaid`. Then you must use flowchart syntax to describe connections of your npm tasks. Consider your `package.json` has three scripts: `build:js`, `build:styles` and `deploy`. For example, you want to launch `build:styles` and `build:js` in parallel, and the launch `deploy`. Then you can fill your `mermir.mermaid` file in following way:

```
flowchart
build:js-->deploy
build:styles-->deploy
```

And then run in the comand line

`npx mermir run`

Or set the script in your package.json:

`"workflow": "memir run"`
