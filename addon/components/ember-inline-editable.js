import Component from '@ember/component'
import { empty } from '@ember/object/computed';

import layout from '../templates/components/ember-inline-editable'

export default Component.extend({
  layout,

  classNames: ['ember-inline-editable'],
  classNameBindings: ['showEditButton:is-not-clickable'],
  shouldHide: false,
  attributeBindings: ['shouldHide:hidden'],
  valueIsEmpty: empty('value')
})
