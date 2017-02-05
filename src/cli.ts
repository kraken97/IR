import { createInterface } from 'readline';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { RES_DIR } from './app';
import { fsToRx, readAllFile } from './functions';
import { createOperators } from './set-operations';

const con = createInterface({ input: process.stdin, output: process.stdout });

export const console$ = fsToRx(con, 'line')


export const createWordStreamFromIndex = (fileName) => 
        readAllFile(fileName)
    

// createWordStreamFromIndex(RES_DIR).map((el:any) => JSON.parse(el))
//     .combineLatest(console$, (words, line: string) => ({ words, line }))
    // .subscribe(el => {
    //     const { and, or, not } = createOperators(el.words);
    //     const res = eval(el.line);
    //     console.log(res);
    // })
