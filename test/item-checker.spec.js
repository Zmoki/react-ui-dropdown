import expect from "expect";
import itemChecker from "../src/item-checker";
let items = require("./../examples/data.json").items;

describe("itemChecker", ()=> {
  describe("check", ()=> {
    it("item #2 contained word 'Екат' in one off all fields", ()=> {
      const item = items[2];

      expect(itemChecker.check("Екат", item)).toBe(true);
    });

    it("item #2 contained word 'Екат' in field 'first_name'", ()=> {
      const item = items[2];

      expect(itemChecker.check("Екат", item, "first_name")).toBe(true);
    });

    it("items contained items with word 'Иван'", ()=> {
      const expectedCount = 17;

      let count = 0;

      items.forEach(item => {
        if (itemChecker.check("Иван", item)) {
          count++;
        }
      });

      expect(count).toBe(expectedCount);
    });
  });
});
