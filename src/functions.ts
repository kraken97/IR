import { createInterface } from 'readline';
import { Observable as Obs } from 'rxjs';
import * as fs from 'fs';
import { MAX_FILES } from './app';


// convert fs stream to rx stream
export const fsToRx = (stream, readEvent, closeEvent = 'close') =>
  Obs.fromEvent(stream, readEvent)
    .takeUntil(Obs.fromEvent(stream, closeEvent))

export const writeFile = filename => data => fs.writeFile(filename, JSON.stringify(data, null, '  '))

export const readAllFile = (fileName) => {
  const stream = fs.createReadStream(fileName);
  return fsToRx(stream, 'data').reduce((acc, el) => acc + el.toString(), '')
}

export const createWordsStreamWithWordIndex = (data: string) =>
  Obs.from(data.split(/[^\w]+/))
    .map((el, i) => ({ word: el, wordIndex: i }))
    .skip(1)
    .scan((acc, el) => ({
      word: el.word,
      wordIndex: acc.wordIndex + 1
    }))
    .map(el => ({ ...el, word: parseWord(el.word) }));


export const createRxFs = (fileName, s?): Obs<string> => {
  const stream = createInterface({ input: fs.createReadStream(fileName) })
  return fsToRx(stream, 'line');
}

export const parseWord = (word) =>
  word.replace(/[ .,?!]/g, '').trim();

export const lineToWords = (line) =>
  Obs.from(line.split(/[^\w]+/)).filter(el => !!el)
    .map(parseWord);

export const createWordStream = (line, i) =>
  lineToWords(line.toLowerCase()).map(word => ({ word, index: i }));

export const createFileStream = (file, i) =>
  createRxFs(file).flatMap(createWordStream).map(el => ({ ...el, file: i }));

export const mapReduce = (keySelector: string) => (acc: any, el: any) => {
  acc[el[keySelector]] = el;
  return acc;
}