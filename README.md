## run 
npm install

npm run build 

node ./js/app.json

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
    "word":[1,4,5,7,],
}
```

repo url https://github.com/kraken97/IR

you can download  latest zip on releases page.


##
for storing inverted index i use the save format  - JSON
with 5 mb start files we have only 500kb iverted index and  1.1 mb matrix 
