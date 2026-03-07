import { render, screen } from "@testing-library/vue";
import Cart from "@/views/Cart.vue";

describe("Cart.vue", () => {
  it("renders the page title", () => {
    render(Cart);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  it("shows empty cart message when there are no items", () => {
    render(Cart);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("renders a Continue Shopping button when cart is empty", () => {
    render(Cart);
    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
  });
});
