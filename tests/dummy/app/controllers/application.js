import Em from 'ember'

export default Em.Controller.extend({
  value: '',

  actions: {
    onSave (val) {
      console.log(val)
    }
  }
})
