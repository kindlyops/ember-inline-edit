import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked value = 'Default Value';
  @tracked enabled = false;

  @action
  onSave(value) {
    console.log('Got save action');
    this.value = value;
  }

  @action
  onCancel() {
    console.log('Got close action');
  }

  @action
  enable() {
    this.enabled = !this.enabled;
  }
}
