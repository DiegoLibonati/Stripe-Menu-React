import { render, screen } from "@testing-library/react";

import Hero from "@/components/Hero/Hero";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

interface RenderComponent {
  container: HTMLElement;
}

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <StripeProvider>
      <Hero />
    </StripeProvider>
  );
  return { container };
};

describe("Hero", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the hero section element", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>("section.hero")).toBeInTheDocument();
  });

  it("should render the main heading", () => {
    renderComponent();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("should render the Start now button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /start now/i })).toBeInTheDocument();
  });

  it("should render the phone image", () => {
    renderComponent();
    expect(screen.getByAltText("phone")).toBeInTheDocument();
  });
});
