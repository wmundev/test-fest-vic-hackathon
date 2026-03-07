import { render, screen } from "@testing-library/vue";
import Shop from "@/views/Shop.vue";

describe("Shop.vue", () => {
  it("renders the component", () => {
    render(Shop);
    expect(
      screen.getByText("Atomo Diagnostics HIV Testing Kit"),
    ).toBeInTheDocument();
  });

  it("displays all four product titles", () => {
    render(Shop);
    expect(
      screen.getByText("Atomo Diagnostics HIV Testing Kit"),
    ).toBeInTheDocument();
    expect(screen.getByText("Bundle of Condoms")).toBeInTheDocument();
    expect(screen.getByText("2xPair Durex Condoms")).toBeInTheDocument();
    expect(screen.getByText("Female Condom")).toBeInTheDocument();
  });

  it("displays product prices", () => {
    render(Shop);
    expect(screen.getByText("$TBA")).toBeInTheDocument();
    expect(screen.getByText("$7")).toBeInTheDocument();
    expect(screen.getByText("$5")).toBeInTheDocument();
    expect(screen.getByText("$18.50")).toBeInTheDocument();
  });

  it("renders Add to Cart buttons for each product", () => {
    render(Shop);
    const addToCartButtons = screen.getAllByText("Add to Cart");
    expect(addToCartButtons.length).toBe(4);
  });
});
