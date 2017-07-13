import Component from '@ember/component'
import { get, set, computed } from '@ember/object'
import { htmlSafe } from '@ember/string'
import { run } from '@ember/runloop'

import layout from '../templates/components/ember-inline-edit'

const {
  $
} = Ember

const clickIsInside = (element, target) => {
  return $(element).is($(target)) || $(element).has($(target)).length > 0
}

export default Component.extend({
  layout,
  classNames: ['ember-inline-edit'],
  classNameBindings: ['isEditing:is-editing', 'enabled::disabled'],

  isEditing: false,
  isNotEditing: computed.not('isEditing'),

  enabled: true,
  field: 'text',
  value: null,
  previousValue: null,
  placeholder: 'Not Provided',
  saveLabel: 'Save',
  cancelLabel: 'Cancel',
  fieldWidth: null,
  showSaveButton: true,
  showCancelButton: true,
  editorClass: '',
  buttonContainerClass: '',
  editButtonClass: '',
  saveButtonClass: '',
  cancelButtonClass: '',

  didInsertElement () {
    this._handleClick = this._handleClick.bind(this)

    $(document).on('click', this._handleClick)
  },

  willDestroyElement () {
    $(document).off('click', this._handleClick)
  },

  _handleClick (e) {
    let enabled = get(this, 'enabled')
    if (!enabled) return

    let isEditing = get(this, 'isEditing')
    let clickedInside = clickIsInside(this.element, e.target)

    if (clickedInside && !isEditing) {
      /*
       * If there's an edit button, we want clicks on it to
       * toggle the editor, so we don't do anything here
      */

      if (get(this, 'showEditButton')) return

      this._setFieldWidth()
      this.send('startEditing', e)

    } else if (!clickedInside && isEditing) {
      this.send('close')
    }
  },

  _setFieldWidth () {
    let editor = $(this.element)
    let width = htmlSafe(`width: ${(editor.width() + 2)}px`)

    run(this, () => set(this, 'fieldWidth', width))
  },

  didReceiveAttrs () {
    if (get(this, 'enabled') === false) {
      this.send('close')
    }
  },

  actions: {
    save () {
      this.sendAction('onSave', this.get('value'))

      run(this, () => {
        set(this, 'isEditing', false)
      })
    },

    startEditing (e) {
      e.stopPropagation()

      run(this, () => {
        set(this, 'previousValue', this.get('value'))
        set(this, 'isEditing', true)
      })
    },

    close () {
      this.sendAction('onClose')

      run(this, () => {
        set(this, 'isEditing', false)
      })
    },

    cancel () {
      this.sendAction('onCancel')

      run(this, () => {
        set(this, 'value', this.get('previousValue'))
        set(this, 'isEditing', false)
      })
    }
  }
})
