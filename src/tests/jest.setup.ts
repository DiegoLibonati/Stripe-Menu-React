import "@testing-library/jest-dom";

import { SUBLINKS_MOCK } from "./constants/constants";

jest.mock("../constants/data.ts", () => ({
  get subLinks() {
    return SUBLINKS_MOCK;
  },
}));
