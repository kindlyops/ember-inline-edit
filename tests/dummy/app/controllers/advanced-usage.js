import Ember from 'ember'

const {
  Controller,
  computed,
  inject
} = Ember

export default Controller.extend({
  applicationController: inject.controller('application'),
  value: computed.alias('applicationController.value')
})
