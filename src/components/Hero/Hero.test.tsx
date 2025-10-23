import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import Hero from "@src/components/Hero/Hero";

import { useStripeContext } from "@src/hooks/useStripeContext";

import { StripeProvider } from "@src/contexts/StripeContext/StripeContext";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <Hero />
    </StripeProvider>
  );

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useStripeContext", () => ({
  useStripeContext: jest.fn(),
}));

describe("Hero.tsx", () => {
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
      const { container } = renderComponent();

      const sectionContainer = container.querySelector<HTMLElement>(".hero");

      expect(sectionContainer).toBeInTheDocument();

      await user.hover(sectionContainer!);

      expect(handleDesktopMenuClose).toHaveBeenCalledTimes(1);
    });
  });
});
