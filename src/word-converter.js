import ru from "convert-layout/ru";
import convert from "convert-layout/convert";

function convertLayout(word) {
  let converted;

  converted = ru.fromEn(word);

  if (converted != word) {
    return converted;
  }

  converted = ru.toEn(word);

  return converted;
}

function translit(word) {
  let mapRUEN = {
    "a": "а",
    "b": "б",
    "v": "в",
    "g": "г",
    "d": "д",
    "e": "е",
    "zh": "ж",
    "z": "з",
    "i": "и",
    "j": "й",
    "k": "к",
    "l": "л",
    "m": "м",
    "n": "н",
    "o": "о",
    "p": "п",
    "r": "р",
    "s": "с",
    "t": "т",
    "u": "у",
    "f": "ф",
    "h": "х",
    "kh": "х",
    "c": "ц",
    "ch": "ч",
    "sh": "ш",
    "shh": "щ",
    "#": "ъ",
    "y": "ы",
    "'": "ь",
    "je": "э",
    "ju": "ю",
    "ja": "я"
  };

  let translitRU = convert(mapRUEN);

  let converted;

  converted = translitRU.toEn(word);

  if (converted != word) {
    return converted;
  }

  converted = translitRU.fromEn(word);

  return converted;
}

function getConditionalWords(word) {
  let words = [];
  words.push(word);

  let converted = convertLayout(word);
  words.push(converted);
  converted = translit(converted);
  words.push(converted);

  converted = translit(word);
  words.push(converted);
  converted = convertLayout(converted);
  words.push(converted);

  return words.map(w=> {
    return w.toLowerCase();
  });
}

export default {
  convertLayout,
  translit,
  getConditionalWords
};

