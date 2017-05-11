import Ember from 'ember';
import layout from '../templates/components/ember-inline-editable';

const {
  computed,
  Component
} = Em

export default Component.extend({
  layout,

  classNames: ['ember-inline-editable'],
  classNameBindings: ['isVisible:is-visible:is-hidden', 'showEditButton:is-not-clickable'],
  valueIsEmpty: computed.empty('value')
});
