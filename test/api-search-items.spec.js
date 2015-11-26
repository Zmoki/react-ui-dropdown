import expect from "expect";
import APISearchItems from "../src/api-search-items";

describe("APISearchItems", ()=> {
  let searchItems = APISearchItems('../data/items.json');

  describe("getItems", ()=> {
    it("without options return some items", ()=> {
      expect(searchItems.getItems().length).toBeGreaterThan(0);
    });

    it("return items, which fields doesn't contain domain", ()=> {
      let fields = {};
      let items = searchItems.getItems();

      items.forEach(item=> {
        for (let field in item) {
          if (fields[field]) {
            fields[field]++;
          } else {
            fields[field] = 1;
          }
        }
      });

      expect(fields['domain']).toBe(undefined);
    });

    it("return items by word 'Иван'", ()=> {
      let items = searchItems.getItems('Иван');

      expect(items.length).toBe(17);
    });

    it("return items by word 'иван'", ()=> {
      let items = searchItems.getItems('иван');

      expect(items.length).toBe(17);
    });

    it("return items by word 'bdfy'", ()=> {
      let items = searchItems.getItems('bdfy');

      expect(items.length).toBe(17);
    });

    it("return items by word 'rogo'", ()=> {
      let items = searchItems.getItems('rogo');

      expect(items.length).toBe(1);
    });
  });
});
