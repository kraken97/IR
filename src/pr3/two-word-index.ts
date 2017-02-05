import { wordsStream$, files$, res$ } from '../app';
import { Observable, Subject } from 'rxjs';
import { createWordStream, createFileStream, writeFile } from '../functions';
import * as WordPos from 'wordpos';
import { and } from '../set-operations';
import  * as _ from 'lodash';

const  wordpos = new WordPos();

res$.bufferCount(2, 1)
    .filter(el=> !!el && !!el[0] && !!el[1])
    .map((el:any)=> ({ key:el[0][0]+' '+el[1][0], files: _.intersection(el[1][1],el[0][1]) }))
    .reduce((acc,el:any) => {
        acc[el.key] = el.files;
        return acc;
    },{})
    .subscribe(writeFile('../../two-word-index.json'))

