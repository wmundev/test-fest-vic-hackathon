import "@testing-library/jest-dom/vitest";
import { config } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Make CSS custom properties available in jsdom (Vuetify relies on them)
window.CSS = window.CSS || {};
window.CSS.supports = window.CSS.supports || (() => false);

// ResizeObserver is used internally by Vuetify but not implemented in jsdom
global.ResizeObserver = global.ResizeObserver || class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const vuetify = createVuetify({ components, directives });

// @testing-library/vue delegates to @vue/test-utils mount().
// config.global is the VTU-level default applied to every mount() call,
// so every render() in every spec automatically has Vuetify registered.
config.global.plugins = [vuetify];

// VMain and VParallax require VApp's layout provider context which is not
// available when mounting a single component in isolation. Stubbing them with
// simple pass-through wrappers lets the quiz card content render correctly.
config.global.stubs = {
  VMain: { template: "<div><slot /></div>" },
  VParallax: { template: "<div><slot /></div>" },
};

