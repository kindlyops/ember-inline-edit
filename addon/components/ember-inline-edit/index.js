import Component from '@glimmer/component';
import { set } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { run } from '@ember/runloop';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { localCopy } from 'tracked-toolbox';

export default class EmberInlineEdit extends Component {
  @tracked isEditing = false;

  get isNotEditing() {
    return !this.isEditing;
  }

  @localCopy('args.enabled', true)
  enabled;

  @localCopy('args.field', 'text')
  field;

  @localCopy('args.value', null)
  value;

  previousValue = null;

  @localCopy('args.placeholder', 'Not Provided')
  placeholder;

  @localCopy('args.saveLabel', 'Save')
  saveLabel;

  @localCopy('args.cancelLabel', 'Cancel')
  cancelLabel;

  @localCopy('args.editLabel', 'Edit')
  editLabel;

  @tracked fieldWidth = null;

  @localCopy('args.showSaveButton', true)
  showSaveButton;

  @localCopy('args.showCancelButton', true)
  showCancelButton;

  element = null;

  constructor() {
    super(...arguments);

    this._handleClicks = this._handleClicks.bind(this);
    document.addEventListener('click', this._handleClicks);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    document.removeEventListener('click', this._handleClicks);
  }

  @action
  registerElement(element) {
    this.element = element;
  }

  _handleClicks(ev) {
    if (!this.enabled) return;

    let { isEditing } = this;
    let clickedInside = this.element.contains(ev.target);

    if (clickedInside && !isEditing) {
      if (this.showEditButton) {
        return;
      }

      this._setFieldWidth();
      this.startEditing(ev);
    } else if (!clickedInside && isEditing) {
      if (this.args.onOutsideClick) {
        this.args.onOutsideClick(this.value) && (this.isEditing = false);
      } else {
        if (this.args.saveOnFocusOut) {
          this.save();
        } else {
          this.cancel();
        }
      }
    }
  }

  _setFieldWidth() {
    const { width } = this.element.getBoundingClientRect();
    this.fieldWidth = htmlSafe(`width: ${width + 2}px`);
  }

  @action
  didChangeEnabled() {
    if (this.args.enabled === false && this.isEditing) {
      this.cancel();
    }
  }

  @action
  save() {
    this.args.onSave?.(this.value);
    this.isEditing = false;
  }

  @action
  startEditing(e) {
    e.stopPropagation();
    this.args.onEdit?.();

    this.previousValue = this.value;
    this.isEditing = true;
  }

  @action
  cancel() {
    this.args.onCancel?.();

    this.isEditing = false;

    run(this, () => {
      set(this, 'value', this.previousValue);
    });
  }
}
