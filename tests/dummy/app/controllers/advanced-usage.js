import Controller, {
  inject as controller
} from '@ember/controller';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  applicationController: controller('application'),
  value: alias('applicationController.value')
})
