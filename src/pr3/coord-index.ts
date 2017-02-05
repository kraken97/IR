import { createWordsStreamWithWordIndex, readAllFile, writeFile, mapReduce, parseWord } from '../functions';
import { files$ } from '../app';
import { Observable } from 'rxjs';

const createCoordIndexForFile = (file, i) =>
    readAllFile(file)
        .flatMap(createWordsStreamWithWordIndex)
        .map(el => ({ ...el, file: i }))

const mapFileStream = (word, stream: Observable<any>) =>
    stream.groupBy(el => el.file, el => el.wordIndex)
        .flatMap(el => mapIndexesStream(el.key, el))
        .reduce((acc, el: any) => ({ ...acc, ...el }))
        .map(el => ({ ...el, word }))

const mapIndexesStream = (file, stream: Observable<any>) =>
    stream.distinct().toArray()
        .map(el => ({ [file]: el }));

files$.flatMap(createCoordIndexForFile)
    .groupBy(el => parseWord(el.word), el => el)
    .flatMap(word$ => mapFileStream(word$.key, word$))
    .reduce(mapReduce('word'), {})
    .subscribe(writeFile('../../coord-index.json'))
