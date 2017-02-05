import { res$, MAX_FILES } from '../app';
import * as fs from 'fs';


export const toBoolArray = (array: number[]) => {
  const res = Array(MAX_FILES).fill(0);
  array.forEach((_, i) => {
    res[i] = 1;
  });
  return res;
}

export const bool$ = res$
  .reduce((acc: any, [word, val]) => {
    acc[word] = toBoolArray(val);
    return acc;
  }, {})

bool$.subscribe(el => {
  fs.writeFile('../../bool.json', JSON.stringify(el));
})