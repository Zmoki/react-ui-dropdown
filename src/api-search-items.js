import wordsChecker from './words-checker';

import { items } from './data/items';

const APISearchItems = {
  getItems(word){
    let resultItems;

    if (word) {
      let words = wordsChecker.getConditionalWords(word);

      resultItems = items.filter(item=> {
        let hasWord = false;

        for (let field in item) {
          if (typeof item[field] == 'string') {
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

    return resultItems.map(item=> {
      return {
        uid: item.uid,
        firstName: item["first_name"],
        lastName: item["last_name"],
        photo: item["photo_50"]
      }
    });
  }
};

export default APISearchItems;
