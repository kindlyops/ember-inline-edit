import Component from "@ember/component"
import { computed } from "@ember/object"

import layout from "../templates/components/ember-inline-editable"

export default Component.extend({
  layout,

  classNames: ["ember-inline-editable"],
  classNameBindings: [
    "isVisible:is-visible:is-hidden",
    "showEditButton:is-not-clickable"
  ],
  valueIsEmpty: computed.empty("value")
})
