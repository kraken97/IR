import { createInterface, ReadLine } from 'readline'
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { createFileStream } from './functions';

const FILES_DIR = '../files/';
const result = '../result.json';
const MAX_FILES = 10;

const files = Observable
  .range(0, MAX_FILES)
  .map(el => FILES_DIR + 'book' + el + '.txt');

const res = files
  .flatMap(createFileStream)
  .groupBy(el => el.word, el => el.file)
  .map(el=> ({key:el.key,  val : el.distinct()}))

const qq = res
  .flatMap((el:any) => el.val.toArray().map(e=> ([el.key , e])))
  .reduce((acc:any,el)=>{
    acc[el[0]] = el[1];
    return acc;
  },{})

console.time("t")
qq.subscribe(el => {
  console.timeEnd("t");
  fs.writeFile('../files.json', JSON.stringify(el));
})