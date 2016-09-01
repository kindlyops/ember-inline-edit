import Ember from 'ember'
import layout from '../templates/components/ember-inline-edit'

const {
  get,
  set,
  computed,
  on,
  run,
  Logger,
  String: { htmlSafe }
} = Ember

const {
  info
} = Logger

export default Ember.Component.extend({
  layout,
  classNames: ['ember-inline-edit'],
  classNameBindings: ['isEditing:is-editing', 'enabled::disabled'],

  textFields: ['search', 'url', 'text', 'phone', 'email', 'number'],
  textAreaFields: ['textarea'],

  isMultiline: computed('field', 'textAreaFields', function () {
    return get(this, 'textAreaFields').includes(get(this, 'field'))
  }),

  isEditing: false,
  enabled: true,
  field: 'text',
  value: null,
  placeholder: 'Not Provided',
  saveLabel: 'Save',
  fieldWidth: null,

  valueIsEmpty: computed.empty('value'),

  setup: on('didInsertElement', function () {
    this._handleClick = this._handleClick.bind(this)
    this._handleKeyup = this._handleKeyup.bind(this)
    this._setupEventHandlers()
  }),

  _setupEventHandlers () {
    Ember.$(document).on('click', this._handleClick)
    Ember.$(this.element).on('keyup', '.ember-inline-edit-input', this._handleKeyup)
  },

  _handleClick (e) {
    const isEditing = get(this, 'isEditing')
    const enabled = get(this, 'enabled')

    const editor = Ember.$(this.element)
    const target = Ember.$(e.target)
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

  _handleKeyup (e) {
    const isEditing = get(this, 'isEditing')
    const isMultiline = get(this, 'isMultiline')

    const isEnter = e.which === 13 || e.keyCode === 13
    const isEsc = e.which === 27 || e.keyCode === 27

    if (!isEditing) { return }

    if (isEnter && !isMultiline) {
      this.send('save')
    } else if (isEsc) {
      this.send('close')
    }
  },

  _focusOnInput () {
    run.next(() => {
      Ember.$(this.element).find('.ember-inline-edit-input').focus()
    })
  },

  _teardown: on('willDestroyElement', function () {
    Ember.$(document).off('click', this._handleClick)
    Ember.$(this.element).off('keyup', '.ember-inline-edit-input', this._handleKeyup)
  }),

  didReceiveAttrs () {
    if (!get(this, 'enabled')) {
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

      this._focusOnInput()
    },

    close () {
      info('[ember-inline-edit] Got the `onClose` action')
      this.sendAction('onClose')

      run(this, () => {
        set(this, 'isEditing', false)
      })
    },

    setValue (value) {
      run(this, () => { set(this, 'value', value) })
    }
  }
})

