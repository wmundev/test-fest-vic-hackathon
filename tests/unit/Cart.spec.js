import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Cart from "@/views/Cart.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({ components, directives });

function renderCart() {
  return render(Cart, {
    global: {
      plugins: [vuetify],
      stubs: {
        "v-table": {
          template: "<table><slot /></table>",
        },
      },
    },
  });
}

describe("Cart.vue", () => {
  it("renders the component", () => {
    renderCart();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders all table headers", () => {
    renderCart();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Calories")).toBeInTheDocument();
    expect(screen.getByText("Fat (g)")).toBeInTheDocument();
    expect(screen.getByText("Carbs (g)")).toBeInTheDocument();
    expect(screen.getByText("Protein (g)")).toBeInTheDocument();
    expect(screen.getByText("Iron (%)")).toBeInTheDocument();
  });

  it("has correct initial data with headers", () => {
    const { container } = renderCart();
    const headers = container.querySelectorAll("th");
    expect(headers.length).toBe(6);
  });

  it("starts with an empty items list (no table body rows)", () => {
    const { container } = renderCart();
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(0);
  });
});
