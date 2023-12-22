import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('handling-actions');
  this.route('changing-input-type');
  this.route('advanced-usage');
  this.route('appearance');
});
