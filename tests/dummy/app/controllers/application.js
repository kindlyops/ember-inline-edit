import Controller from '@ember/controller';

export default Controller.extend({
  value: 'Default Value',
  enabled: false,

  actions: {
    onSave (value) {
      // eslint-disable-next-line no-console
      console.log('Got save action');
      this.set('value', value)
    },

    onCancel () {
      // eslint-disable-next-line no-console
      console.log('Got close action');
    },

    enable(){
      this.toggleProperty('enabled');
    }
  }
})
