import { expect } from "jsr:@std/expect@1.0.5";
import { compare } from "./algorithm.ts";

Deno.test("Algorithm answer and guess match", () => {
	expect(compare("guess", "guess")).toEqual([1, 1, 1, 1, 1]);
});

Deno.test("Algorithm throws on different word lengths", () => {
	expect(() => compare("guess", "gas")).toThrow();
});

Deno.test("Algorithm accurately compares two words", () => {
	expect(compare("jumps", "bends")).toEqual([0, 0, 0, 0, 1]);
});

Deno.test("Algorithm accurately compares two words with multilpes of letters",
	() => {
	expect(compare("jesus", "guess")).toEqual([0, -1, -1, -1, 1]);
});
