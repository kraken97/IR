import { res$ } from '../app';
import * as fs from 'fs';

export const index$ = res$
  .reduce((acc: any, [word, val]) => {
    acc[word] = val;
    return acc;
  }, {});

index$.subscribe(el => {
  fs.writeFile('../../index.json', JSON.stringify(el));
})

