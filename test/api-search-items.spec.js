import expect from "expect";
import APISearchItems from "../src/api-search-items";

describe("APIAPISearchItems", ()=> {
  describe("getItems", ()=> {
    it("without options return some items", ()=> {
      expect(Object.keys(APISearchItems.getItems()).length).toBeGreaterThan(0);
    });

    it("with length options return the same number of items", ()=> {
      expect(Object.keys(APISearchItems.getItems(null, 10)).length).toBe(10);
    });

    it("return items by word 'Иван'", ()=> {
      let items = APISearchItems.getItems('Иван');

      expect(Object.keys(items).length).toBe(17);
    });

    it("return items by word 'иван'", ()=> {
      let items = APISearchItems.getItems('иван');

      expect(Object.keys(items).length).toBe(17);
    });

    it("return items by word 'bdfy'", ()=> {
      let items = APISearchItems.getItems('bdfy');

      expect(Object.keys(items).length).toBe(17);
    });

    it("return items by word 'rogo'", ()=> {
      let items = APISearchItems.getItems('rogo');

      expect(Object.keys(items).length).toBe(1);
    });
  });
});
