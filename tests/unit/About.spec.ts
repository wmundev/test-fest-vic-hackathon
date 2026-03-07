import { render, screen } from "@testing-library/vue";
import About from "@/views/About.vue";

describe("About.vue", () => {
  it("renders the main heading", () => {
    render(About);
    expect(
      screen.getByText("Why it is important to get tested"),
    ).toBeInTheDocument();
  });

  it("renders the page title", () => {
    render(About);
    expect(screen.getByText("Why get tested for HIV")).toBeInTheDocument();
  });

  it("renders the importance of testing section", () => {
    render(About);
    expect(screen.getByText("GETTING TESTED FOR HIV")).toBeInTheDocument();
  });

  it("renders key educational sections", () => {
    render(About);
    expect(screen.getByText("REGULARITY IS KEY")).toBeInTheDocument();
    expect(
      screen.getByText("UNDERSTANDING HIV RAPID TESTING"),
    ).toBeInTheDocument();
    expect(screen.getByText("HIV SELF-TESTING")).toBeInTheDocument();
    expect(screen.getByText("WHERE TO TEST")).toBeInTheDocument();
    expect(screen.getByText("SIGNS & SYMPTOMS")).toBeInTheDocument();
  });

  it("contains external resource links", () => {
    render(About);
    const dramaLink = screen.getByRole("link", { name: "Drama Downunder" });
    expect(dramaLink).toHaveAttribute(
      "href",
      "http://www.thedramadownunder.info/clinics/",
    );

    const endingHivLink = screen.getByRole("link", { name: "Ending HIV" });
    expect(endingHivLink).toHaveAttribute("href", "http://endinghiv.org.au/");

    const timeToTestLink = screen.getByRole("link", { name: "Time to Test" });
    expect(timeToTestLink).toHaveAttribute(
      "href",
      "http://www.timetotest.org.au/",
    );
  });
});
