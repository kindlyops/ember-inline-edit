import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render, triggerEvent } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

import { fillIn, click, find, triggerKeyEvent } from '@ember/test-helpers'

module('Integration | Component | ember inline edit', function(hooks) {
  setupRenderingTest(hooks)

  hooks.beforeEach(function() {
    this.actions = {}
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args)
  })

  hooks.beforeEach(function() {
    this.actions.onSave = val => {
      this.set('value', val)
    }

    this.actions.onCancel = () => {
      this.set('value', 'canceled')
    }

    this.set('value', null)
  })

  const classNames = {
    container: '.ember-inline-edit',
    input: '.ember-inline-edit-input',
    saveBtn: '.ember-inline-edit-save',
    cancelBtn: '.ember-inline-edit-cancel',
    hint: '.ember-inline-edit .hint'
  }

  test('it renders', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    assert.ok(find(classNames.container))
  })

  test('the label is default', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    assert.equal(find(classNames.container).innerText.trim(), 'Not Provided')
  })

  test('on click, it shows the input and buttons', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    assert.notOk(find(classNames.input))
    assert.notOk(find(classNames.saveBtn))
    assert.notOk(find(classNames.cancelBtn))

    await click(classNames.container)

    assert.ok(find(classNames.input))
    assert.ok(find(classNames.saveBtn))
    assert.ok(find(classNames.cancelBtn))
  })

  test('on click, the input gets focus', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    await click(classNames.container)

    assert.ok(
      document.activeElement.classList.contains('ember-inline-edit-input')
    )
  })

  test('it does not render the save button', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          showSaveButton=false
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    await click(classNames.container)
    assert.notOk(find(classNames.saveBtn))
  })

  test('it does not render the cancel button', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          showCancelButton=false
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    await click(classNames.container)
    assert.notOk(find(classNames.cancelBtn))
  })

  test('it renders a non-default save button label', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          saveLabel="✓"
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    await click(classNames.container)
    assert.equal(find(classNames.saveBtn).innerText.trim(), '✓')
  })

  test('it renders a non-default cancel button label', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          cancelLabel="x"
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    await click(classNames.container)
    assert.equal(find(classNames.cancelBtn).innerText.trim(), 'x')
  })

  test('on click, it renders the hint if present', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          hintLabel="press Enter to save"
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    assert.notOk(find(classNames.hint))
    await click(classNames.container)

    assert.ok(find(classNames.hint))
    assert.ok(find(classNames.hint).innerText.trim(), 'press Enter to save')
  })

  test('on save, it sends the save action', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    await click(classNames.container)
    await fillIn(classNames.input, 'Something')
    await click(classNames.saveBtn)

    assert.equal(this.get('value'), 'Something')
  })

  test('on pressing enter in text field, it sends the save action', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=(readonly value)
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    await click(classNames.container)
    await fillIn(classNames.input, 'Something Else')
    await triggerKeyEvent(classNames.input, 'keyup', 13)

    assert.equal(this.get('value'), 'Something Else')
    assert.notOk(find(classNames.input))
  })

  test('on pressing enter in textarea field, it does not send the save action', async function(assert) {
    await render(hbs`{{ember-inline-edit
                      value=value
                      field="textarea"
                      onSave=(action "onSave")
                      onCancel=(action "onCancel")}}`)

    await click(classNames.container)
    await fillIn(classNames.input, 'Something')
    await triggerKeyEvent(classNames.input, 'keyup', 13)

    assert.ok(find(classNames.input))
  })

  test('on cancel, it sends the cancel action and restores the input field to initial state', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    await click(classNames.container)
    await fillIn(classNames.input, 'Some initial value')
    await click(classNames.saveBtn)

    await click(classNames.container)
    await fillIn(classNames.input, 'Some new value')
    await click(classNames.cancelBtn)

    assert.equal(this.get('value'), 'Some initial value')
  })

  test('on pressing esc, it sends the close action', async function(assert) {
    await render(hbs`{{ember-inline-edit
                          value=value
                          onSave=(action "onSave")
                          onCancel=(action "onCancel")}}`)

    assert.notOk(find(classNames.input))

    await click(classNames.container)
    assert.ok(find(classNames.input))

    await triggerEvent('.ember-inline-edit-input', 'esc')
    await triggerKeyEvent(classNames.input, 'keyup', 27)

    assert.notOk(find(classNames.input))
  })

  test('on outside click, it sends the close action', async function(assert) {
    assert.expect(4)

    this.set('onCancel', () => {
      assert.ok(true, 'got the onCancel action')
    })

    await render(hbs`
    {{ember-inline-edit
      value=value
      onCancel=onCancel}}

    <div class="outside-element"></div>
    `)

    assert.dom(classNames.input).doesNotExist('does not start in edit mode')

    await click(classNames.container)
    assert.dom(classNames.input).exists('goes into edit mode')

    await click('.outside-element')
    assert.dom(classNames.input).doesNotExist('goes out of edit mode')
  })

  test('on outside click, it calls `onOutsideClick` if provided', async function(assert) {
    assert.expect(4)

    this.set('onOutsideClick', () => {
      assert.ok(true, 'got the onOutsideClick action')
    })

    this.set('onCancel', () => {
      assert.ok(false, 'got the onCancel action but was not supposed to')
    })

    await render(hbs`
    {{ember-inline-edit
      value=value
      onOutsideClick=onOutsideClick
      onCancel=onCancel}}

    <div class="outside-element"></div>
    `)

    assert.dom(classNames.input).doesNotExist('does not start in edit mode')

    await click(classNames.container)
    assert.dom(classNames.input).exists('goes into edit mode')

    await click('.outside-element')
    assert.dom(classNames.input).exists('still in edit mode')
  })

  test('on outside click, if `onOutsideClick` returns a truthy value, the editor is closed', async function(assert) {
    assert.expect(5)

    this.set('onOutsideClick', () => {
      assert.ok(true, 'got the onOutsideClick action')
      return true
    })

    this.set('onCancel', () => {
      assert.ok(true, 'got the onCancel action')
    })

    await render(hbs`
    {{ember-inline-edit
      value=value
      onOutsideClick=onOutsideClick
      onCancel=onCancel}}

    <div class="outside-element"></div>
    `)

    assert.dom(classNames.input).doesNotExist('does not start in edit mode')

    await click(classNames.container)
    assert.dom(classNames.input).exists('goes into edit mode')

    await click('.outside-element')
    assert.dom(classNames.input).doesNotExist('goes out of edit mode')
  })

  test('the text field is the same width as the original element', async function(assert) {
    await render(hbs`{{ember-inline-edit
                        value='A long field value, probably at least a few hundred pixels'
                        onSave=(action "onSave")
                        onCancel=(action "onCancel")}}`)

    assert.notOk(find(classNames.input))

    let { width } = find(classNames.container).getBoundingClientRect()
    await click(classNames.container)

    let inputWidth = find(classNames.input).style.width
    assert.equal(inputWidth, `${width + 2}px`)
  })

  test('on click, it does nothing if not enabled', async function(assert) {
    await render(hbs`{{ember-inline-edit
                      enabled=false}}`)

    assert.notOk(find(classNames.input))
    await click(classNames.container)
    assert.notOk(find(classNames.input))
  })

  test('it should send the close action if disabled', async function(assert) {
    this.set('enabled', true)

    await render(hbs`{{ember-inline-edit
                      enabled=enabled
                      value=value}}`)

    await click(classNames.container)
    assert.ok(find(classNames.input))

    this.set('enabled', false)

    assert.notOk(find(classNames.input))
    assert.equal(this.get('value', 'closed'))
  })

  test('it should gain the .disabled class if not enabled', async function(assert) {
    this.set('enabled', true)

    await render(hbs`{{ember-inline-edit
                      enabled=enabled
                      value=value}}`)

    assert.ok(find('.ember-inline-edit:not(.disabled)'))

    this.set('enabled', false)
    assert.ok(find('.ember-inline-edit.disabled'))
  })

  test('it should render the editable inside block if a block is present', async function(assert) {
    await render(hbs`{{#ember-inline-edit as |inline-edit|}}
                      {{#inline-edit.editable}}
                        Test
                      {{/inline-edit.editable}}
                    {{/ember-inline-edit}}`)

    assert.equal(find(classNames.container).innerText.trim(), 'Test')
  })

  test('it should render the editor inside block if a block is present', async function(assert) {
    await render(hbs`{{#ember-inline-edit as |inline-edit|}}
                      {{#inline-edit.editor class="editor"}}
                        Test
                      {{/inline-edit.editor}}
                    {{/ember-inline-edit}}`)

    const text = find('.editor').innerText.trim()

    assert.ok(/Test/.test(text), 'renders the custom component')
    assert.ok(/Save/.test(text), 'renders the save button')
  })

  test('it should toggle the custom editor when clicked on the editable', async function(assert) {
    await render(hbs`{{#ember-inline-edit as |inline-edit|}}
                      {{#inline-edit.editable class="editable"}}
                        Editable
                      {{/inline-edit.editable}}

                      {{#inline-edit.editor class="editor"}}
                        Editor
                      {{/inline-edit.editor}}
                    {{/ember-inline-edit}}`)

    assert.ok(
      find('.editor').classList.contains('is-hidden'),
      'editor is hidden by default'
    )
    assert.ok(
      find('.editable').classList.contains('is-visible'),
      'editable is visible by default'
    )

    await click('.editor')

    assert.ok(
      find('.editor').classList.contains('is-visible'),
      'editor is visible after click'
    )
    assert.ok(
      find('.editable').classList.contains('is-hidden'),
      'editable is hidden after click'
    )
  })
})
