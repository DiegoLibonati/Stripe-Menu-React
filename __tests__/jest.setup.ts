import "@testing-library/jest-dom";

import { mockSubLinks } from "@tests/__mocks__/subLinks.mock";

jest.mock("@/constants/subLinks", () => ({
  __esModule: true,
  default: mockSubLinks,
}));
