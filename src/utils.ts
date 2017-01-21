import * as fs from 'fs';
import {createInterface, ReadLine} from 'readline';
import { Observable } from 'rxjs';

export const readFile = (filename : string) : ReadLine => createInterface({
    input: fs.createReadStream(filename)
})

export const createRxFs = (stream : ReadLine) : Observable < string > => Observable
    .fromEvent(stream, 'line')
    .takeUntil(Observable.fromEvent(stream, 'close'))

export const createFileStream = (file : string, id : number) =>
 Observable.combineLatest(createRxFs(readFile(file)), Observable.of(file), (line, file) => ({line, file: id}));

export const createWordStream = (line : {
    line: string,
    file: number
}, index : number) => Observable
    .from(line.line.trim().split(/ +/))
    .map(world => world.replace(/[.,]/g, ' '))
    .filter(world => world && world.trim() !== "")
    .map(w => w.trim())
    .map(word => ({
        word,
        file: {
            fileId: line.file,
            line: index
        }
    }))

