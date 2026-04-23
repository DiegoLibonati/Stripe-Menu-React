import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import Hero from "@/components/Hero/Hero";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
  <StripeProvider>{children}</StripeProvider>
);

const renderComponent = (): RenderResult => render(<Hero />, { wrapper });

describe("Hero", () => {
  describe("rendering", () => {
    it("should render the hero section", () => {
      const { container } = renderComponent();
      expect(container.querySelector(".hero")).toBeInTheDocument();
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
    it("should call handleDesktopMenuClose when the section is hovered", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const section = container.querySelector<HTMLElement>(".hero");
      await user.hover(section!);
      expect(section).toBeInTheDocument();
    });
  });
});
