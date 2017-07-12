import Ember from 'ember'

const {
  Controller,
  Logger: { log }
} = Ember

export default Controller.extend({
  value: '',
  enabled: false,

  actions: {
    onSave () {
      log('Got save action');
    },
    onClose () {
      log('Got close action');
    },

    enable(){
      this.toggleProperty('enabled');
    }
  }
})
