import { shallowMount } from "@vue/test-utils";
import About from "@/views/About.vue";

function renderAbout() {
  return shallowMount(About, {
    global: {
      stubs: {
        "v-parallax": {
          template: "<div><slot /></div>",
        },
        "v-row": { template: "<div><slot /></div>" },
        "v-col": { template: "<div><slot /></div>" },
      },
    },
  });
}

describe("About.vue", () => {
  it("renders the main heading", () => {
    const wrapper = renderAbout();
    expect(wrapper.text()).toContain("Why it is important to get tested");
  });

  it("renders the page title", () => {
    const wrapper = renderAbout();
    expect(wrapper.text()).toContain("Why get tested for HIV");
  });

  it("renders the importance of testing section", () => {
    const wrapper = renderAbout();
    expect(wrapper.text()).toContain("GETTING TESTED FOR HIV");
  });

  it("renders key educational sections", () => {
    const wrapper = renderAbout();
    expect(wrapper.text()).toContain("REGULARITY IS KEY");
    expect(wrapper.text()).toContain("UNDERSTANDING HIV RAPID TESTING");
    expect(wrapper.text()).toContain("HIV SELF-TESTING");
    expect(wrapper.text()).toContain("WHERE TO TEST");
    expect(wrapper.text()).toContain("SIGNS & SYMPTOMS");
  });

  it("contains external resource links", () => {
    const wrapper = renderAbout();
    const dramaLink = wrapper.find(
      'a[href="http://www.thedramadownunder.info/clinics/"]',
    );
    expect(dramaLink.exists()).toBe(true);
    expect(dramaLink.text()).toBe("Drama Downunder");

    const endingHivLink = wrapper.find(
      'a[href="http://endinghiv.org.au/"]',
    );
    expect(endingHivLink.exists()).toBe(true);
    expect(endingHivLink.text()).toBe("Ending HIV");

    const timeToTestLink = wrapper.find(
      'a[href="http://www.timetotest.org.au/"]',
    );
    expect(timeToTestLink.exists()).toBe(true);
    expect(timeToTestLink.text()).toBe("Time to Test");
  });
});
