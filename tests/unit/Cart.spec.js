import { shallowMount } from "@vue/test-utils";
import Cart from "@/views/Cart.vue";

// Create stubs that render their default slot content so text is accessible
const slotStub = { template: "<div><slot /></div>" };

function renderCart() {
  return shallowMount(Cart, {
    global: {
      stubs: {
        "v-container": slotStub,
        "v-row": slotStub,
        "v-col": slotStub,
        "v-table": {
          template: "<table><slot /></table>",
        },
      },
    },
  });
}

describe("Cart.vue", () => {
  it("renders the component", () => {
    const wrapper = renderCart();
    expect(wrapper.text()).toContain("Name");
  });

  it("renders all table headers", () => {
    const wrapper = renderCart();
    expect(wrapper.text()).toContain("Name");
    expect(wrapper.text()).toContain("Calories");
    expect(wrapper.text()).toContain("Fat (g)");
    expect(wrapper.text()).toContain("Carbs (g)");
    expect(wrapper.text()).toContain("Protein (g)");
    expect(wrapper.text()).toContain("Iron (%)");
  });

  it("has correct initial data with headers", () => {
    const wrapper = renderCart();
    const headers = wrapper.findAll("th");
    expect(headers.length).toBe(6);
  });

  it("starts with an empty items list (no table body rows)", () => {
    const wrapper = renderCart();
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(0);
  });
});
