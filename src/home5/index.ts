import * as fs from 'fs';
import * as _ from 'lodash/fp';
import { parseWord } from '../functions';
import { FILES_DIR } from '../app';
const mr = require('mapred')();

const parseFileToWords = _.flow([
    _.split(/[^\w]+/),
    _.map(parseWord),
    _.filter(el => !!el),
])
const readFile = _.flow([fs.readFileSync, _.toString])

var files = [
    _.range(i => _.range(i * 100, i * 100 + 100).map(el => FILES_DIR + 'book' + el + '.txt'))
];

const map = (key, value) => parseFileToWords(readFile(key)).map(el => [el, key]);

mr(files, map,
    (_, values) => _.uniq(values),
    (result) => {
        fs.writeFile('../../result.json', JSON.stringify(result));
    });
