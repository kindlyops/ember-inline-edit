import Ember from 'ember'

const {
  Controller,
  Logger: { log }
} = Ember

export default Controller.extend({
  value: 'Default Value',
  enabled: false,

  actions: {
    onSave (value) {
      log('Got save action');
      this.set('value', value)
    },

    onClose () {
      log('Got close action');
    },

    enable(){
      this.toggleProperty('enabled');
    }
  }
})
