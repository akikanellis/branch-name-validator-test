import * as main from "@branch-name-validator-test/action/internal/main";

const runMock = jest.spyOn(main, "run").mockImplementation();

describe("index", () => {
  it("calls run when imported", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("../src/index");

    expect(runMock).toHaveBeenCalled();
  });
});
