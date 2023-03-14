import Controller, {
  inject as controller
} from '@ember/controller';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  applicationController: controller('application'),
  value: readOnly('applicationController.value')
})
