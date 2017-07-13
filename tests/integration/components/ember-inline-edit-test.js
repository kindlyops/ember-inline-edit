import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// const down  = $.Event('keyup', { keyCode: 40, which: 40})
// const up    = $.Event('keyup', { keyCode: 38, which: 38})
// const enter = $.Event('keyup', { keyCode: 13, which: 13})
// const esc   = $.Event('keyup', { keyCode: 27, which: 27})

const { $, run } = Ember

moduleForComponent('ember-inline-edit', 'Integration | Component | ember inline edit', {
  integration: true,

  beforeEach: function () {
    this.on('onSave', (val) => {
      this.set('value', val)
    })

    this.on('onClose', () => {
      this.set('value', 'closed')
    })

    this.on('onCancel', () => {
      this.set('value', 'canceled')
    })

    this.set('value', null)
  }
})

test('it renders', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  assert.equal(this.$('.ember-inline-edit').length, 1)
})

test('the label is default', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  assert.equal(this.$('.ember-inline-edit').text().trim(), 'Not Provided')
})

test('on click, it shows the input and the buttons by default', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  assert.equal(this.$('.ember-inline-edit-input').length, 0)
  assert.equal(this.$('.ember-inline-edit-save').length, 0)
  assert.equal(this.$('.ember-inline-edit-cancel').length, 0)

  this.$('.ember-inline-edit').click();

  assert.equal(this.$('.ember-inline-edit-input').length, 1)
  assert.equal(this.$('.ember-inline-edit-save').length, 1)
  assert.equal(this.$('.ember-inline-edit-cancel').length, 1)
})

test('on click, the input gets focus', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click();
  assert.ok(document.activeElement.classList.contains('ember-inline-edit-input'))
})

test('it does not render the save button', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        showSaveButton=false
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click();

  assert.equal(this.$('.ember-inline-edit-save').length, 0)
})

test('it does not render the cancel button', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        showCancelButton=false
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click();

  assert.equal(this.$('.ember-inline-edit-cancel').length, 0)
})

test('it renders a non-default save button label', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        saveLabel="✓"
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click();

  assert.equal(this.$('.ember-inline-edit-save').text().trim(), "✓")
})

test('it renders a non-default cancel button label', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        cancelLabel="x"
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click();

  assert.equal(this.$('.ember-inline-edit-cancel').text().trim(), "x")
})

test('on click, it renders the hint if present', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        hintLabel="press Enter to save"
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  assert.equal(this.$('.ember-inline-edit .hint').length, 0)

  this.$('.ember-inline-edit').click();

  assert.equal(this.$('.ember-inline-edit .hint').text().trim(), 'press Enter to save')
})

test('on save, it sends the save action', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click()

  this.$('.ember-inline-edit-input').val('Something')
  this.$('.ember-inline-edit-input').trigger('input')

  this.$('.ember-inline-edit-save').click()

  assert.equal(this.get('value'), 'Something')
})

test('on pressing enter in text field, it sends the save action', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click()

  this.$('.ember-inline-edit-input').val('Something')
  this.$('.ember-inline-edit-input').trigger('input')
  this.$('.ember-inline-edit-input').trigger('enter')

  assert.equal(this.get('value'), 'Something')
})

