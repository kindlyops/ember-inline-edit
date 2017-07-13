import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('handling-actions')
  this.route('changing-input-type')
  this.route('advanced-usage')
  this.route('appearance')
});

export default Router;
