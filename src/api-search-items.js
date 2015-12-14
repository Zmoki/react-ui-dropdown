import wordsChecker from "./words-checker";

import { items } from "./data/items";

const APISearchItems = {
  getItems(word, length){
    let resultItems;

    if (word) {
      let words = wordsChecker.getConditionalWords(word);

      resultItems = items.filter(item=> {
        let hasWord = false;

        for (let field in item) {
          if (typeof item[field] == "string") {
            let iv = item[field].toLowerCase();
            for(let i = 0; i < words.length; i++){
              if(iv.search(words[i]) != -1){
                hasWord = true;
                break;
              }
            }
          }
        }

        return hasWord;
      });
    } else {
      resultItems = items;
    }

    if(length){
      resultItems = resultItems.slice(0, length);
    }

    return resultItems.reduce((obj, item) => {
      obj[item.uid] = {
        id: item.uid,
        title: [item["first_name"], item["last_name"]].join(" "),
        image: item["photo_50"]
      };

      return obj;
    }, {});
  }
};

export default APISearchItems;
