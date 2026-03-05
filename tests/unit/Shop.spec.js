import { shallowMount } from "@vue/test-utils";
import Shop from "@/views/Shop.vue";

// Create stubs that render their default slot content so text is accessible
const slotStub = { template: "<div><slot /></div>" };

function renderShop() {
  return shallowMount(Shop, {
    global: {
      stubs: {
        "v-main": slotStub,
        "v-container": slotStub,
        "v-row": slotStub,
        "v-col": slotStub,
        "v-card": slotStub,
        "v-card-title": slotStub,
        "v-card-text": slotStub,
        "v-card-actions": slotStub,
        "v-btn": {
          props: ["to"],
          template: '<button :data-to="to"><slot /></button>',
        },
        "v-img": true,
        "v-icon": true,
      },
    },
  });
}

describe("Shop.vue", () => {
  it("renders the component", () => {
    const wrapper = renderShop();
    expect(wrapper.text()).toContain("Atomo Diagnostics HIV Testing Kit");
  });

  it("displays all four product titles", () => {
    const wrapper = renderShop();
    expect(wrapper.text()).toContain("Atomo Diagnostics HIV Testing Kit");
    expect(wrapper.text()).toContain("Bundle of Condoms");
    expect(wrapper.text()).toContain("2xPair Durex condoms");
    expect(wrapper.text()).toContain("Female Condom");
  });

  it("displays product prices", () => {
    const wrapper = renderShop();
    expect(wrapper.text()).toContain("$TBA");
    expect(wrapper.text()).toContain("$7");
    expect(wrapper.text()).toContain("$5");
    expect(wrapper.text()).toContain("$18.50");
  });

  it("renders Buy buttons for each product", () => {
    const wrapper = renderShop();
    const allText = wrapper.text();
    // There are 4 products each with a Buy button
    expect(allText.match(/Buy/g).length).toBe(4);
  });

  it("has a cart navigation button", () => {
    const wrapper = renderShop();
    const cartBtn = wrapper.find('button[data-to="/cart"]');
    expect(cartBtn.exists()).toBe(true);
  });
});
