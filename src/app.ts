import { createInterface, ReadLine } from 'readline'
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { createFileStream, toBoolArray } from './functions';


export const RES_DIR = '../files.json';
export const RES_DIR_BOOL = '../bool.json';
export const MAX_FILES = 10;

const FILES_DIR = '../files/';
const result = '../result.json';

const files = Observable
  .range(0, MAX_FILES)
  .map(el => FILES_DIR + 'book' + el + '.txt');

const res = files
  .flatMap(createFileStream)
  .groupBy(el => el.word, el => el.file)
  .map(el=> ({key:el.key,  val : el.distinct()}))
  .flatMap((el:any) => el.val.toArray().map(e=> ([el.key , e])))
  .share()


const bool = res
  .reduce((acc:any, [word, val])=>{
    acc[word] = toBoolArray(val);
    return acc;
  },{})



const index = res
  .reduce((acc:any, [word, val])=>{
    acc[word] = val;
    return acc;
  },{})

console.time("t")
index.subscribe(el => {
  console.timeEnd("t");
  fs.writeFile( RES_DIR, JSON.stringify(el));
})

bool.subscribe(el=>{
    fs.writeFile( RES_DIR_BOOL, JSON.stringify(el));
})