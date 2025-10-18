import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import Sidebar from "@src/components/Sidebar/Sidebar";

import { StripeProvider } from "@src/contexts/StripeContext/StripeContext";

import { useStripeContext } from "@src/hooks/useStripeContext";

import { mockSubLinks } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <Sidebar />
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

describe("Sidebar.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the close menu button, the list of items and all items with their respective title.", () => {
      (useStripeContext as jest.Mock).mockReturnValue({
        mobileMenu: false,
        subLink: { page: "", links: [] },
        desktopMenu: false,
        location: 0,
        handleMobileMenuClose: jest.fn(),
        handleMobileMenuOpen: jest.fn(),
        handleDesktopMenuClose: jest.fn(),
        handleDesktopMenuOpen: jest.fn(),
      });

      const { container } = renderComponent();

      const root = container.querySelector(".sidebar-wrapper");
      const btnCloseMenu = screen.getByRole("button", { name: /close menu/i });
      const list = screen.getByRole("list");
      const listItems = screen.getAllByRole("listitem");

      for (let subLink of mockSubLinks) {
        const heading = screen.getByRole("heading", { name: subLink.page });

        expect(heading).toBeInTheDocument();

        for (let link of subLink.links) {
          const anchor = screen.getByRole("link", {
            name: `link ${link.label}`,
          });

          expect(anchor).toBeInTheDocument();
          expect(anchor).toHaveAttribute("href", link.url);
        }
      }

      expect(root).toBeInTheDocument();
      expect(root?.classList.contains("sidebar-wrapper--show")).toBeFalsy();
      expect(btnCloseMenu).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(mockSubLinks.length);
    });

    test("It must render the root with the class 'sidebar__wrapper--show' if 'mobileMenu' is 'true'.", () => {
      (useStripeContext as jest.Mock).mockReturnValue({
        mobileMenu: true,
        subLink: { page: "", links: [] },
        desktopMenu: false,
        location: 0,
        handleMobileMenuClose: jest.fn(),
        handleMobileMenuOpen: jest.fn(),
        handleDesktopMenuClose: jest.fn(),
        handleDesktopMenuOpen: jest.fn(),
      });

      const { container } = renderComponent();

      const root = container.querySelector(".sidebar-wrapper");

      expect(root).toBeInTheDocument();
      expect(root?.classList.contains("sidebar-wrapper--show")).toBeTruthy();
    });

    test("It must execute the function 'handleMobileMenuClose' if you click on 'close menu'.", async () => {
      const handleMobileMenuClose = jest.fn();

      (useStripeContext as jest.Mock).mockReturnValue({
        mobileMenu: false,
        subLink: { page: "", links: [] },
        desktopMenu: false,
        location: 0,
        handleMobileMenuClose: handleMobileMenuClose,
        handleMobileMenuOpen: jest.fn(),
        handleDesktopMenuClose: jest.fn(),
        handleDesktopMenuOpen: jest.fn(),
      });

      renderComponent();

      const btnCloseMenu = screen.getByRole("button", { name: /close menu/i });

      expect(btnCloseMenu).toBeInTheDocument();

      await user.click(btnCloseMenu);

      expect(handleMobileMenuClose).toHaveBeenCalledTimes(1);
    });
  });
});
