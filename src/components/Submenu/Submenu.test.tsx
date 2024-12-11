import { screen, render } from "@testing-library/react";

import { AppContext as AppContextT, SubLink } from "../../entities/entities";

import Submenu from "./Submenu";

import { AppContext } from "../../contexts/context";

import { SUBLINKS_MOCK } from "../../tests/constants/constants";

const SUBLINK = SUBLINKS_MOCK[0];

type RenderComponent = {
  mockAppProvider: AppContextT;
  container: HTMLElement;
};

interface RenderComponentProps {
  desktopMenu: boolean;
  location: number;
  subLink: SubLink;
}

const renderComponent = ({
  desktopMenu,
  location,
  subLink,
}: RenderComponentProps): RenderComponent => {
  const mockAppProvider: AppContextT = {
    mobileMenu: false,
    subLink: subLink,
    desktopMenu: desktopMenu,
    location: location,
    handleMobileMenuClose: jest.fn(),
    handleMobileMenuOpen: jest.fn(),
    handleDesktopMenuClose: jest.fn(),
    handleDesktopMenuOpen: jest.fn(),
  };

  const { container } = render(
    <AppContext.Provider value={mockAppProvider}>
      <Submenu />
    </AppContext.Provider>
  );

  return {
    mockAppProvider: mockAppProvider,
    container: container,
  };
};

test("It should render the root of the submenu, the title, the list and the total elements of the rendered list of the 'subLink'.", () => {
  const location = 2;

  const { container } = renderComponent({
    desktopMenu: false,
    location: location,
    subLink: SUBLINK,
  });

  // eslint-disable-next-line
  const root = container.querySelector(".submenu_container");
  const heading = screen.getByRole("heading", { name: SUBLINK.page });
  const list = screen.getByRole("list");
  const listItems = screen.getAllByRole("listitem");

  for (let link of SUBLINK.links) {
    const anchor = screen.getByRole("link", { name: `link ${link.label}` });

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("href", link.url);
  }

  expect(root).toBeInTheDocument();
  expect(root?.classList.contains("show-submenu")).toBeFalsy();
  expect(root?.getAttribute("style")?.includes(`left: ${location}px;`)).toBeTruthy();
  expect(heading).toBeInTheDocument();
  expect(list).toBeInTheDocument();
  expect(listItems).toHaveLength(SUBLINK.links.length);
});

test("It must render the root of the submenu with the class 'show-submenu' when 'desktopMenu' is 'true'.", () => {
  const location = 2;

  const { container } = renderComponent({
    desktopMenu: true,
    location: location,
    subLink: SUBLINK,
  });

  // eslint-disable-next-line
  const root = container.querySelector(".submenu_container");

  expect(root).toBeInTheDocument();
  expect(root?.classList.contains("show-submenu")).toBeTruthy();
  expect(root?.getAttribute("style")?.includes(`left: ${location}px;`)).toBeTruthy();
});