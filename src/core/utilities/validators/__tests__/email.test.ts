import {isValidEmail} from "../index";

test("Email validator should be true ", () => {
  expect(isValidEmail("hosseinm.developer@gmail.com")).toBeTruthy();
  expect(isValidEmail("ho%^*i121__2nm.developer@ssd.gmail.com")).toBeTruthy();
});

test("Email validator should be false ", () => {
  expect(isValidEmail("hosseinm.developergmail.com")).toBeFalsy();
  expect(isValidEmail("hosse(inm.developer@gmail.com")).toBeFalsy();
  expect(isValidEmail("hossein<m.developer@gmail.com")).toBeFalsy();
  expect(isValidEmail(".developer@gmail.com")).toBeFalsy();
  expect(isValidEmail("hosseinm.developer@gmail.c")).toBeFalsy();
  expect(isValidEmail("@hosseinm.developer@gmail.com")).toBeFalsy();
  expect(isValidEmail("@gmail.com")).toBeFalsy();
  expect(isValidEmail("hosseinm@developer@gmail.com")).toBeFalsy();
  expect(isValidEmail("0932434234")).toBeFalsy();
});

test("Email validator should throw error ", () => {
  //@ts-expect-error
  expect(() => isValidEmail(121212)).toThrow();
  //@ts-expect-error
  expect(() => isValidEmail(() => {})).toThrow();
  //@ts-expect-error
  expect(() => isValidEmail({})).toThrow();
  //@ts-expect-error
  expect(() => isValidEmail(["sdsd"])).toThrow();
});
