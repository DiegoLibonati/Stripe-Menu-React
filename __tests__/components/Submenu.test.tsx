import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Submenu from "@/components/Submenu/Submenu";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

import { useStripeContext } from "@/hooks/useStripeContext";

import { mockSubLinks } from "@tests/__mocks__/subLinks.mock";

type RenderComponent = {
  container: HTMLElement;
};

const OpenDesktopMenuButton = ({ page }: { page: string }) => {
  const { handleDesktopMenuOpen } = useStripeContext();
  return (
    <button data-testid="open-submenu" onClick={() => handleDesktopMenuOpen(page, 0)}>
      Open
    </button>
  );
};

const renderComponent = (page = "Products"): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <OpenDesktopMenuButton page={page} />
      <Submenu />
    </StripeProvider>
  );
  return { container };
};

describe("Submenu", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not be visible initially", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>("aside.submenu")).not.toHaveClass("submenu--show");
  });

  it("should become visible when desktop menu is opened", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();
    await user.click(screen.getByTestId("open-submenu"));
    expect(container.querySelector<HTMLElement>("aside.submenu")).toHaveClass("submenu--show");
  });

  it("should display the page title when opened", async () => {
    const user = userEvent.setup();
    renderComponent("Products");
    await user.click(screen.getByTestId("open-submenu"));
    expect(screen.getByRole("heading", { name: "Products" })).toBeInTheDocument();
  });

  it("should display the links for the active page when opened", async () => {
    const user = userEvent.setup();
    renderComponent("Products");
    await user.click(screen.getByTestId("open-submenu"));
    const productsLinks = mockSubLinks.find((s) => s.page === "Products")!.links;
    productsLinks.forEach(({ label }) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });
  });

  it("should update links when a different page is opened", async () => {
    const user = userEvent.setup();
    renderComponent("Developers");
    await user.click(screen.getByTestId("open-submenu"));
    const developersLinks = mockSubLinks.find((s) => s.page === "Developers")!.links;
    developersLinks.forEach(({ label }) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });
  });
});
