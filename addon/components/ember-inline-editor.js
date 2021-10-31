import Component from '@ember/component'
import { scheduleOnce } from '@ember/runloop'

import layout from '../templates/components/ember-inline-editor'

const isInputField = el => {
  const { tagName } = el

  if (!tagName) {
    return false
  }

  return ['input', 'textarea', 'select'].includes(tagName.toLowerCase())
}

export default Component.extend({
  layout,
  shouldHide: false,
  attributeBindings: ['shouldHide:hidden'],

  textFields: ['search', 'url', 'text', 'phone', 'email', 'number'],
  textAreaFields: ['textarea'],

  didReceiveAttrs() {
    this._super(...arguments)
    scheduleOnce('afterRender', this.focusOnInput.bind(this))
  },

  focusOnInput() {
    const children = [...this.element.children]

    children.forEach(child => {
      if (isInputField(child)) child.focus()
    })
  },

  keyUp(ev) {
    const { field, textAreaFields } = this
    const { keyCode } = ev

    const isEnter = keyCode === 13
    const isEsc = keyCode === 27

    if (isEnter && !textAreaFields.includes(field)) {
      this['on-save']()
    } else if (isEsc) {
      this['on-cancel']()
    }
  }
})
