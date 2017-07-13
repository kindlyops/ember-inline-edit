import Component from '@ember/component'
import { get } from '@ember/object'
import { scheduleOnce } from '@ember/runloop'

import layout from '../templates/components/ember-inline-editor';

const {
  $
} = Ember

export default Component.extend({
  layout,
  classNameBindings: ['isVisible:is-visible:is-hidden'],

  textFields: ['search', 'url', 'text', 'phone', 'email', 'number'],
  textAreaFields: ['textarea'],

  didReceiveAttrs () {
    scheduleOnce('afterRender', () => {
      $(this.element).children().first().focus()
    })
  },

  keyUp (e) {
    let field = get(this, 'field')
    let textAreaFields = get(this, 'textAreaFields')

    let isEnter = e.which === 13 || e.keyCode === 13
    let isEsc   = e.which === 27 || e.keyCode === 27

    /*
     * If the user pressed enter and it's not a textarea
     * field, we send the save action
    */

    if (isEnter && textAreaFields.indexOf(field) < 0) {
      this.sendAction('on-save')

    } else if (isEsc) {
      this.sendAction('on-close')
    }
  },
});
