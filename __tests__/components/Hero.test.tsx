import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import Hero from "@/components/Hero/Hero";
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

const renderComponent = (): RenderResult => render(<Hero />, { wrapper });

const renderWithAll = (): RenderResult =>
  render(
    <StripeProvider>
      <Navbar />
      <Submenu />
      <Hero />
    </StripeProvider>
  );

describe("Hero", () => {
  describe("rendering", () => {
    it("should render the hero section", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>(".hero")).toBeInTheDocument();
    });

    it("should render the page heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("should render the title text", () => {
      renderComponent();
      expect(screen.getByText(/Payments infrastructure/i)).toBeInTheDocument();
    });

    it("should render the description text", () => {
      renderComponent();
      expect(screen.getByText(/Millions of companies/i)).toBeInTheDocument();
    });

    it("should render the start now button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Start now" })).toBeInTheDocument();
    });

    it("should render the phone image", () => {
      renderComponent();
      expect(screen.getByRole("img", { name: "phone" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should close the desktop menu when the section is hovered", async () => {
      const user = userEvent.setup();
      const { container } = renderWithAll();
      await user.hover(screen.getByRole("button", { name: "Open Products menu" }));
      expect(container.querySelector<HTMLElement>(".submenu")).toHaveClass("submenu--show");
      await user.hover(container.querySelector<HTMLElement>(".hero")!);
      expect(container.querySelector<HTMLElement>(".submenu")).not.toHaveClass("submenu--show");
    });
  });
});
