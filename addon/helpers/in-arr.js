import Ember from 'ember';

export function inArr(params/*, hash*/) {
  const haystack = params[0]
  const needle = params[1]

  if (Ember.isEmpty(haystack) || Ember.isEmpty(needle)) {
    Ember.warn('in-arr params cannot be empty')
    return
  }
  
  return haystack.indexOf(needle) > -1;
}

export default Ember.Helper.helper(inArr);
