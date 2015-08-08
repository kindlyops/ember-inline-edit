import Ember from 'ember';

const {
  get: get,
  set: set,
  computed,
  on,
  getWithDefault,
  run
} = Em

export default Ember.Component.extend({
  classNames: ['ember-inline-edit'],
  classNameBindings: ['isEditing:is-editing'],

  textFields: ['text', 'phone', 'email'],
  textAreaFields: ['textarea'],

  isEditing: false,

  field: 'text',
  value: null,
  emptyLabel: 'Not Provided',

  valueIsEmpty: computed.empty('value'),

  setup: on('didInsertElement', function () {
    this._handleClick = this._handleClick.bind(this)
    this._handleKeyup = this._handleKeyup.bind(this)
    this._setupEventHandlers()
  }),

  _setupEventHandlers () {
    $(document).on('click', this._handleClick)
    $(this.element).on('keyup', '.ember-inline-edit-input', this._handleKeyup)
  },

  _handleClick (e) {
    const isEditing = get(this, 'isEditing')
    const editor = $(this.element)
    const target = $(e.target)
    const isInside = editor.is(target) || editor.has(target).length > 0

    if (isInside && !isEditing) {
      set(this, 'isEditing', true)
      this._focusOnInput()
    } else if (!isInside && isEditing) {
      set(this, 'isEditing', false)
    }
  },

  _handleKeyup (e) {
    const isEditing = get(this, 'isEditing')
    const isEnter = e.which === 13 || e.keyCode === 13

    if (isEditing && isEnter) {
      set(this, 'isEditing', false)
    }
  },

  _focusOnInput () {
    run.next(() => { $('.ember-inline-edit-input').focus() })
  },

  actions: {
    save () {
      this.sendAction('onSave', this.get('value'))
      set(this, 'isEditing', false)
    },

    setValue (value) {
      set(this, 'value', value)
    }
  }
});
