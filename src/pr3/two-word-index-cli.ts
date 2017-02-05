import { createWordStreamFromIndex, console$ } from '../cli';
import { createOperators } from '../set-operations';


createWordStreamFromIndex('../../two-word-index.json')
    .map((el:any) => JSON.parse(el))
    .combineLatest(console$, (words, line: string) => ({ words, line }))
    .subscribe(el => {
        const { and, or, not } = createOperators(el.words);
        const res = eval(el.line);
        console.log(res,'result');
    })
