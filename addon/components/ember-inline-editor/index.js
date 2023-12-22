import Component from '@glimmer/component';
import { scheduleOnce } from '@ember/runloop';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';

const isInputField = (el) => {
  const { tagName } = el;

  if (!tagName) {
    return false;
  }

  return ['input', 'textarea', 'select'].includes(tagName.toLowerCase());
};

export default class EmberInlineEditorComponent extends Component {
  textFields = ['search', 'url', 'text', 'phone', 'email', 'number'];
  textAreaFields = ['textarea'];
  element = null;

  @action
  registerElement(element) {
    this.element = element;
    scheduleOnce('afterRender', this.focusOnInput.bind(this));
  }

  @action
  focusOnInput() {
    const children = [...this.element.children];

    children.forEach((child) => {
      if (isInputField(child)) child.focus();
    });
  }

  @action
  handleKeyUp(ev) {
    const { textAreaFields } = this;
    const { keyCode } = ev;

    const isEnter = keyCode === 13;
    const isEsc = keyCode === 27;

    if (isEnter && !textAreaFields.includes(this.args.field)) {
      this.args['on-save']();
    } else if (isEsc) {
      this.args['on-cancel']();
    }
  }

  @action
  handleInput(ev) {
    this.args['on-update']?.(ev.target.value);
  }

  get safeHintLabel() {
    return htmlSafe(this.args.hintLabel);
  }
}
