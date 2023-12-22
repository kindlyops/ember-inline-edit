import { inArr } from 'dummy/helpers/in-arr';
import { module, test } from 'qunit';

module('Unit | Helper | in arr', function () {
  test('it works', function (assert) {
    const arr = [[1, 2, 15], 15];
    const result = inArr(arr);
    assert.ok(result);
  });
});
