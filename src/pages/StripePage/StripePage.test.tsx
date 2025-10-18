import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { StripePage } from "@src/pages/StripePage/StripePage";

import { StripeProvider } from "@src/contexts/StripeContext/StripeContext";

import { mockSubLinks } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <StripePage />
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

describe("StripePage.tsx", () => {
  describe("General Tests.", () => {
    const SUBLINK = mockSubLinks[0];

    test("It must open the navbar in mobile when you click on the 'open menu' button and close it when you click on 'close menu'.", async () => {
      const { container } = renderComponent();

      const rootMenu = container.querySelector(
        ".sidebar-wrapper"
      ) as HTMLElement;
      const btnOpenMenu = screen.getByRole("button", { name: /open menu/i });
      const btnCloseMenu = screen.getByRole("button", { name: /close menu/i });

      expect(rootMenu).toBeInTheDocument();
      expect(rootMenu?.classList.contains("sidebar-wrapper--show")).toBeFalsy();

      await user.click(btnOpenMenu);

      expect(
        rootMenu?.classList.contains("sidebar-wrapper--show")
      ).toBeTruthy();

      await user.click(btnCloseMenu);

      expect(rootMenu?.classList.contains("sidebar-wrapper--show")).toBeFalsy();
    });

    test("When you hover on a specific link it should open the respective menu, if you exit it should close.", async () => {
      const { container } = renderComponent();

      const rootSubMenu = container.querySelector(".submenu") as HTMLElement;
      const headerOutHover = container.querySelector(
        ".header-wrapper"
      ) as HTMLElement;
      const btnOnHoverLink = screen.getByRole("button", {
        name: `button ${SUBLINK.page}`,
      });

      expect(rootSubMenu).toBeInTheDocument();
      expect(rootSubMenu?.classList.contains("submenu--show")).toBeFalsy();
      expect(headerOutHover).toBeInTheDocument();
      expect(btnOnHoverLink).toBeInTheDocument();

      await user.hover(btnOnHoverLink);

      expect(rootSubMenu?.classList.contains("submenu--show")).toBeTruthy();

      await user.hover(headerOutHover);

      expect(rootSubMenu?.classList.contains("submenu--show")).toBeFalsy();
    });
  });
});
