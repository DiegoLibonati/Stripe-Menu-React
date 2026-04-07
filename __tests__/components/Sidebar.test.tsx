import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX } from "react";

import Sidebar from "@/components/Sidebar/Sidebar";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

import { useStripeContext } from "@/hooks/useStripeContext";

import { mockSubLinks } from "@tests/__mocks__/subLinks.mock";

interface RenderComponent {
  container: HTMLElement;
}

const OpenButton = (): JSX.Element => {
  const { handleMobileMenuOpen } = useStripeContext();
  return (
    <button data-testid="open-sidebar" onClick={handleMobileMenuOpen}>
      Open
    </button>
  );
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <OpenButton />
      <Sidebar />
    </StripeProvider>
  );
  return { container };
};

describe("Sidebar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not be visible initially", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLDivElement>(".sidebar-wrapper")).not.toHaveClass(
      "sidebar-wrapper--show"
    );
  });

  it("should render the navigation dialog", () => {
    renderComponent();
    expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument();
  });

  it("should render the close button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toBeInTheDocument();
  });

  it("should render all navigation categories", () => {
    renderComponent();
    mockSubLinks.forEach(({ page }) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    });
  });

  it("should render all navigation links", () => {
    renderComponent();
    mockSubLinks.forEach(({ links }) => {
      links.forEach(({ label }) => {
        expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
      });
    });
  });

  it("should become visible when mobile menu is opened", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();
    await user.click(screen.getByTestId("open-sidebar"));
    expect(container.querySelector<HTMLDivElement>(".sidebar-wrapper")).toHaveClass(
      "sidebar-wrapper--show"
    );
  });

  it("should become hidden when close button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();
    await user.click(screen.getByTestId("open-sidebar"));
    await user.click(screen.getByRole("button", { name: "Close navigation menu" }));
    expect(container.querySelector<HTMLDivElement>(".sidebar-wrapper")).not.toHaveClass(
      "sidebar-wrapper--show"
    );
  });
});
