import Ember from 'ember';
import layout from '../templates/components/ember-inline-editable';

const {
  computed,
  Component
} = Em

export default Component.extend({
  layout,

  valueIsEmpty: computed.empty('value')
});
