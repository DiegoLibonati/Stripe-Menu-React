import { render, screen } from "@testing-library/react";

import StripePage from "@/pages/StripePage/StripePage";

import { StripeProvider } from "@/contexts/StripeContext/StripeProvider";

type RenderPage = {
  container: HTMLElement;
};

const renderPage = (): RenderPage => {
  const { container } = render(
    <StripeProvider>
      <StripePage />
    </StripeProvider>
  );
  return { container };
};

describe("StripePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the navbar", () => {
    renderPage();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the sidebar dialog", () => {
    renderPage();
    expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument();
  });

  it("should render the hero section", () => {
    const { container } = renderPage();
    expect(container.querySelector<HTMLElement>("section.hero")).toBeInTheDocument();
  });

  it("should render the submenu", () => {
    const { container } = renderPage();
    expect(container.querySelector<HTMLElement>("aside.submenu")).toBeInTheDocument();
  });
});
