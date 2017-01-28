
export const and = (wordA ,wordB) => new Set([...wordA].filter(x => wordB.has(x)))
export const or = (wordA,  wordB) => new Set([...wordA, ...wordB])
export const not =  wordB => new Set([0,1,2,3,4,5,6,7,8,9].filter(x => !wordB.has(x)));