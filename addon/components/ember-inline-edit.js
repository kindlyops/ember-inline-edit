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

  valueIsEmpty: computed.empty('value'),

  setup: on('didInsertElement', function () {
    this._handleClicks = this._handleClicks.bind(this)
    this._setupClickHandlers()
  }),

  _setupClickHandlers () {
    $(document).on('click', this._handleClicks)
  },

  _handleClicks (e) {
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

  _focusOnInput () {
    run.next(() => { $('.ember-inline-edit-input').focus() })
  },

  actions: {
    save () {
      this.sendAction('onSave', this.get('value'))
      set(this, 'isEditing', false)
    }
  }
});
