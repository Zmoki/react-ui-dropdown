function APISearchItems(JSONSource){
  let items = require(JSONSource).items;

  function stringContainWord(str, word){
    str = str.toLowerCase();
    word = word.toLowerCase();

    return str.search(word) != -1;
  }

  function getItems(word) {
    let resultItems;

    if(word){
      resultItems = items.filter(item=>{
        let hasWord = false;

        for(let field in item){
          if((typeof item[field] == 'string') && stringContainWord(item[field], word)){
            hasWord = true;
            break;
          }
        }

        return hasWord;
      });
    } else{
      resultItems = items;
    }

    return resultItems.map(item=>{
      return {
        uid: item.uid,
        firstName: item["first_name"],
        lastName: item["last_name"],
        photo: item["photo_50"]
      }
    });
  }

  return {
    getItems
  };
}

export default APISearchItems;
