import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import Navbar from "@src/components/Navbar/Navbar";

import { StripeProvider } from "@src/contexts/StripeContext/StripeContext";

import { useStripeContext } from "@src/hooks/useStripeContext";

import { mockSubLinks } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <Navbar />
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

describe("Navbar.tsx", () => {
  const handleMobileMenuClose = jest.fn();
  const handleMobileMenuOpen = jest.fn();
  const handleDesktopMenuClose = jest.fn();
  const handleDesktopMenuOpen = jest.fn();

  beforeEach(() => {
    (useStripeContext as jest.Mock).mockReturnValue({
      mobileMenu: false,
      subLink: { page: "", links: [] },
      desktopMenu: false,
      location: 0,
      handleMobileMenuClose: handleMobileMenuClose,
      handleMobileMenuOpen: handleMobileMenuOpen,
      handleDesktopMenuClose: handleDesktopMenuClose,
      handleDesktopMenuOpen: handleDesktopMenuOpen,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render the logo, the 'Open Menu' button, the nav, the list of items and the 'Sign in' button.", () => {
      renderComponent();

      const imgLogo = screen.getByRole("img");
      const btnOpenMenu = screen.getByRole("button", { name: /open menu/i });
      const nav = screen.getByRole("navigation");
      const list = screen.getByRole("list");
      const listItems = screen.getAllByRole("listitem");
      const btnSignIn = screen.getByRole("button", { name: /sign in/i });

      for (let subLink of mockSubLinks) {
        const btnSubLink = screen.getByRole("button", {
          name: `button ${subLink.page}`,
        });
        expect(btnSubLink).toBeInTheDocument();
      }

      expect(imgLogo).toBeInTheDocument();
      expect(imgLogo).toHaveAttribute("src", "image-mock");
      expect(imgLogo).toHaveAttribute("alt", "logo");
      expect(btnOpenMenu).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(mockSubLinks.length);
      expect(btnSignIn).toBeInTheDocument();
    });

    test("It must execute the function 'handleDesktopMenuClose' when hovering over the header.", async () => {
      const { container } = renderComponent();

      const header = container.querySelector(".header-wrapper") as HTMLElement;

      expect(header).toBeInTheDocument();

      await user.hover(header!);

      expect(handleDesktopMenuClose).toHaveBeenCalledTimes(1);
    });

    test("It must execute the function 'handleMobileMenuOpen' when you click on 'open menu'.", async () => {
      renderComponent();

      const btnOpenMenu = screen.getByRole("button", { name: /open menu/i });

      expect(btnOpenMenu).toBeInTheDocument();

      await user.click(btnOpenMenu);

      expect(handleMobileMenuOpen).toHaveBeenCalledTimes(1);
    });

    test("It must execute the function 'handleDesktopMenuOpen' when hovering on a link.", async () => {
      renderComponent();

      for (let subLink of mockSubLinks) {
        const btnSubLink = screen.getByRole("button", {
          name: `button ${subLink.page}`,
        });
        expect(btnSubLink).toBeInTheDocument();

        await user.click(btnSubLink);

        expect(handleDesktopMenuOpen).toHaveBeenCalledTimes(1);
        expect(handleDesktopMenuOpen).toHaveBeenCalledWith(subLink.page, 0);
        jest.resetAllMocks();
      }
    });
  });
});
