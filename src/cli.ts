import { createInterface } from 'readline';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import * as set from './set-operations';
import { RES_DIR } from './app';



const createOperators = words => {
    return {
        and: (wordA, wordB) => set.and(new Set(words[wordA]), new Set(words[wordB])),
        or: (wordA, wordB) => set.or(new Set(words[wordA]), new Set(words[wordB])),
        not: word => set.not(new Set(words[word]))
    }
}

const readFile = fs.createReadStream(RES_DIR);
const con = createInterface({ input: process.stdin, output: process.stdout });

const consoleStream = Observable
    .fromEvent(con, 'line')
    .takeUntil(Observable.fromEvent(con, 'close'));

const wordsFileStream = Observable
    .fromEvent(readFile, 'data')
    .takeUntil(Observable.fromEvent(readFile, 'close'));

const wordsStream = wordsFileStream
    .map(el => el.toString())
    .reduce((acc, el) => acc + el)
    .map(el => JSON.parse(el));

wordsStream
    .combineLatest(consoleStream, (words, line: string) => ({ words, line }))
    .subscribe(el => {
        const { and, or, not } = createOperators(el.words);
        const res = eval(el.line);
        console.log(res);
    })
