import Component from '@glimmer/component';
import { isEmpty } from '@ember/utils';

export default class EmberInlineEditableComponent extends Component {
  get valueIsEmpty() {
    return isEmpty(this.args.value);
  }
}
