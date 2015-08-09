import Em from 'ember'

export default Em.Controller.extend({
  value: '',

  actions: {
    onSave (val) {
      console.log('Got save action');
    },

    onClose (val) {
      console.log('Got close action');
    }
  }
})
