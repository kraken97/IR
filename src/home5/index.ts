import * as fs from 'fs';
import * as _ from 'lodash/fp';
import { parseWord } from '../functions';
import { FILES_DIR, FILES_LIST } from '../app';

const mr = require('mapred')();

const parseFileToWords = _.flow([
    _.filter(el => !!el),
])
export const readFile = _.flow([fs.readFileSync, _.toString])

const files = FILES_LIST.map(el=>[el]);

console.time('t');
function map(key, value) {
    console.log(key)
    return parseFileToWords(readFile(key)).map(el => [el, key]);

}
function reduce(key, val) { return val };


mr(files, map, reduce,
    (result) => {
        // fs.appendFileSync('../../result.json', JSON.stringify(result));
        console.timeEnd('t');
    });
