import Ember from 'ember';
import layout from '../templates/components/ember-inline-editor';

const {
  get,
  set,
  computed,
  Component,
  $
} = Em

export default Component.extend({
  layout,
  classNameBindings: ['isVisible:is-visible:is-hidden'],

  textFields: ['search', 'url', 'text', 'phone', 'email', 'number'],
  textAreaFields: ['textarea'],

  keyUp (e) {
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
