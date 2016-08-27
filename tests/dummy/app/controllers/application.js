import Em from 'ember'

export default Em.Controller.extend({
  value: '',
  enabled: false,

  actions: {
    onSave () {
      console.log('Got save action');
    },
    onClose () {
      console.log('Got close action');
    },
    enable(){
      this.toggleProperty('enabled');
    }
  }
})
