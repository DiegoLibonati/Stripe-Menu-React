import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import Navbar from "@/components/Navbar/Navbar";
import Submenu from "@/components/Submenu/Submenu";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

jest.mock("@/constants/subLinks", () => {
  const { mockSubLinks } = jest.requireActual("@tests/__mocks__/subLinks.mock");
  return { __esModule: true, default: mockSubLinks };
});

const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <StripeProvider>{children}</StripeProvider>
);

const renderComponent = (): RenderResult => render(<Submenu />, { wrapper });

const renderWithNavbar = (): RenderResult =>
  render(
    <StripeProvider>
      <Navbar />
      <Submenu />
    </StripeProvider>
  );

describe("Submenu", () => {
  describe("rendering", () => {
    it("should render the submenu without the show class initially", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>(".submenu")).not.toHaveClass("submenu--show");
    });

    it("should render with left style set to 0px via useEffect", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>(".submenu")).toHaveStyle({ left: "0px" });
    });

    it("should render an empty title initially", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLHeadingElement>(".submenu__title")?.textContent).toBe("");
    });

    it("should render no links initially", () => {
      renderComponent();
      expect(screen.queryAllByRole("link")).toHaveLength(0);
    });
  });

  describe("rendering with desktop menu open", () => {
    it("should apply the show class when the desktop menu is open", async () => {
      const user = userEvent.setup();
      const { container } = renderWithNavbar();
      await user.hover(screen.getByRole("button", { name: "Open Products menu" }));
      expect(container.querySelector<HTMLElement>(".submenu")).toHaveClass("submenu--show");
    });

    it("should render the Products title and links", async () => {
      const user = userEvent.setup();
      const { container } = renderWithNavbar();
      await user.hover(screen.getByRole("button", { name: "Open Products menu" }));
      expect(container.querySelector<HTMLHeadingElement>(".submenu__title")?.textContent).toBe(
        "Products"
      );
      expect(screen.getByRole("link", { name: "payment" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "terminal" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "connect" })).toBeInTheDocument();
    });

    it("should render the Developers title and links", async () => {
      const user = userEvent.setup();
      const { container } = renderWithNavbar();
      await user.hover(screen.getByRole("button", { name: "Open Developers menu" }));
      expect(container.querySelector<HTMLHeadingElement>(".submenu__title")?.textContent).toBe(
        "Developers"
      );
      expect(screen.getByRole("link", { name: "plugins" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "libraries" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "help" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "billing" })).toBeInTheDocument();
    });

    it("should render the Company title and links", async () => {
      const user = userEvent.setup();
      const { container } = renderWithNavbar();
      await user.hover(screen.getByRole("button", { name: "Open Company menu" }));
      expect(container.querySelector<HTMLHeadingElement>(".submenu__title")?.textContent).toBe(
        "Company"
      );
      expect(screen.getByRole("link", { name: "about" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "customers" })).toBeInTheDocument();
    });

    it("should render links with the correct href", async () => {
      const user = userEvent.setup();
      renderWithNavbar();
      await user.hover(screen.getByRole("button", { name: "Open Products menu" }));
      expect(screen.getByRole("link", { name: "payment" })).toHaveAttribute("href", "/products");
    });
  });
});
