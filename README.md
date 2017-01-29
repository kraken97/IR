## run 
npm install
npm run build 

// to index files
node ./js/app.js
// to run cli
node ./js/cli.js

## cli
cli uses input format like  this

```js
add("word",or("word1",not("word2")))
```

## files.json

format for saving files info :
```json
{
    ...,
    ["word"]:[...filesIds],
    ...
}
```

repo url https://github.com/kraken97/IR

your can download  latest zip on releases page.