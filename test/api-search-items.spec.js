import expect from "expect";
import APISearchItems from "../src/api-search-items";

describe("APIAPISearchItems", ()=> {
  describe("getItems", ()=> {
    it("without options return some items", ()=> {
      expect(APISearchItems.getItems().length).toBeGreaterThan(0);
    });

    it("with length options return the same number of items", ()=> {
      expect(APISearchItems.getItems(null, 10).length).toBe(10);
    });

    it("return items, which fields doesn't contain domain", ()=> {
      let fields = {};
      let items = APISearchItems.getItems();

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
      let items = APISearchItems.getItems('Иван');

      expect(items.length).toBe(17);
    });

    it("return items by word 'иван'", ()=> {
      let items = APISearchItems.getItems('иван');

      expect(items.length).toBe(17);
    });

    it("return items by word 'bdfy'", ()=> {
      let items = APISearchItems.getItems('bdfy');

      expect(items.length).toBe(17);
    });

    it("return items by word 'rogo'", ()=> {
      let items = APISearchItems.getItems('rogo');

      expect(items.length).toBe(1);
    });
  });
});
