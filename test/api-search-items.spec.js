import expect from "expect";
import APISearchItems from "../src/api-search-items";

describe("APISearchItems", ()=>{
  describe("getItems", ()=> {
    it("without options return some items", ()=> {
      let searchItems = APISearchItems('../data/items.json');

      expect(searchItems.getItems().length).toBeGreaterThan(0);
    });

    it("return items, which fields doesn't contain domain", ()=>{
      let searchItems = APISearchItems('../data/items.json');
      let fields = {};
      let items = searchItems.getItems();

      items.forEach(item=>{
        for(let field in item){
          if(fields[field]){
            fields[field]++;
          } else{
            fields[field] = 1;
          }
        }
      });

      expect(fields['domain']).toBe(undefined);
    });

    it("return items by word 'Иван'", ()=>{
      let searchItems = APISearchItems('../data/items.json');
      let items = searchItems.getItems('Иван');

      expect(items.length).toBe(16);
    });

    it("return items by word 'иван'", ()=>{
      let searchItems = APISearchItems('../data/items.json');
      let items = searchItems.getItems('иван');

      expect(items.length).toBe(16);
    });

    it("return items by word 'bdfy'", ()=>{
      let searchItems = APISearchItems('../data/items.json');
      let items = searchItems.getItems('bdfy');

      expect(items.length).toBe(16);
    });
  });
});
