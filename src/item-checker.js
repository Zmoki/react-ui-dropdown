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

    for (let field of fields) {
      if(typeof item[field] == "string") {
        const value = item[field].toLowerCase();

        for (let w of currentWords) {
          if (~value.search(w)) return true;
        }
      }
    }

    return false;
  }
};

export default itemChecker;
