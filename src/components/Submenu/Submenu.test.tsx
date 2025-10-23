import { screen, render } from "@testing-library/react";

import Submenu from "@src/components/Submenu/Submenu";

import { StripeProvider } from "@src/contexts/StripeContext/StripeContext";

import { useStripeContext } from "@src/hooks/useStripeContext";

import { mockSubLinks } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <Submenu />
    </StripeProvider>
  );

  return {
    container: container,
  };
};

jest.mock("@src/constants/subLinks", () => {
  const { mockSubLinks } = jest.requireActual("@tests/jest.constants");
  return { __esModule: true, default: mockSubLinks };
});

jest.mock("@src/hooks/useStripeContext", () => ({
  useStripeContext: jest.fn(),
}));

describe("Submenu.tsx", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    const SUBLINK = mockSubLinks[0];

    test("It should render the root of the submenu, the title, the list and the total elements of the rendered list of the 'subLink'.", () => {
      const location = 2;

      (useStripeContext as jest.Mock).mockReturnValue({
        mobileMenu: false,
        subLink: SUBLINK,
        desktopMenu: false,
        location: location,
        handleMobileMenuClose: jest.fn(),
        handleMobileMenuOpen: jest.fn(),
        handleDesktopMenuClose: jest.fn(),
        handleDesktopMenuOpen: jest.fn(),
      });

      const { container } = renderComponent();

      const root = container.querySelector<HTMLElement>(".submenu");
      const heading = screen.getByRole("heading", { name: SUBLINK.page });
      const list = screen.getByRole("list");
      const listItems = screen.getAllByRole("listitem");

      for (let link of SUBLINK.links) {
        const anchor = screen.getByRole("link", { name: `link ${link.label}` });

        expect(anchor).toBeInTheDocument();
        expect(anchor).toHaveAttribute("href", link.url);
      }

      expect(root).toBeInTheDocument();
      expect(root?.classList.contains("submenu--show")).toBeFalsy();
      expect(
        root?.getAttribute("style")?.includes(`left: ${location}px;`)
      ).toBeTruthy();
      expect(heading).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(SUBLINK.links.length);
    });

    test("It must render the root of the submenu with the class 'submenu--show' when 'desktopMenu' is 'true'.", () => {
      const location = 2;

      (useStripeContext as jest.Mock).mockReturnValue({
        mobileMenu: false,
        subLink: SUBLINK,
        desktopMenu: true,
        location: location,
        handleMobileMenuClose: jest.fn(),
        handleMobileMenuOpen: jest.fn(),
        handleDesktopMenuClose: jest.fn(),
        handleDesktopMenuOpen: jest.fn(),
      });

      const { container } = renderComponent();

      const root = container.querySelector<HTMLElement>(".submenu");

      expect(root).toBeInTheDocument();
      expect(root?.classList.contains("submenu--show")).toBeTruthy();
      expect(
        root?.getAttribute("style")?.includes(`left: ${location}px;`)
      ).toBeTruthy();
    });
  });
});
