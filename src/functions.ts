import { createInterface } from 'readline';
import { Observable } from 'rxjs';


export const createRxFs = (fileName): Observable<string> => {
  const stream = createInterface({ input: fs.createReadStream(fileName) })
  return Observable
    .fromEvent(stream, 'line')
    .takeUntil(Observable.fromEvent(stream, 'close'))
}

export const parseWord = (word) =>
  word.replace(/[ .,?!]/g, '')
    .trim()
    .toLowerCase();

export const lineToWords = (line) =>
  Observable
    .from(line.split(/[^\w]+/)).filter(el => !!el)
    .map(parseWord);

export const createWordStream = (line, i) =>
  lineToWords(line).map(word => ({ word, index: i }));

export const createFileStream = (file, i) =>
  createRxFs(file).flatMap(createWordStream).map(el => ({ ...el, file }));


