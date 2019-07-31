function path(obj: any, paths: Array<string | number>): any {
  let val = obj;
  let idx = 0;

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
