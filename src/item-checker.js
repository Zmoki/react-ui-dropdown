import wordConverter from "./word-converter";

let currentWord;
let currentWords;

const itemChecker = {
  check(word, item, fields = null){
    if(!word || typeof word != "string"){
      throw new Error("'word' parameter must be a string");
    }
    if(!item || typeof item != "object"){
      throw new Error("'item' parameter must be an object");
    }

    if (word != currentWord) {
      currentWord = word;
      currentWords = wordConverter.getConditionalWords(word);
    }

    fields = (typeof fields == "string") ? [fields] : (fields || Object.keys(item));

    for (let f = 0; f < fields.length; f++) {
      if(typeof item[fields[f]] == "string") {
        const value = item[field].toLowerCase();

        for (let w = 0; w < currentWords.length; w++) {
          if (~value.search(currentWords[w])) return true;
        }
      }
    }

    return false;
  }
};

export default itemChecker;
