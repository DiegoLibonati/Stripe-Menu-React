import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { AppContext as AppContextT } from "../../entities/entities";

import Navbar from "./Navbar";

import { AppContext } from "../../contexts/context";

import { mockSubLinks } from "../../tests/jest.constants";

type RenderComponent = {
  mockAppProvider: AppContextT;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const mockAppProvider: AppContextT = {
    mobileMenu: false,
    subLink: { page: "", links: [] },
    desktopMenu: false,
    location: 0,
    handleMobileMenuClose: jest.fn(),
    handleMobileMenuOpen: jest.fn(),
    handleDesktopMenuClose: jest.fn(),
    handleDesktopMenuOpen: jest.fn(),
  };

  const { container } = render(
    <AppContext.Provider value={mockAppProvider}>
      <Navbar />
    </AppContext.Provider>
  );

  return {
    mockAppProvider: mockAppProvider,
    container: container,
  };
};

jest.mock("../../constants/data.ts", () => ({
  get subLinks() {
    return mockSubLinks;
  },
}));

describe("Navbar.tsx", () => {
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
      const { container, mockAppProvider } = renderComponent();

      // eslint-disable-next-line
      const header = container.querySelector(".header-wrapper") as HTMLElement;

      expect(header).toBeInTheDocument();

      await user.hover(header!);

      expect(mockAppProvider.handleDesktopMenuClose).toHaveBeenCalledTimes(1);
    });

    test("It must execute the function 'handleMobileMenuOpen' when you click on 'open menu'.", async () => {
      const { mockAppProvider } = renderComponent();

      const btnOpenMenu = screen.getByRole("button", { name: /open menu/i });

      expect(btnOpenMenu).toBeInTheDocument();

      await user.click(btnOpenMenu);

      expect(mockAppProvider.handleMobileMenuOpen).toHaveBeenCalledTimes(1);
    });

    test("It must execute the function 'handleDesktopMenuOpen' when hovering on a link.", async () => {
      const { mockAppProvider } = renderComponent();

      for (let subLink of mockSubLinks) {
        const btnSubLink = screen.getByRole("button", {
          name: `button ${subLink.page}`,
        });
        expect(btnSubLink).toBeInTheDocument();

        await user.click(btnSubLink);

        expect(mockAppProvider.handleDesktopMenuOpen).toHaveBeenCalledTimes(1);
        expect(mockAppProvider.handleDesktopMenuOpen).toHaveBeenCalledWith(
          subLink.page,
          0
        );
        jest.resetAllMocks();
      }
    });
  });
});
