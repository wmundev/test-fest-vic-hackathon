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
    expect(screen.getByText("2xPair Durex condoms")).toBeInTheDocument();
    expect(screen.getByText("Female Condom")).toBeInTheDocument();
  });

  it("displays product prices", () => {
    render(Shop);
    expect(screen.getByText("$TBA")).toBeInTheDocument();
    expect(screen.getByText("$7")).toBeInTheDocument();
    expect(screen.getByText("$5")).toBeInTheDocument();
    expect(screen.getByText("$18.50")).toBeInTheDocument();
  });

  it("renders Buy buttons for each product", () => {
    render(Shop);
    const buyButtons = screen.getAllByText("Buy");
    expect(buyButtons.length).toBe(4);
  });

  it("has a cart navigation button", () => {
    const { container } = render(Shop);
    // The cart button uses v-btn with to="/cart", rendered as a custom element
    // Since Vuetify is not installed in tests, v-btn renders as a custom element
    // with the to attribute preserved
    const cartBtn = container.querySelector('[to="/cart"]');
    expect(cartBtn).not.toBeNull();
  });
});
