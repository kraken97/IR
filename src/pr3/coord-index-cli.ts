import { createWordStreamFromIndex, console$ } from '../cli';
import { createOperators } from '../set-operations';
import * as _ from 'lodash';

createWordStreamFromIndex('../../coord-index.json')
    .map((el: any) => JSON.parse(el))
    .combineLatest(console$, (words, line: string) => ({ words, line }))
    .subscribe(el => {
        const words = el.line.split(/ +/);
        const files = words.map(wordKey =>
            Object.keys(_.omit(el.words[wordKey], 'word'))).reduce((acc, el) => _.intersection(acc, el));

        const res = files.map(file => {
            return words.reduce((acc, word) => {
                acc[file] = _.union(el.words[word][file], acc[file]);
                return acc;
            }, {})
        })
        console.log(res);
    })
