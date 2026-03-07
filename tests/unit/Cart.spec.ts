import { render, screen } from "@testing-library/vue";
import Cart from "@/views/Cart.vue";

describe("Cart.vue", () => {
  it("renders the component", () => {
    render(Cart);
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders all table headers", () => {
    render(Cart);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Calories")).toBeInTheDocument();
    expect(screen.getByText("Fat (g)")).toBeInTheDocument();
    expect(screen.getByText("Carbs (g)")).toBeInTheDocument();
    expect(screen.getByText("Protein (g)")).toBeInTheDocument();
    expect(screen.getByText("Iron (%)")).toBeInTheDocument();
  });

  it("has correct initial data with 6 column headers", () => {
    render(Cart);
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(6);
  });

  it("starts with an empty items list (no table body rows)", () => {
    const { container } = render(Cart);
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(0);
  });
});
