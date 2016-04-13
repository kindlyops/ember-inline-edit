import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// const down  = $.Event('keyup', { keyCode: 40, which: 40})
// const up    = $.Event('keyup', { keyCode: 38, which: 38})
// const enter = $.Event('keyup', { keyCode: 13, which: 13})
// const esc   = $.Event('keyup', { keyCode: 27, which: 27})

moduleForComponent('ember-inline-edit', 'Integration | Component | ember inline edit', {
  integration: true,

  beforeEach: function () {
    this.on('onSave', (val) => {
      this.set('value', val)
    })

    this.on('onClose', () => {
      this.set('value', 'closed')
    })

    this.set('value', null)
  }
})

test('it renders', function (assert) {
  this.render(hbs`{{ember-inline-edit 
                        value=value 
                        onSave="onSave"
                        onClose="onClose"}}`);
                          
  assert.equal(this.$('.ember-inline-edit').length, 1)
})

test('the label is default', function (assert) {
  this.render(hbs`{{ember-inline-edit 
                        value=value 
                        onSave="onSave"
                        onClose="onClose"}}`);
                          
  assert.equal(this.$('.ember-inline-edit').text().trim(), 'Not Provided')
})

test('on click, it shows the input and button', function (assert) {
  this.render(hbs`{{ember-inline-edit 
                        value=value 
                        onSave="onSave"
                        onClose="onClose"}}`);
                          
  assert.equal(this.$('.ember-inline-edit-input').length, 0)
  assert.equal(this.$('.ember-inline-edit-save').length, 0)

  this.$('.ember-inline-edit').click();

  assert.equal(this.$('.ember-inline-edit-input').length, 1)
  assert.equal(this.$('.ember-inline-edit-save').length, 1)
})

test('it renders a non-default button label', function (assert) {
  this.render(hbs`{{ember-inline-edit 
                        value=value 
                        saveLabel="✓"
                        onSave="onSave"
                        onClose="onClose"}}`);
             
  this.$('.ember-inline-edit').click();
               
  assert.equal(this.$('.ember-inline-edit-save').text().trim(), "✓")
})

test('on save, it sends the save action', function (assert) {
  this.render(hbs`{{ember-inline-edit 
                        value=value 
                        onSave="onSave"
                        onClose="onClose"}}`);
                          
  this.$('.ember-inline-edit').click()
  
  this.$('.ember-inline-edit-input').val('Something')
  this.$('.ember-inline-edit-input').trigger('input')
  
  this.$('.ember-inline-edit-save').click()

  assert.equal(this.get('value'), 'Something')
})

test('on pressing enter, it sends the save action', function (assert) {
  this.render(hbs`{{ember-inline-edit 
                        value=value 
                        onSave="onSave"
                        onClose="onClose"}}`);
                          
  this.$('.ember-inline-edit').click()

  this.$('.ember-inline-edit-input').val('Something')
  this.$('.ember-inline-edit-input').trigger('input')
  this.$('.ember-inline-edit-input').trigger('enter')

  assert.equal(this.get('value'), 'Something')
})

test('on pressing esc, it sends the close action', function (assert) {
  this.render(hbs`{{ember-inline-edit 
                        value=value 
                        onSave="onSave"
                        onClose="onClose"}}`);
                          
  assert.equal(this.$('.ember-inline-edit-input').length, 0)

  this.$('.ember-inline-edit').click()
  assert.equal(this.$('.ember-inline-edit-input').length, 1)

  this.$('.ember-inline-edit-input').trigger('esc')
  assert.equal(this.get('value'), null)
})
