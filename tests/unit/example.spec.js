import { render, screen } from "@testing-library/vue";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders welcome text", () => {
    render(HelloWorld);
    expect(screen.getByText("Welcome to Vuetify")).toBeInTheDocument();
  });
});
