import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "@/components/Navbar/Navbar";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

import { mockSubLinks } from "@tests/__mocks__/subLinks.mock";

interface RenderComponent {
  container: HTMLElement;
}

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <Navbar />
    </StripeProvider>
  );
  return { container };
};

describe("Navbar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a header element", () => {
    renderComponent();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the logo image", () => {
    renderComponent();
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("should render the mobile menu button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toBeInTheDocument();
  });

  it("should render the mobile menu button with aria-expanded false initially", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("should set aria-expanded true on mobile button after click", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("should render a nav button for each sublink category", () => {
    renderComponent();
    mockSubLinks.forEach((subLink) => {
      expect(screen.getByRole("button", { name: `Open ${subLink.page} menu` })).toBeInTheDocument();
    });
  });

  it("should render nav buttons with aria-haspopup", () => {
    renderComponent();
    mockSubLinks.forEach((subLink) => {
      expect(screen.getByRole("button", { name: `Open ${subLink.page} menu` })).toHaveAttribute(
        "aria-haspopup",
        "true"
      );
    });
  });

  it("should render nav buttons with aria-expanded false initially", () => {
    renderComponent();
    mockSubLinks.forEach((subLink) => {
      expect(screen.getByRole("button", { name: `Open ${subLink.page} menu` })).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    });
  });

  it("should set aria-expanded true on the hovered nav button", async () => {
    const user = userEvent.setup();
    renderComponent();
    const productsBtn = screen.getByRole("button", { name: "Open Products menu" });
    await user.hover(productsBtn);
    expect(productsBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("should keep aria-expanded false on non-hovered nav buttons", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.hover(screen.getByRole("button", { name: "Open Products menu" }));
    expect(screen.getByRole("button", { name: "Open Developers menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("should render the Sign in button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });
});
