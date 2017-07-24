import Component from "@ember/component"
import { get, set, computed } from "@ember/object"
import { htmlSafe } from "@ember/string"
import { run } from "@ember/runloop"

import layout from "../templates/components/ember-inline-edit"

export default Component.extend({
  layout,
  classNames: ["ember-inline-edit"],
  classNameBindings: ["isEditing:is-editing", "enabled::disabled"],

  isEditing: false,
  isNotEditing: computed.not("isEditing"),

  enabled: true,
  field: "text",

  value: null,
  previousValue: null,

  placeholder: "Not Provided",
  saveLabel: "Save",
  cancelLabel: "Cancel",
  editLabel: "Edit",

  fieldWidth: null,

  showSaveButton: true,
  showCancelButton: true,

  editorClass: "",
  buttonContainerClass: "",
  editButtonClass: "",
  saveButtonClass: "",
  cancelButtonClass: "",

  didInsertElement() {
    this._handleClicks = this._handleClicks.bind(this)
    document.addEventListener("click", this._handleClicks)
  },

  willDestroyElement() {
    document.removeEventListener("click", this._handleClicks)
  },

  _handleClicks(ev) {
    let enabled = get(this, "enabled")
    if (!enabled) return

    let isEditing = get(this, "isEditing")
    let clickedInside = this.element.contains(ev.target)

    if (clickedInside && !isEditing) {
      if (get(this, "showEditButton")) {
        return
      }

      this._setFieldWidth()
      this.send("startEditing", ev)
    } else if (!clickedInside && isEditing) {
      this.send("cancel")
    }
  },

  _setFieldWidth() {
    const { width } = this.element.getBoundingClientRect()

    run(this, () => {
      set(this, "fieldWidth", htmlSafe(`width: ${width + 2}px`))
    })
  },

  didReceiveAttrs() {
    if (get(this, "enabled") === false) {
      this.send("cancel")
    }
  },

  actions: {
    save() {
      this.sendAction("onSave", this.get("value"))

      run(this, () => {
        set(this, "isEditing", false)
      })
    },

    startEditing(e) {
      e.stopPropagation()

      run(this, () => {
        set(this, "previousValue", this.get("value"))
        set(this, "isEditing", true)
      })
    },

    cancel() {
      this.sendAction("onCancel")

      run(this, () => {
        set(this, "value", this.get("previousValue"))
        set(this, "isEditing", false)
      })
    }
  }
})
