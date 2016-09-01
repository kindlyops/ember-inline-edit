import Ember from 'ember';
import layout from '../templates/components/ember-inline-editor';

const {
  get,
  set,
  computed,
  $
} = Em

export default Ember.Component.extend({
  layout,

  textFields: ['search', 'url', 'text', 'phone', 'email', 'number'],
  textAreaFields: ['textarea'],

  didInsertElement () {
    this._handleKeyup = this._handleKeyup.bind(this)
    this._element = $(this.element)

    this._element.on('keyup', '.ember-inline-edit-input', this._handleKeyup)
  },

  willDestroyElement () {
    this._element.off('keyup', '.ember-inline-edit-input', this._handleKeyup)
  },

  _handleKeyup (e) {
    const field = get(this, 'field')
    const textAreaFields = get(this, 'textAreaFields')

    const isEnter = e.which === 13 || e.keyCode === 13
    const isEsc = e.which === 27 || e.keyCode === 27

    if (isEnter && textAreaFields.indexOf(field) < 0) {
      this.sendAction('on-save')
    } else if (isEsc) {
      this.sendAction('on-close')
    }
  },
});
