import { describe, it, expect } from "vitest";
import { alternative, optional, parseNumber, scanLetter, seq, seqL, seqR } from "../../src/parsers/utils";
import { isNone, isSome, Some } from "../../src/Monads/Optional";
import { assertIsNonNull } from "../test_utils/test_utils";

describe("Utility Parsers", () => {
  describe("ScanLetter", () => {
    const scanA = scanLetter("A");

    it("should return the parsed string and the letter on successful parse", () => {
      const res = scanA("Apple");
      assertIsNonNull(res);

      const {
        string,
        result,
      } = res;

      expect(string === "pple").toBeTruthy();
      expect(result === "A").toBeTruthy();
    });

    it("should return null on a failed parse", () => {
      expect(scanA("Failure")).toBeNull();
    });
  });

  describe("Alternative", () => {
    const A_or_a = alternative(scanLetter("A"))(scanLetter("a"));

    it("should return the result of either the first or second parser if successful", () => {
      const res1 = A_or_a("A string");
      const res2 = A_or_a("a undercase string");

      assertIsNonNull(res1);
      assertIsNonNull(res2);

      expect(res1.string === " string").toBeTruthy();
      expect(res1.result === "A").toBeTruthy();

      expect(res2.string === " undercase string").toBeTruthy();
      expect(res2.result === "a").toBeTruthy();
    });

    it("should return null if neither parser can successfully parse the input", () => {
      expect(A_or_a("Failure!")).toBeNull();
    });
  });

  describe("Sequence parsers", () => {

    describe("seq", () => {
      const scanAthenB = seq(scanLetter("A"))(scanLetter("B"));

      it("should return null if either constituent parser fails to parse", () => {
        expect(scanAthenB("Total Failure")).toBeNull();
        expect(scanAthenB("A partial Failure")).toBeNull();
      });

      it("should combine the results of both parsers on a successful parse", () => {
        const res = scanAthenB("AB Success");

        assertIsNonNull(res);
        const { string, result } = res;

        expect(string).toBe(" Success");
        expect(result).toEqual([ "A", "B" ]);
      });
    });

    describe("seqL", () => {
      const scanAandIgnoreB = seqL(scanLetter("A"))(scanLetter("B"));

      it("should return null if either parser failed to parse input", () => {
        expect(scanAandIgnoreB("AFailure")).toBeNull();
        expect(scanAandIgnoreB("Total Failure")).toBeNull();
      });

      it("should return the result of the left parser on a successful parse", () => {
        const res = scanAandIgnoreB("AB rest");
        assertIsNonNull(res);

        expect(res.string === " rest");
        expect(res.result === "A");
      });
    });

    describe("seqR", () => {
      const ignoreAandScanB = seqR(scanLetter("A"))(scanLetter("B"));

      it("should return null if either parser failed to parse input", () => {
        expect(ignoreAandScanB("AFailure")).toBeNull();
        expect(ignoreAandScanB("Total Failure")).toBeNull();
      });

      it("should return the result of the right parser on a successful parse", () => {
        const res = ignoreAandScanB("AB rest");
        assertIsNonNull(res);

        expect(res.string === " rest");
        expect(res.result === "B");
      });
    });
  });

  describe("optional", () => {
    const maybeA = optional(scanLetter("A"));

    it("Should return an unaltered string and a nullopt on a failed parse", () => {
      const { string, result } = maybeA("bad string");
      expect(string === "bad string").toBeTruthy();
      expect(isNone(result)).toBeTruthy();
    });

    it("should return the parsed string and the result of parsing on a successful parse", () => {
      const { string, result } = maybeA("A string");
      expect(string).toBe(" string");
      expect(isSome(result)).toBeTruthy();
      expect((result as Some<string>).payload).toBe("A");
    });
  });

  describe("Number Parsing", () => {
    it("should parse a valid integer", () => {
      const integer = "-12";

      const res = parseNumber(integer);

      assertIsNonNull(res);
      const { string, result } = res;
      expect(string).toBe("");
      expect(result).toBe(-12);
    });

    it("should parse a valid decimal number", () => {
      const decimal = "12.41";

      const res = parseNumber(decimal);

      assertIsNonNull(res);
      const { string, result } = res;
      expect(string).toBe("");
      expect(result).toBe(12.41);
    });

    it("should parse up to the period if a decimal value does not follow", () => {
      const number = "44112.";

      const res = parseNumber(number);

      assertIsNonNull(res);
      const { string, result } = res;
      expect(string).toBe(".");
      expect(result).toBe(44112);
    });
  });
});
