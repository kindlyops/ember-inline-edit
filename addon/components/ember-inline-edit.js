import Ember from 'ember'
import layout from '../templates/components/ember-inline-edit'

const {
  Component,
  get,
  set,
  computed,
  on,
  run,
  Logger,
  String: { htmlSafe },
  $
} = Ember

const {
  info
} = Logger

export default Component.extend({
  layout,
  classNames: ['ember-inline-edit'],
  classNameBindings: ['isEditing:is-editing', 'enabled::disabled'],

  isEditing: false,
  isNotEditing: computed.not('isEditing'),

  enabled: true,
  field: 'text',
  value: null,
  placeholder: 'Not Provided',
  saveLabel: 'Save',
  fieldWidth: null,

  setup: on('didInsertElement', function () {
    this._handleClick = this._handleClick.bind(this)
    this._setupEventHandlers()
  }),

  _setupEventHandlers () {
    $(document).on('click', this._handleClick)
  },

  _handleClick (e) {
    const isEditing = get(this, 'isEditing')
    const enabled = get(this, 'enabled')

    const editor = $(this.element)
    const target = $(e.target)
    const isInside = editor.is(target) || editor.has(target).length > 0

    if (!enabled) return

    if (isInside && !isEditing) {
      if (get(this, 'showEditButton')) {
        return
      }

      let width = htmlSafe('width: ' + (editor.width() + 2) + 'px')

      run(this, () => {
        set(this, 'fieldWidth', width)
      })

      this.send('startEditing', e)
    } else if (!isInside && isEditing) {
      this.send('close')
    }
  },

  _teardown: on('willDestroyElement', function () {
    Ember.$(document).off('click', this._handleClick)
  }),

  didReceiveAttrs () {
    if (get(this, 'enabled') === false) {
      this.send('close')
    }
  },

  actions: {
    save () {
      info('[ember-inline-edit] Got the `onSave` action')

      this.sendAction('onSave', this.get('value'))

      run(this, () => {
        set(this, 'isEditing', false)
      })
    },

    startEditing (e) {
      info('[ember-inline-edit] Got the `startEditing` action')

      e.stopPropagation()

      run(this, () => {
        set(this, 'isEditing', true)
      })
    },

    close () {
      info('[ember-inline-edit] Got the `onClose` action')
      this.sendAction('onClose')

      run(this, () => {
        set(this, 'isEditing', false)
      })
    }
  }
})

