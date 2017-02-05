import * as Rx from 'rxjs';
import equal from 'deep-equal';
import * as chai from 'chai';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
const de = require('deep-equal')
import { TestScheduler, Observable } from 'rxjs';

const { assert, should, expect} = chai;
const assertDeepEqualFrame = (actual, expected) => {
    expect(actual).to.deep.equals(expected);
    console.log('werw')
    return false;    
}

//A few basic examples to get started
describe('The filter operator', () => {
    it('should merge two observables', () => {
        const testScheduler = new TestScheduler((e,v)=> !!expect(e).eqls(v) );
        const values = {a: 1, b: 2, c: 3, d: 4};
        const a:Observable<any> = testScheduler.createHotObservable('a-----b-----c----|', [1,2,3,5])
        const b:Observable<any> = testScheduler.createHotObservable('a-----b-----c----', [1,2,3,])
        testScheduler.assertDeepEqual
        const asub = ( '-----------')
        testScheduler.expectObservable(a).toBe('a-----b-----c----|',[1,2,3,5]);
    
        testScheduler.flush()
    });
});