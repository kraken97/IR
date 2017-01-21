export class Word {
    constructor(public world:any,public  documents:any,  public index:any) {
    }
    push(info:any) {
        this.documents.push(info);
    }
}
