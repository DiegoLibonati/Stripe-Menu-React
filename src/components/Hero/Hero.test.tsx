import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { AppContext as AppContextT } from "../../entities/entities";

import Hero from "./Hero";

import { AppContext } from "../../contexts/context";

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
      <Hero />
    </AppContext.Provider>
  );

  return {
    mockAppProvider: mockAppProvider,
    container: container,
  };
};

test("It should render the title, the paragraph, the 'Start Now' button and the cell phone image.", () => {
  renderComponent();

  const headingHero = screen.getByRole("heading", {
    name: /payments infrastructure/i,
  });
  const paragraphHero = screen.getByText(
    "Millions of companies of all sizes—from startups to Fortune 500s—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online"
  );
  const buttonStartNow = screen.getByRole("button", { name: /start now/i });
  const imgPhone = screen.getByRole("img");

  expect(headingHero).toBeInTheDocument();
  expect(paragraphHero).toBeInTheDocument();
  expect(buttonStartNow).toBeInTheDocument();
  expect(imgPhone).toBeInTheDocument();
  expect(imgPhone).toHaveAttribute("src", "image-mock");
  expect(imgPhone).toHaveAttribute("alt", "phone");
});

test("It must execute the function 'handleDesktopMenuClose' when hovering over the root.", async () => {
  const { container, mockAppProvider } = renderComponent();

  // eslint-disable-next-line
  const sectionContainer = container.querySelector(
    ".hero_container"
  ) as HTMLElement;

  expect(sectionContainer).toBeInTheDocument();

  await user.hover(sectionContainer!);

  expect(mockAppProvider.handleDesktopMenuClose).toHaveBeenCalledTimes(1);
});
