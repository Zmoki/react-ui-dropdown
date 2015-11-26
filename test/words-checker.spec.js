import expect from "expect";
import wordsChecker from "../src/words-checker";

describe("wordsChecker", ()=> {
  describe("convertLayout", ()=> {
    it("convert 'рого'", ()=> {
      expect(wordsChecker.convertLayout("рого")).toEqual("hjuj");
    });
    it("convert 'rogo'", ()=> {
      expect(wordsChecker.convertLayout("rogo")).toEqual("кщпщ");
    });
    it("convert 'hjuj'", ()=> {
      expect(wordsChecker.convertLayout("hjuj")).toEqual("рого");
    });
    it("convert 'кщпщ''", ()=> {
      expect(wordsChecker.convertLayout("кщпщ")).toEqual("rogo");
    });
  });

  describe("translit", ()=> {
    it("convert 'рого'", ()=> {
      expect(wordsChecker.translit("рого")).toEqual("rogo");
    });
    it("convert 'rogo'", ()=> {
      expect(wordsChecker.translit("rogo")).toEqual("рого");
    });
  });

  describe("getConditionalWords", ()=>{
    it("convert 'рого'", ()=>{
      expect(wordsChecker.getConditionalWords("рого")).toEqual([
        "рого",
        "hjuj",
        "хйуй",
        "rogo",
        "кщпщ"
      ]);
    });
    it("convert 'hjuj'", ()=>{
      expect(wordsChecker.getConditionalWords("hjuj")).toEqual([
        "hjuj",
        "рого",
        "rogo",
        "хйуй",
        "[qeq"
      ]);
    });
    it("convert 'rogo'", ()=>{
      expect(wordsChecker.getConditionalWords("rogo")).toEqual([
        "rogo",
        "кщпщ",
        "kshhpshh",
        "рого",
        "hjuj"
      ]);
    });
    it("convert 'кщпщ'", ()=>{
      expect(wordsChecker.getConditionalWords("кщпщ")).toEqual([
        "кщпщ",
        "rogo",
        "рого",
        "kshhpshh",
        "лыррзырр"
      ]);
    });
  })
});
