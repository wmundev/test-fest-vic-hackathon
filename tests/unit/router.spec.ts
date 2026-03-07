import router from "@/router";

describe("router", () => {
  it("has all expected routes", () => {
    const routeNames = router.getRoutes().map((route) => route.name);
    expect(routeNames).toContain("Home");
    expect(routeNames).toContain("About");
    expect(routeNames).toContain("Quiz");
    expect(routeNames).toContain("Shop");
    expect(routeNames).toContain("Cart");
  });

  it("has 5 routes total", () => {
    expect(router.getRoutes().length).toBe(5);
  });

  it("maps correct paths to route names", () => {
    const routes = router.getRoutes();
    const routeMap: Record<string, string> = {};
    routes.forEach((r) => {
      routeMap[r.name] = r.path;
    });

    expect(routeMap["Home"]).toBe("/");
    expect(routeMap["About"]).toBe("/about");
    expect(routeMap["Quiz"]).toBe("/quiz");
    expect(routeMap["Shop"]).toBe("/shop");
    expect(routeMap["Cart"]).toBe("/cart");
  });

  it("uses lazy-loaded components for all routes", () => {
    const routes = router.getRoutes();
    routes.forEach((route) => {
      // All route components are dynamically imported (lazy-loaded)
      expect(typeof route.components.default).toBe("function");
    });
  });
});
