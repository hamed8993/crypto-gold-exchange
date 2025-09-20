import { isValidMobile } from "../index";

test("Phone number validator should be true ", () => {
  const result = isValidMobile("09302300202");
  expect(result).toBeTruthy();
});

test("Phone number 09 validator and has 9 other numbers should be true ", () => {
  expect(isValidMobile("09356669168")).toBeTruthy();

  expect(isValidMobile("+989302300202")).toBeFalsy();

  expect(isValidMobile("9356669168")).toBeFalsy();

  expect(isValidMobile("089370662186")).toBeFalsy();

  expect(isValidMobile("08370662186")).toBeFalsy();
});
