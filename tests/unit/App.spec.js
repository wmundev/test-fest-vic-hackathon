import { render, screen } from "@testing-library/vue";
import App from "@/App.vue";

const stubs = {
  RouterLink: { template: "<a><slot /></a>" },
  RouterView: { template: "<div />" },
  VAppBar: { template: "<div><slot /></div>" },
  VFooter: { template: "<footer><slot /></footer>" },
};

describe("App.vue footer", () => {
  it("renders the hackathon disclaimer in the footer", () => {
    render(App, { global: { stubs } });
    expect(
      screen.getByText(/hackathon purposes only/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/not an actual product/i),
    ).toBeInTheDocument();
  });

  it("disclaimer element has the hackathon-disclaimer class", () => {
    render(App, { global: { stubs } });
    const disclaimer = document.querySelector(".hackathon-disclaimer");
    expect(disclaimer).not.toBeNull();
    expect(disclaimer.textContent).toMatch(/hackathon/i);
  });
});
