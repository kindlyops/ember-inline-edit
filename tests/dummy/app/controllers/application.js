import Em from 'ember'

export default Em.Controller.extend({
  value: '',

  actions: {
    onSave () {
      console.log('Got save action');
    },

    onClose () {
      console.log('Got close action');
    }
  }
})
