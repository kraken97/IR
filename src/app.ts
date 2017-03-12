import { createInterface, ReadLine } from 'readline'
import { Observable } from 'rxjs';
import * as fs from 'fs';

import { createFileStream } from './functions';
import * as glob from 'glob';

export const FILES_LIST = glob.sync("../../files/**/*.txt");
export const RES_DIR = '../files.json';
export const MAX_FILES = 4;
export const FILES_DIR = '../../files/';


export const files$ = Observable
  .range(0, MAX_FILES)
  .map(el => FILES_DIR + 'book' + el + '.txt').share();

export const wordsStream$ = files$.flatMap(createFileStream).share();

export const res$ = wordsStream$
  .groupBy(el => el.word, el => el.file)
  .flatMap((el: any) => el.distinct().toArray().map(e => [el.key, e]))
  .share()


