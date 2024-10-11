function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const mid = Math.floor(arr.length / 2);
    const first = mergeSort(arr.slice(0, mid));
    const second = mergeSort(arr.slice(mid));
  
    return merge(first, second);
  }
  
  function merge(first, second) {
    let i = 0;
    let j = 0;
    const arr = [];
  
    while (i < first.length && j < second.length) {
      if (first[i] < second[j]) {
        arr.push(first[i]);
        i++;
      } else {
        arr.push(second[j]);
        j++;
      }
    }
    return arr.concat(first.slice(i).concat(second.slice(j)));
  }
  
export { mergeSort }
  