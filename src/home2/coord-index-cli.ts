import { createWordStreamFromIndex, console$ } from '../cli';
import { createOperators } from '../set-operations';
import * as _ from 'lodash';

createWordStreamFromIndex('../../coord-index.json')
    .map((el: any) => JSON.parse(el))
    .combineLatest(console$, (words, line: string) => ({ words, line }))
    .subscribe(el => {
        const words = el.line.split(/ +/);
        const res = {}
        words.forEach(wordKey => {
            Object.keys(el.words[wordKey]).forEach(fileKey => {

                res[fileKey] = _.intersection(res[fileKey], el.words[wordKey][fileKey]);
            })
        });
        console.log(res, 'result');
    })
