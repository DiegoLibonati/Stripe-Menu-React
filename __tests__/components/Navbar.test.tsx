import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import Navbar from "@/components/Navbar/Navbar";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

jest.mock("@/constants/subLinks", () => {
  const { mockSubLinks } = jest.requireActual("@tests/__mocks__/subLinks.mock");
  return { __esModule: true, default: mockSubLinks };
});

const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <StripeProvider>{children}</StripeProvider>
);

const renderComponent = (): RenderResult => render(<Navbar />, { wrapper });

describe("Navbar", () => {
  describe("rendering", () => {
    it("should render the header element", () => {
      renderComponent();
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should render the logo image", () => {
      renderComponent();
      expect(screen.getByRole("img", { name: "logo" })).toBeInTheDocument();
    });

    it("should render the hamburger button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Open navigation menu" })).toBeInTheDocument();
    });

    it("should render the hamburger button with aria-expanded false initially", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    });

    it("should render the hamburger button with aria-controls pointing to sidebar-nav", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
        "aria-controls",
        "sidebar-nav"
      );
    });

    it("should render a nav button for each subLink page", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Open Products menu" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Open Developers menu" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Open Company menu" })).toBeInTheDocument();
    });

    it("should render nav buttons with aria-haspopup true", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Open Products menu" })).toHaveAttribute(
        "aria-haspopup",
        "true"
      );
    });

    it("should render nav buttons with aria-expanded false initially", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Open Products menu" })).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    });

    it("should render the sign in button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should set aria-expanded to true on the hamburger button when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      const hamburger = screen.getByRole("button", { name: "Open navigation menu" });
      await user.click(hamburger);
      expect(hamburger).toHaveAttribute("aria-expanded", "true");
    });

    it("should set aria-expanded to true on the hovered nav button", async () => {
      const user = userEvent.setup();
      renderComponent();
      const productsBtn = screen.getByRole("button", { name: "Open Products menu" });
      await user.hover(productsBtn);
      expect(productsBtn).toHaveAttribute("aria-expanded", "true");
    });

    it("should keep aria-expanded false on non-active nav buttons", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.hover(screen.getByRole("button", { name: "Open Products menu" }));
      expect(screen.getByRole("button", { name: "Open Developers menu" })).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    });

    it("should close the desktop menu when hovering a non-nav element inside the header", async () => {
      const user = userEvent.setup();
      renderComponent();
      const productsBtn = screen.getByRole("button", { name: "Open Products menu" });
      await user.hover(productsBtn);
      expect(productsBtn).toHaveAttribute("aria-expanded", "true");
      await user.hover(screen.getByRole("button", { name: "Sign in" }));
      expect(productsBtn).toHaveAttribute("aria-expanded", "false");
    });
  });
});
