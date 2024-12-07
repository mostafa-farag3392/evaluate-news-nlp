/**
 * @jest-environment jsdom
 */
const { handleSubmit } = require("../src/client/js/formHandler");

describe("Testing handleSubmit function", () => {
  test("should be defined", () => {
    expect(handleSubmit).toBeDefined();
  });
});