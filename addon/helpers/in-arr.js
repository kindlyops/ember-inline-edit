import Ember from 'ember';

const { isEmpty, Logger } = Ember
const { warn } = Logger

export function inArr(params, hash) {
  const haystack = params[0]
  const needle = params[1]

  if (isEmpty(haystack) || isEmpty(needle)) {
    warn('in-arr params cannot be empty')
    return
  }
  
  return haystack.indexOf(needle) > -1;
}

export default Ember.Helper.helper(inArr);
