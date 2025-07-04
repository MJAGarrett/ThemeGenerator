import { describe, expect, it } from "vitest";
import { makeByte, makeCircleDegree, makeNormalized, makeNumber0To100 } from "../../src/utils/number_types";
import { isBetween } from "../../src/utils/math_utils";

describe("Number types", () => {
  describe("Byte", () => {
    describe("makeByte", () => {
      it("should throw when given non-byte values", () => {
        expect(() => makeByte(-12)).toThrow();
        expect(() => makeByte(500)).toThrow();
      });

      it("should return an integer between 0 and 255 on success", () => {
        const inputs = [ 42, 255, 0, 51 ];
        const outputs = inputs.map(makeByte);

        for (const output of outputs) {
          expect(isBetween(output, 0, 255) && Number.isInteger(output));
        }
      });
    });
  });

  describe("Normalized", () => {
    describe("makeNormalized", () => {
      it("should throw on invalid input", () => {
        const inputs = [ -1.0, 1.2, 20 ];
        for (const input of inputs) expect(() => makeNormalized(input)).toThrow();
      });

      it("should tag values between 0 and 1, inclusive", () => {
        const inputs = [ 0, 1, 0.52 ];
        for (const input of inputs) expect(makeNormalized(input) === input);
      });
    });
  });

  describe("CircleDegree", () => {
    describe("makeCircleDegree", () => {
      it("should throw on invalid input", () => {
        const inputs = [ -42, 360.1, 6666 ];
        for (const input of inputs) expect(() => makeCircleDegree(input)).toThrow();
      });

      it("should tag values between 0 and 360, inclusive", () => {
        const inputs = [ 0, 360, 156.32 ];
        for (const input of inputs) expect(makeCircleDegree(input) === input);
      });
    });
  });

  describe("Number0To100", () => {
    describe("makeNumber0To100", () => {
      it("should throw on invalid input", () => {
        const inputs = [ -42, 360.1, 101 ];
        for (const input of inputs) expect(() => makeNumber0To100(input)).toThrow();
      });

      it("should tag values between 0 and 100, inclusive", () => {
        const inputs = [ 0, 42.3, 100 ];
        for (const input of inputs) expect(makeNumber0To100(input) === input);
      });
    });
  });
});
