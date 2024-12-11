import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { AppContext as AppContextT } from "../../entities/entities";

import Sidebar from "./Sidebar";

import { AppContext } from "../../contexts/context";

import { SUBLINKS_MOCK } from "../../tests/constants/constants";

type RenderComponent = {
  mockAppProvider: AppContextT;
  container: HTMLElement;
};

interface RenderComponentProps {
  mobileMenu: boolean;
}

const renderComponent = ({
  mobileMenu,
}: RenderComponentProps): RenderComponent => {
  const mockAppProvider: AppContextT = {
    mobileMenu: mobileMenu,
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
      <Sidebar />
    </AppContext.Provider>
  );

  return {
    mockAppProvider: mockAppProvider,
    container: container,
  };
};

test("It should render the close menu button, the list of items and all items with their respective title.", () => {
  const { container } = renderComponent({ mobileMenu: false });

  // eslint-disable-next-line
  const root = container.querySelector(".sidebar-wrapper");
  const btnCloseMenu = screen.getByRole("button", { name: /close menu/i });
  const list = screen.getByRole("list");
  const listItems = screen.getAllByRole("listitem");

  for (let subLink of SUBLINKS_MOCK) {
    const heading = screen.getByRole("heading", { name: subLink.page });

    expect(heading).toBeInTheDocument();

    for (let link of subLink.links) {
      const anchor = screen.getByRole("link", { name: `link ${link.label}` });

      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", link.url);
    }
  }

  expect(root).toBeInTheDocument();
  expect(root?.classList.contains("show-sidebar")).toBeFalsy();
  expect(btnCloseMenu).toBeInTheDocument();
  expect(list).toBeInTheDocument();
  expect(listItems).toHaveLength(SUBLINKS_MOCK.length);
});

test("It must render the root with the class 'show-sidebar' if 'mobileMenu' is 'true'.", () => {
  const { container } = renderComponent({ mobileMenu: true });

  // eslint-disable-next-line
  const root = container.querySelector(".sidebar-wrapper");

  expect(root).toBeInTheDocument();
  expect(root?.classList.contains("show-sidebar")).toBeTruthy();
});

test("It must execute the function 'handleMobileMenuClose' if you click on 'close menu'.", async () => {
  const { mockAppProvider } = renderComponent({ mobileMenu: false });

  const btnCloseMenu = screen.getByRole("button", { name: /close menu/i });

  expect(btnCloseMenu).toBeInTheDocument();

  await user.click(btnCloseMenu);

  expect(mockAppProvider.handleMobileMenuClose).toHaveBeenCalledTimes(1);
});