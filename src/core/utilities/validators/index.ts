//@ts-ignore
import invariant from "invariant";
import { farsiLettersRegex, latinOrNumberRegex } from "../regexes/regex";

/** Iran Mobile number validator return true if number is valid */
function isValidMobile(number: string): boolean {
  invariant(
    typeof number === "string",
    `isValidMobile: param should get string but got ${typeof number}`
  );

  const format = /^((09)([0-9]{9}))$/;

  return format.test(number);
}

/** Email validator return true if Email is valid */
function isValidEmail(email: string): boolean {
  invariant(
    typeof email === "string",
    `isValidEmail: param should get string but got ${typeof email}`
  );

  const format =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return format.test(email);
}

function isValidLandline(landline: string): boolean {
  invariant(
    typeof landline === "string",
    `isValidMobile: param should get string but got ${typeof landline}`
  );

  const format = /^0[1-8]{1}[0-9]{9}$/;

  return format.test(landline);
}

const iso7064Mod97_10 = (iban: string): number => {
  let remainder: string = iban;
  let block: string;

  while (remainder.length > 2) {
    block = remainder.slice(0, 9);
    remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
  }

  return parseInt(remainder, 10) % 97;
};

const validateIranianSheba = (iban: string): boolean => {
  if (!iban.startsWith("IR")) {
    iban = "IR" + iban;
  }

  const pattern = /IR[0-9]{24}/;

  if (iban.length !== 26) {
    return false;
  }

  if (!pattern.test(iban)) {
    return false;
  }

  let testString = iban.substring(4);
  const d1 = iban.charCodeAt(0) - 65 + 10;
  const d2 = iban.charCodeAt(1) - 65 + 10;
  testString += d1.toString() + d2.toString() + iban.substring(2, 2);

  if (iso7064Mod97_10(testString) !== 1) {
    return false;
  }
  return true;
};

const validateCreditCard = (cardNumber: string): boolean => {
  if (cardNumber.length !== 16) {
    return false;
  }

  const sum = cardNumber.split("").reduce((prev, curr, index) => {
    if (index % 2 === 0) {
      if (Number(curr) * 2 > 9) {
        return (prev = prev - 9 + Number(curr) * 2);
      } else {
        return (prev = prev + Number(curr) * 2);
      }
    } else {
      return (prev += Number(curr));
    }
  }, 0);

  return sum % 10 === 0 ? true : false;
};

const validateMaxDecimalLength = ({
  value,
  maxDecimalLength,
}: {
  value: string;
  maxDecimalLength: number;
}) => {
  return !(
    value.includes(".") && value.split(".")[1].length > maxDecimalLength
  );
};

const isNumber = (value: string) => {
  const regexString = /^[0-9]*$/;
  const regex = new RegExp(regexString);

  return regex.test(value);
};

const isDecimal = (value: string) => {
  const regexString = /^\d*\.?\d*$/;
  const regex = new RegExp(regexString);

  return regex.test(value);
};

const hasLatinOrNumbers = (text: string | number) => {
  return latinOrNumberRegex.test(
    typeof text === "number" ? String(text) : text
  );
};
const hasFarsiLetters = (text: string | number) => {
  return farsiLettersRegex.test(typeof text === "number" ? String(text) : text);
};

export {
  isValidEmail,
  isValidLandline,
  isValidMobile,
  isDecimal,
  validateCreditCard,
  validateIranianSheba,
  validateMaxDecimalLength,
  isNumber,
  hasLatinOrNumbers,
  hasFarsiLetters,
};
