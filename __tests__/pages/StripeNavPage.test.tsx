import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import StripeNavPage from "@/pages/StripeNavPage/StripeNavPage";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

jest.mock("@/constants/subLinks", () => {
  const { mockSubLinks } = jest.requireActual("@tests/__mocks__/subLinks.mock");
  return { __esModule: true, default: mockSubLinks };
});

const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <StripeProvider>{children}</StripeProvider>
);

const renderPage = (): RenderResult => render(<StripeNavPage />, { wrapper });

describe("StripeNavPage", () => {
  describe("rendering", () => {
    it("should render the navbar", () => {
      renderPage();
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("should render the submenu as closed initially", () => {
      const { container } = renderPage();
      expect(container.querySelector<HTMLElement>(".submenu")).not.toHaveClass("submenu--show");
    });

    it("should render the sidebar as closed initially", () => {
      const { container } = renderPage();
      expect(container.querySelector<HTMLDivElement>(".sidebar-wrapper")).not.toHaveClass(
        "sidebar-wrapper--show"
      );
    });

    it("should render the hero section heading", () => {
      renderPage();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("should render the navigation dialog", () => {
      renderPage();
      expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should open the sidebar when the hamburger button is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      expect(container.querySelector<HTMLDivElement>(".sidebar-wrapper")).toHaveClass(
        "sidebar-wrapper--show"
      );
    });

    it("should close the sidebar when the close button is clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      await user.click(screen.getByRole("button", { name: "Close navigation menu" }));
      expect(container.querySelector<HTMLDivElement>(".sidebar-wrapper")).not.toHaveClass(
        "sidebar-wrapper--show"
      );
    });

    it("should open the submenu when a nav button is hovered", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      await user.hover(screen.getByRole("button", { name: "Open Products menu" }));
      expect(container.querySelector<HTMLElement>(".submenu")).toHaveClass("submenu--show");
    });

    it("should close the submenu when the hero section is hovered", async () => {
      const user = userEvent.setup();
      const { container } = renderPage();
      await user.hover(screen.getByRole("button", { name: "Open Products menu" }));
      expect(container.querySelector<HTMLElement>(".submenu")).toHaveClass("submenu--show");
      await user.hover(container.querySelector<HTMLElement>(".hero")!);
      expect(container.querySelector<HTMLElement>(".submenu")).not.toHaveClass("submenu--show");
    });
  });
});
