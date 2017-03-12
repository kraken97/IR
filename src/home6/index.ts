import * as fs from 'fs';
import * as _ from 'lodash/fp';
import { parseWord, createFileStream, readAllFile, lineToWords, createWordStream } from '../functions';
import { FILES_DIR, FILES_LIST, wordsStream$, files$ } from '../app';
import { readFile } from '../home5/index';
import * as R from 'ramda';

const mr = require('mapred')();
const write = R.curry(fs.writeFileSync);
const compressedFile = '../../zip.json';

// save collection as word>word>word
files$.flatMap(createFileStream).reduce((acc, el) => acc + '>' + el.word + '<' + el.file, '')
    .map(el => JSON.stringify(el))
    .subscribe(write(compressedFile));

readAllFile(compressedFile).flatMap(R.split('>')).map(R.split('<'))
    .groupBy(([word, index]) => word, ([word, index]) => index)
    .flatMap((el: any) => el.distinct().toArray().map(e => [el.key, e]))
    .reduce((acc: any, [word, val]) => {
        acc[word] = val;
        return acc;
    })
    .subscribe(write('../../result.json'));
