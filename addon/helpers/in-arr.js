import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import { warn } from '@ember/debug';

export function inArr(params/*, hash*/) {
  const haystack = params[0]
  const needle = params[1]

  if (isEmpty(haystack) || isEmpty(needle)) {
    warn('in-arr params cannot be empty', 'ember-debug.empty-in-arr-params')
    return
  }
  
  return haystack.indexOf(needle) > -1;
}

export default helper(inArr);