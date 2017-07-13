[![Ember Observer Score](https://emberobserver.com/badges/ember-inline-edit.svg)](https://emberobserver.com/addons/ember-inline-edit)
[![CircleCI](https://circleci.com/gh/swastik/ember-inline-edit.svg?style=svg)](https://circleci.com/gh/swastik/ember-inline-edit)

# ember-inline-edit

ember-inline-edit provides inline editing for your ember apps. Has basic keyboard support, too.

## Installation

`ember install ember-inline-edit`

## Usage

Use the `ember-inline-edit` component and provide it a default value.

```handlebars
  {{ember-inline-edit
    value=value}}
```

To learn more, please check out our documentation.

#### Keyboard Support

Inside the inputs (the textarea, input fields, etc.), if the user hits `enter`, it does exactly what a click on the save button would do (i.e. sends an `onSave` action and closes the editor).

If the user hits `esc`, the editor closes and sends the `onClose` action.

## Issues? Bugs?

Please report any issues or bugs you find.
