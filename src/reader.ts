import { createInterface, ReadLine } from 'readline'
import { Observable, ReplaySubject } from 'rxjs';
import * as fs from 'fs';
import { createFileStream, createWordStream, readFile } from './utils';
import { Word } from './word';
import * as du from 'du';


const FILES_DIR = '../files/';
const filesNames =  [...Array(10).keys()].map(el=> FILES_DIR+el+'.txt');
const saveFile = readFile('../result.json');
const wordsByFile:any = {};

Observable.from(filesNames)
.flatMap((file:any,i)=> createFileStream(file,i).flatMap(createWordStream))
// .do((el)=>{
//  const lines = wordsByFile[el.file.fileId]&&
//                wordsByFile[el.file.fileId][el.word]&&
//                wordsByFile[el.file.fileId][el.word].lines
//     wordsByFile[el.file.fileId] = Object.assign({}, wordsByFile[el.file.fileId], { [el.word]: { word: el.word, lines: lines?[...lines,el.file.line]:[el.file.line] } });
// })
.reduce((acc:any, value: {word:string, file:any}, index)=>{
  const w = acc[value.word];
  if(w) {
    // w.push(value.file);
    acc[value.word].push({fileId:value.file.fileId, line:value.file.line})
    
  } else {
    // acc[value.word] = new Word(value.word, [value.file], index);
    acc[value.word] = [{ fileId:value.file.fileId, line:value.file.line }];
  }
  return acc;
},{})
.subscribe(el=>{
  const result = '../result.json';
  fs.writeFile(result,JSON.stringify(el));
  fs.appendFile(result,'\n\r');
  setTimeout(()=>{
    du(
    '../files'
  , function (err:any, size:any) {
      console.log('The size of the tests file ', size/1000000.0, 'MB')
    }
)
    fs.stat('../result.json',(err,res)=>{
      console.log('the size of result.json file',(res.size/1000000.0)+"MB");
    })
  },1000);
})