test('on pressing enter in textarea field, it does not send the save action', function (assert) {
  this.render(hbs`{{ember-inline-edit
                    value=value
                    field="textarea"
                    onSave="onSave"
                    onClose="onClose"
                    onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click()

  run(() => {
    this.$('.ember-inline-edit-input').val('Something')
    this.$('.ember-inline-edit-input').trigger('input')
    this.$('.ember-inline-edit-input').trigger('enter')
  })

  assert.equal(this.$('.ember-inline-edit-input').length, 1)
})

test('on cancel, it sends the cancel action and restores the input field to initial state', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  this.$('.ember-inline-edit').click()

  this.$('.ember-inline-edit-input').val('Some initial value')
  this.$('.ember-inline-edit-input').trigger('input')
  this.$('.ember-inline-edit-save').click()

  this.$('.ember-inline-edit').click()

  this.$('.ember-inline-edit-input').val('Some new value')
  this.$('.ember-inline-edit-input').trigger('input')
  this.$('.ember-inline-edit-cancel').click()

  assert.equal(this.get('value'), 'Some initial value')
  assert.equal(this.$('.ember-inline-edit').text().trim(), 'Some initial value')
})

test('on pressing esc, it sends the close action', function (assert) {
  this.render(hbs`{{ember-inline-edit
                        value=value
                        onSave="onSave"
                        onClose="onClose"
                        onCancel="onCancel"}}`);

  assert.equal(this.$('.ember-inline-edit-input').length, 0)

  this.$('.ember-inline-edit').click()
  assert.equal(this.$('.ember-inline-edit-input').length, 1)

  this.$('.ember-inline-edit-input').trigger('esc')
  assert.equal(this.get('value'), null)
})

test('the text field is the same width as the original element', function(assert){
  this.render(hbs`{{ember-inline-edit
                      value='A long field value, probably at least a few hundred pixels'
                      onSave="onSave"
                      onClose="onClose"
                      onCancel="onCancel"}}`);

  assert.equal(this.$('.ember-inline-edit-input').length, 0)

  let { width } = document
    .querySelector('.ember-inline-edit')
    .getBoundingClientRect()

  this.$('.ember-inline-edit').click()

  let inputWidth = document
    .querySelector('.ember-inline-edit-input')
    .style
    .width

  assert.equal(inputWidth, `${width + 2}px`)
})

test('on click, it does nothing if not enabled', function (assert) {
  this.render(hbs`{{ember-inline-edit
                    enabled=false}}`);

  assert.equal(this.$('.ember-inline-edit-input').length, 0)
  assert.equal(this.$('.ember-inline-edit-save').length, 0)

  this.$('.ember-inline-edit').click();
  assert.equal(this.$('.ember-inline-edit-input').length, 0)
  assert.equal(this.$('.ember-inline-edit-save').length, 0)
})

test('it should send the close action if disabled', function (assert) {
  this.set('enabled', true);
  this.render(hbs`{{ember-inline-edit
                    enabled=enabled
                    value=value}}`);

  this.$('.ember-inline-edit').click();
  assert.equal(this.$('.ember-inline-edit-input').length, 1)
  assert.equal(this.$('.ember-inline-edit-save').length, 1)

  this.set('enabled', false);
  assert.equal(this.$('.ember-inline-edit-input').length, 0)
  assert.equal(this.$('.ember-inline-edit-save').length, 0)
  assert.equal(this.get('value', 'closed'))
})

test('it should gain the .disabled class if not enabled', function (assert) {
  this.set('enabled', true);
  this.render(hbs`{{ember-inline-edit
                    enabled=enabled
                    value=value}}`);

  assert.equal(this.$('.ember-inline-edit:not(.disabled)').length, 1)

  this.set('enabled', false);
  assert.equal(this.$('.ember-inline-edit.disabled').length, 1)
})

test('it should render the editable inside block if a block is present', function(assert) {
  this.render(hbs`{{#ember-inline-edit as |inline-edit|}}
                    {{#inline-edit.editable}}
                      Test
                    {{/inline-edit.editable}}
                  {{/ember-inline-edit}}`);

  assert.equal(this.$().text().trim(), 'Test')

});

test('it should render the editor inside block if a block is present', function(assert) {
  this.render(hbs`{{#ember-inline-edit as |inline-edit|}}
                    {{#inline-edit.editor}}
                      Test
                    {{/inline-edit.editor}}
                  {{/ember-inline-edit}}`);

  const text = this.$().text().trim()
  assert.ok(/Test/.test(text), "renders the custom component")
  assert.ok(/Save/.test(text), "renders the save button")
});

test('it should toggle the custom editor when clicked on the editable', function(assert) {
  this.render(hbs`{{#ember-inline-edit as |inline-edit|}}
                    {{#inline-edit.editable}}
                      <div class="editable">
                        Editable
                      </div>
                    {{/inline-edit.editable}}

                    {{#inline-edit.editor}}
                      <div class="editor">
                        Editor
                      </div>
                    {{/inline-edit.editor}}
                  {{/ember-inline-edit}}`);

  assert.ok(this.$('.editor').parent().hasClass("is-hidden"), "editor is hidden by default")
  assert.ok(this.$('.editable').parent().hasClass("is-visible"), "editable is visible by default")

  $('.editor').trigger('click')

  assert.ok(this.$('.editor').parent().hasClass("is-visible"), "editor is visible after click")
  assert.ok(this.$('.editable').parent().hasClass("is-hidden"), "editable is hidden after click")
});
