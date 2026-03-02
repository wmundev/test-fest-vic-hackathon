import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders welcome text", () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.text()).toMatch("Welcome to Vuetify");
  });
});
