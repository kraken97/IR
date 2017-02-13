import { res$ } from '../app';
import * as _ from 'lodash';
import { writeFile } from '../functions';
const ng = require('n-gram');

// this code looks a bit strange but im to lazy to refactor it.
// i think it would be good if i change _each and reduce  to  function composition 
// but im to lazy to implement this 
res$.take(1000).map(el => _.set(el, '[0]', ng.trigram(el[0] + '$')))
    .map(el => _.reduce(el[0], (acc, v) => {
        acc.push({
            key: v,
            value: el[1]
        })
        return acc;
    }, []))
    .reduce((acc, el:any) => {
        _.each(el, v=> _.set(acc, v.key, _.union((<any>_.get(acc, `${v.key}.value`,[]) ,v.value))));
        return acc;
    },{})
    .subscribe(writeFile('../../ngram-index.json'))

    