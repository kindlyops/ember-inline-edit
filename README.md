# ember-inline-edit

ember-inline-edit provides inline editing for your ember apps. Has basic keyboard support, too.

## Installation

`ember install ember-inline-edit`

## Usage

Use the `ember-inline-edit` component and provide it a default value.

```handlebars
  {{#ember-inline-edit
    value=value}}
```

This will give you a component that can be edited inline. By default, it is a textfield. You can, however, change the field type. Here's how:

```handlebars
  {{#ember-inline-edit
    value=value
    field='textarea'}}
```

This will make it a textarea. The current supported types are: text, email, phone, textarea (if you need more, feel free to create an issue).

It also exposes an action `onSave` that is called (with the value as an argument) when the user hits save. Here's how that works:

```handlebars
  {{#ember-inline-edit
    value=value
    field='textarea'
    onSave='changeValue'}}
```

Inside your route, you can handle the `saveModel` action like this:

```handlebars
  actions: {
    changeValue (val) {
      this.set('value', value)
    }
  }
```

By default, when the `value` is empty, it says 'Not provided'. You have the option to customize that. Here's how you can do that:

```handlebars
  {{#ember-inline-edit
    value=value
    emptyLabel='It is empty'
    field='textarea'
    onSave='changeValue'}}
```

With this, if the `value` is empty, it will show `It is empty` instead.

There's no styling provided by default. Feel free to add your own.

## Issues? Bugs?

Please report any issues or bugs you find. Feel free to send in PRs too.
