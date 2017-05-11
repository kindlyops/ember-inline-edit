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

This will give you a component that can be edited inline. By default, it is a textfield. You can, however, change the field type. Here's how:

```handlebars
  {{ember-inline-edit
    value=value
    field='textarea'}}
```

This will make it a textarea. The current supported types are: text, email, phone, textarea (if you need more, feel free to create an issue).

It also exposes an action `onSave` that is called (with the value as an argument) when the user hits save. Here's how that works:

```handlebars
  {{ember-inline-edit
    value=value
    field='textarea'
    onSave=(action (mut someValue))}}
```

There's an `onClose` action that is called when the editor is closed (either by clicking outside or pressing the `esc` key). You can use this to handle cases where, for example, you want to rollback unsaved changes.

Here's how you can use that:

```handlebars
  {{ember-inline-edit
    value=value
    field='textarea'
    onSave=(action (mut someValue))
    onClose=(action "rollback" "attr")}}
```

By default, name the `value` is empty, it says 'Not provided'. You have the option to customize that. Here's how you can do that:

```handlebars
  {{ember-inline-edit
    value=value
    placeholder='It is empty'
    field='textarea'
    onSave=(action (mut someValue))}}
```

With this, if the `value` is empty, it will show `It is empty` instead.

By default, the save button is labeled 'Save'. You can change that easily:

```handlebars
  {{ember-inline-edit
    value=value
    field='text'
    saveLabel='✓'
    onSave=(action (mut someValue))}}
```

Editing can be conditionally prevented with the `enabled` property. When the component becomes disabled, the `onClose` event will be fired.

```handlebars
  {{ember-inline-edit
    value=value
    enabled=session.isAuthenticated
    onSave=(action (mut someValue))}}
```

There's no styling provided by default. Feel free to add your own.

## Block Usage

In case you need to go beyond the default textfields and control what shows as the editable (say an header tag) and what shows as the editor (say a custom select component), you can do that too.

Here’s an example:

```
  {{#ember-inline-edit value=value as |inline-edit|}}
    {{#inline-edit.editable}}
      <h3>Edit this</h3>
    {{/inline-edit.editable}}

    {{#inline-edit.editor field="textarea"}}
      <select id="some-select" name="some-name">
        <option value="option-1">Option 1</option>
        <option value="option-2">Option 2</option>
      </select>
    {{/inline-edit.editor}}
  {{/ember-inline-edit}}
```

Everything else (the actions, keyboard support, etc.) works just the same.

#### Keyboard Support

Inside the inputs (the textarea, input fields, etc.), if the user hits `enter`, it does exactly what a click on the save button would do (i.e. sends an `onSave` action and closes the editor).

If the user hits `esc`, the editor closes and sends the `onClose` action.

## Issues? Bugs?

Please report any issues or bugs you find.
