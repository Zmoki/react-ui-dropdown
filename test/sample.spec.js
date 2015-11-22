import expect from "expect";
import sample from "../src/sample";

describe("Sample", ()=>{
  it("return true", ()=>{
    expect(sample()).toBe(true);
  })
});