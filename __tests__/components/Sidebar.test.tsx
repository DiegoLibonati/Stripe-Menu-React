import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

jest.mock("@/constants/subLinks", () => {
  const { mockSubLinks } = jest.requireActual("@tests/__mocks__/subLinks.mock");
  return { __esModule: true, default: mockSubLinks };
});

const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <StripeProvider>{children}</StripeProvider>
);

const renderComponent = (): RenderResult => render(<Sidebar />, { wrapper });

const renderWithNavbar = (): RenderResult =>
  render(
    <StripeProvider>
      <Navbar />
      <Sidebar />
    </StripeProvider>
  );

describe("Sidebar", () => {
  describe("rendering", () => {
    it("should render the sidebar wrapper without the show class initially", () => {
      const { container } = renderComponent();
      const sidebarWrapper = container.querySelector<HTMLDivElement>(".sidebar-wrapper");
      expect(sidebarWrapper).toBeInTheDocument();
      expect(sidebarWrapper).not.toHaveClass("sidebar-wrapper--show");
    });

    it("should render the navigation dialog", () => {
      renderComponent();
      expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument();
    });

    it("should render the close button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Close navigation menu" })).toBeInTheDocument();
    });

    it("should render a heading for each page section", () => {
      renderComponent();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Developers")).toBeInTheDocument();
      expect(screen.getByText("Company")).toBeInTheDocument();
    });

    it("should render all products links", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "payment" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "terminal" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "connect" })).toBeInTheDocument();
    });

    it("should render all developers links", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "plugins" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "libraries" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "help" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "billing" })).toBeInTheDocument();
    });

    it("should render all company links", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "about" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "customers" })).toBeInTheDocument();
    });

    it("should render links with the correct href", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "payment" })).toHaveAttribute("href", "/products");
    });
  });

  describe("behavior", () => {
    it("should show the sidebar when the hamburger button is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderWithNavbar();
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      expect(container.querySelector<HTMLDivElement>(".sidebar-wrapper")).toHaveClass(
        "sidebar-wrapper--show"
      );
    });

    it("should hide the sidebar when the close button is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderWithNavbar();
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      await user.click(screen.getByRole("button", { name: "Close navigation menu" }));
      expect(container.querySelector<HTMLDivElement>(".sidebar-wrapper")).not.toHaveClass(
        "sidebar-wrapper--show"
      );
    });
  });
});
