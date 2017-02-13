import { res$ } from '../app';
import * as _ from 'lodash';
import { writeFile } from '../functions';
const ng = require('n-gram');


// ng module suppermutations if use as curry function
res$.map((el: any) => _.set(el, '[0]', ng(el.length)(el[0] + '$')))
    .map(el => _.reduce(el[0], (acc, v) => {
        acc.push({
            key: v,
            value: el[1]
        })
        return acc;
    }, []))
    .reduce((acc, el: any) => {
        _.each(el, v => _.set(acc, v.key, _.union((<any>_.get(acc, `${v.key}.value`, []), v.value))));
        return acc;
    }, {})
    .subscribe(writeFile('../../suffle-index.json'))
