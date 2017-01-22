import { createInterface, ReadLine } from 'readline'
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { createFileStream } from './functions';

const FILES_DIR = '../files/';
const result = '../result.json';

const files = Observable
  .range(0, 10)
  .map(el => FILES_DIR + 'book' + el + '.txt');

const res = files
  .flatMap(createFileStream)
  .groupBy(el => el.word, el => el)
  .share()

const array = res.flatMap(el => el)
  .toArray();

console.time('t');
array.zip(res.count(), (collection, uniqueCount) => ({ collection, uniqueCount }))
  .subscribe((el) => {
    console.log('collections size', el.collection.length);
    console.log('unique count', el.uniqueCount)
    console.timeEnd('t');
    fs.writeFile(result, JSON.stringify(el.collection));
  })
