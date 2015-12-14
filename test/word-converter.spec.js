import expect from "expect";
import wordConverter from "../src/word-converter";

describe("wordConverter", ()=> {
  describe("convertLayout", ()=> {
    it("convert 'рого'", ()=> {
      expect(wordConverter.convertLayout("рого")).toEqual("hjuj");
    });
    it("convert 'rogo'", ()=> {
      expect(wordConverter.convertLayout("rogo")).toEqual("кщпщ");
    });
    it("convert 'hjuj'", ()=> {
      expect(wordConverter.convertLayout("hjuj")).toEqual("рого");
    });
    it("convert 'кщпщ''", ()=> {
      expect(wordConverter.convertLayout("кщпщ")).toEqual("rogo");
    });
  });

  describe("translit", ()=> {
    it("translit 'рого'", ()=> {
      expect(wordConverter.translit("рого")).toEqual("rogo");
    });
    it("translit 'rogo'", ()=> {
      expect(wordConverter.translit("rogo")).toEqual("рого");
    });
  });

  describe("getConditionalWords", ()=>{
    it("convert 'рого'", ()=>{
      expect(wordConverter.getConditionalWords("рого")).toEqual([
        "рого",
        "hjuj",
        "хйуй",
        "rogo",
        "кщпщ"
      ]);
    });
    it("convert 'hjuj'", ()=>{
      expect(wordConverter.getConditionalWords("hjuj")).toEqual([
        "hjuj",
        "рого",
        "rogo",
        "хйуй",
        "[qeq"
      ]);
    });
    it("convert 'rogo'", ()=>{
      expect(wordConverter.getConditionalWords("rogo")).toEqual([
        "rogo",
        "кщпщ",
        "kshhpshh",
        "рого",
        "hjuj"
      ]);
    });
    it("convert 'кщпщ'", ()=>{
      expect(wordConverter.getConditionalWords("кщпщ")).toEqual([
        "кщпщ",
        "rogo",
        "рого",
        "kshhpshh",
        "лыррзырр"
      ]);
    });
  })
});
