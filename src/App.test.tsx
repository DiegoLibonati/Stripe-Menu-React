import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "./App";

import { AppProvider } from "./contexts/context";

import { mockSubLinks } from "../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  return {
    container: container,
  };
};

jest.mock("./constants/data.ts", () => ({
  get subLinks() {
    return mockSubLinks;
  },
}));

describe("App.tsx", () => {
  describe("General Tests.", () => {
    const SUBLINK = mockSubLinks[0];

    test("It must open the navbar in mobile when you click on the 'open menu' button and close it when you click on 'close menu'.", async () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
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

      // eslint-disable-next-line
      const rootSubMenu = container.querySelector(".submenu") as HTMLElement;
      // eslint-disable-next-line
      const headerOutHover = container.querySelector(".header-wrapper") as HTMLElement;
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
