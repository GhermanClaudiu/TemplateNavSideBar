import { it, expect, describe } from "vitest";
import {
  isNotEmpty,
  isEmail,
  hasMinLength,
  isEqualsToOtherValue,
} from "./validation";

describe("isNotEmpty function", () => {
  it("should return false for empty string", () => {
    expect(isNotEmpty("")).toBe(false);
  });

  it("should return false for string with only spaces", () => {
    expect(isNotEmpty("   ")).toBe(false);
  });

  it("should return true for non-empty string", () => {
    expect(isNotEmpty("hello")).toBe(true);
  });

  it("should return true for string with leading and trailing spaces but has content", () => {
    expect(isNotEmpty("  hello  ")).toBe(true);
  });
});

describe("isEmail function", () => {
  it("should return false for an empty string", () => {
    expect(isEmail("")).toBe(false);
  });

  it("should return false for string without @ symbol", () => {
    expect(isEmail("example.com")).toBe(false);
  });

  it("should return true for a valid email format", () => {
    expect(isEmail("user@example.com")).toBe(true);
  });

  it("should return false for string with @ at the start", () => {
    expect(isEmail("@example.com")).toBe(false);
  });

  it("should return false for string with @ at the end", () => {
    expect(isEmail("user@example.com@")).toBe(false);
  });

  it("should return true for email with multiple subdomains", () => {
    expect(isEmail("user@mail.example.co.uk")).toBe(true);
  });

  it("should return false for email with multiple @ symbols", () => {
    expect(isEmail("user@@example.com")).toBe(false);
  });
});

describe("hasMinLength function", () => {
  it("should return false if the string length is less than the min length", () => {
    expect(hasMinLength("abc", 5)).toBe(false);
  });

  it("should return true if the string length is equal to the min length", () => {
    expect(hasMinLength("hello", 5)).toBe(true);
  });

  it("should return true if the string length is greater than the min length", () => {
    expect(hasMinLength("hello world", 5)).toBe(true);
  });

  it("should return true for empty string and min length of 0", () => {
    expect(hasMinLength("", 0)).toBe(true);
  });

  it("should return false for empty string and min length of 1", () => {
    expect(hasMinLength("", 1)).toBe(false);
  });

  it("should handle null input gracefully", () => {
    expect(hasMinLength(null, 1)).toBe(false);
  });

  it("should handle undefined input gracefully", () => {
    expect(hasMinLength(undefined, 1)).toBe(false);
  });
});
describe("isEqualsToOtherValue function", () => {
  it("should return true if both values are the same string", () => {
    expect(isEqualsToOtherValue("hello", "hello")).toBe(true);
  });

  it("should return false if the strings are different", () => {
    expect(isEqualsToOtherValue("hello", "world")).toBe(false);
  });

  it("should return true if both values are the same number", () => {
    expect(isEqualsToOtherValue(123, 123)).toBe(true);
  });

  it("should return false if the numbers are different", () => {
    expect(isEqualsToOtherValue(123, 456)).toBe(false);
  });

  it("should return true if both values are null", () => {
    expect(isEqualsToOtherValue(null, null)).toBe(true);
  });

  it("should return true if both values are undefined", () => {
    expect(isEqualsToOtherValue(undefined, undefined)).toBe(true);
  });

  it("should return false if one value is null and the other is undefined", () => {
    expect(isEqualsToOtherValue(null, undefined)).toBe(false);
  });

  it("should return false for different types with the same value", () => {
    expect(isEqualsToOtherValue("5", 5)).toBe(false);
  });

  it("should return true for the same objects", () => {
    const obj = { key: "value" };
    expect(isEqualsToOtherValue(obj, obj)).toBe(true);
  });

  it("should return false for different objects with the same content", () => {
    expect(isEqualsToOtherValue({ key: "value" }, { key: "value" })).toBe(
      false
    );
  });
});
