import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import About from "@/views/About.vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({ components, directives });

function renderAbout() {
  return render(About, {
    global: {
      plugins: [vuetify],
      stubs: {
        "v-parallax": {
          template: "<div><slot /></div>",
        },
      },
    },
  });
}

describe("About.vue", () => {
  it("renders the main heading", () => {
    renderAbout();
    expect(
      screen.getByText("Why it is important to get tested"),
    ).toBeInTheDocument();
  });

  it("renders the page title", () => {
    renderAbout();
    expect(screen.getByText("Why get tested for HIV")).toBeInTheDocument();
  });

  it("renders the importance of testing section", () => {
    renderAbout();
    expect(screen.getByText("GETTING TESTED FOR HIV")).toBeInTheDocument();
  });

  it("renders key educational sections", () => {
    renderAbout();
    expect(screen.getByText("REGULARITY IS KEY")).toBeInTheDocument();
    expect(
      screen.getByText("UNDERSTANDING HIV RAPID TESTING"),
    ).toBeInTheDocument();
    expect(screen.getByText("HIV SELF-TESTING")).toBeInTheDocument();
    expect(screen.getByText("WHERE TO TEST")).toBeInTheDocument();
    expect(screen.getByText("SIGNS & SYMPTOMS")).toBeInTheDocument();
  });

  it("contains external resource links", () => {
    renderAbout();
    const dramaLink = screen.getByText("Drama Downunder");
    expect(dramaLink).toHaveAttribute(
      "href",
      "http://www.thedramadownunder.info/clinics/",
    );

    const endingHivLink = screen.getByText("Ending HIV");
    expect(endingHivLink).toHaveAttribute("href", "http://endinghiv.org.au/");

    const timeToTestLink = screen.getByText("Time to Test");
    expect(timeToTestLink).toHaveAttribute(
      "href",
      "http://www.timetotest.org.au/",
    );
  });
});
