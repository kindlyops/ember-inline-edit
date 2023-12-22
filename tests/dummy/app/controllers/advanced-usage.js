import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AdvancedUsageController extends Controller {
  @tracked value = 'option-3';

  @action
  setValue(ev) {
    this.value = ev.target.value;
  }
}
