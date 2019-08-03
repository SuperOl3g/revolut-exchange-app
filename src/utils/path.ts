import { TAnyObject } from '../types';

function path(obj: TAnyObject | undefined, paths: Array<string | number>): any {
  let val = obj;
  let idx = 0;

  if (!obj) {
    return;
  }

  while (idx < paths.length) {
    if (val == null) {
      return;
    }

    val = val[paths[idx]];
    idx += 1;
  }

  return val;
}

export default path;
