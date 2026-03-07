<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="home__hero bg-primary text-white position-relative">
      <v-container class="home__hero-container py-16 py-md-24">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <img
              :src="require('@/assets/icons/TranBg1.svg')"
              alt="Logo"
              class="home__logo mb-6"
              height="160"
            />
            <h1 class="home__title text-h3 text-md-h2 font-weight-bold mb-6">
              Get tested for HIV for free!
            </h1>
            <p
              class="home__subtitle text-h6 text-md-h5 font-weight-light opacity-80 mb-10"
            >
              Take our quick quiz to find out your eligibility and get a free
              testing kit delivered to your door.
            </p>
            <v-btn
              class="home__cta bg-white text-primary px-8 text-button font-weight-bold elevation-4 rounded-pill"
              size="x-large"
              to="/quiz"
            >
              Get started
              <v-icon right class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Map Section -->
    <section class="home__section bg-surface py-16">
      <v-container>
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="5" class="mb-8 mb-md-0">
            <div class="home__content-wrapper pe-md-6">
              <v-chip
                class="mb-4 bg-primary text-white font-weight-bold border-0"
                size="small"
                elevation="0"
              >
                Accessible Testing
              </v-chip>
              <h2
                class="home__section-title text-h3 font-weight-bold mb-6 text-on-surface"
              >
                Free HIV Testing Kit
              </h2>
              <p class="home__text text-body-1 text-medium-emphasis mb-6">
                When you complete the quiz, you can get a free HIV testing kit
                delivered to your house or at any of our vending machines at
                convenient locations around Australia!
              </p>
              <v-list class="home__features bg-transparent pa-0" lines="one">
                <v-list-item class="px-0 mb-2 min-h-0">
                  <template v-slot:prepend>
                    <v-avatar
                      color="primary"
                      variant="tonal"
                      size="32"
                      class="mr-4"
                    >
                      <v-icon size="small">mdi-home-delivery</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-body-1 font-weight-medium"
                    >Home Delivery Available</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0 min-h-0">
                  <template v-slot:prepend>
                    <v-avatar
                      color="primary"
                      variant="tonal"
                      size="32"
                      class="mr-4"
                    >
                      <v-icon size="small">mdi-vending-machine</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-body-1 font-weight-medium"
                    >24/7 Vending Machines</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <v-col cols="12" md="7" lg="6">
            <v-card
              class="home__map-card elevation-6 rounded-xl overflow-hidden"
            >
              <div id="map" class="home__map">
                <v-toolbar
                  density="compact"
                  floating
                  class="home__map-search ma-4 elevation-4 rounded-lg bg-white"
                >
                  <v-text-field
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Search locations..."
                    single-line
                    variant="plain"
                    class="px-2"
                  ></v-text-field>
                  <v-divider vertical class="mx-2"></v-divider>
                  <v-btn icon color="primary" variant="text">
                    <v-icon>mdi-crosshairs-gps</v-icon>
                  </v-btn>
                </v-toolbar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Benefits Section -->
    <section class="home__section bg-grey-lighten-4 py-16">
      <v-container>
        <v-row class="mb-12" justify="center">
          <v-col cols="12" class="text-center">
            <h2
              class="home__section-title text-h3 font-weight-bold text-on-surface"
            >
              Benefits of HIV Testing
            </h2>
            <div class="home__divider mx-auto mt-4 rounded-pill"></div>
          </v-col>
        </v-row>
        <v-row>
          <!-- Card 1 -->
          <v-col cols="12" sm="6" lg="3">
            <v-card
              class="home__feature-card h-100 elevation-2 rounded-xl text-center pa-6 transition-all"
            >
              <v-avatar
                color="blue-lighten-5"
                size="80"
                class="mb-6 mx-auto home__feature-icon-wrapper"
              >
                <v-icon size="40" color="primary">mdi-palette</v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold mb-4">Early detection</h3>
              <p class="text-body-1 text-medium-emphasis mb-0">
                Early detection is the key to slowing the spread of HIV.
              </p>
            </v-card>
          </v-col>
          <!-- Card 2 -->
          <v-col cols="12" sm="6" lg="3">
            <v-card
              class="home__feature-card h-100 elevation-2 rounded-xl text-center pa-6 transition-all"
            >
              <v-avatar
                color="teal-lighten-5"
                size="80"
                class="mb-6 mx-auto home__feature-icon-wrapper"
              >
                <v-icon size="40" color="teal">mdi-flash</v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold mb-4">
                Less likely to transmit disease
              </h3>
              <p class="text-body-1 text-medium-emphasis mb-0">
                HIV positive people who KNOW their status are
                <strong>less likely</strong> to transmit the virus.
              </p>
            </v-card>
          </v-col>
          <!-- Card 3 -->
          <v-col cols="12" sm="6" lg="3">
            <v-card
              class="home__feature-card h-100 elevation-2 rounded-xl text-center pa-6 transition-all"
            >
              <v-avatar
                color="red-lighten-5"
                size="80"
                class="mb-6 mx-auto home__feature-icon-wrapper"
              >
                <v-icon size="40" color="red">mdi-wrench</v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold mb-4">Fight HIV</h3>
              <p class="text-body-1 text-medium-emphasis mb-0">
                Early detection allows the person to receive anti-HIV
                medications to fight the virus.
              </p>
            </v-card>
          </v-col>
          <!-- Card 4 -->
          <v-col cols="12" sm="6" lg="3">
            <v-card
              class="home__feature-card h-100 elevation-2 rounded-xl text-center pa-6 transition-all"
            >
              <v-avatar
                color="purple-lighten-5"
                size="80"
                class="mb-6 mx-auto home__feature-icon-wrapper"
              >
                <v-icon size="40" color="purple">mdi-heart-pulse</v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold mb-4">
                Longer-term survival
              </h3>
              <p class="text-body-1 text-medium-emphasis mb-0">
                Earlier treatment is the key to longer-term survival and higher
                CD4 levels.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Info Section -->
    <section class="home__section py-16">
      <v-container>
        <v-row justify="center" align="stretch">
          <v-col cols="12" md="5" class="d-flex">
            <v-card
              class="home__info-card w-100 elevation-0 bg-primary-lighten-5 rounded-xl pa-8 border"
            >
              <div class="d-flex align-center mb-6">
                <v-icon size="large" color="primary" class="mr-4"
                  >mdi-domain</v-icon
                >
                <h3 class="text-h5 font-weight-bold text-primary mb-0">
                  Company Info
                </h3>
              </div>
              <p class="text-body-1 text-medium-emphasis mb-0">
                We are a startup focused on providing essential HIV testing to
                at-risk people living in Australia completely free!
              </p>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            md="1"
            class="d-none d-md-flex align-center justify-center"
          >
            <v-divider vertical class="h-50 border-opacity-50"></v-divider>
          </v-col>
          <v-col cols="12" md="5" class="d-flex">
            <v-card
              class="home__contact-card w-100 elevation-0 bg-transparent rounded-xl pa-8"
            >
              <div class="d-flex align-center mb-6">
                <v-icon size="large" color="primary" class="mr-4"
                  >mdi-card-account-phone</v-icon
                >
                <h3 class="text-h5 font-weight-bold text-primary mb-0">
                  Contact Us
                </h3>
              </div>
              <v-list class="bg-transparent pa-0" lines="one">
                <v-list-item class="px-0 mb-3 min-h-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="mr-4">mdi-phone</v-icon>
                  </template>
                  <v-list-item-title class="text-body-1 font-weight-medium"
                    >1800 659 547</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0 mb-3 min-h-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="mr-4">mdi-map-marker</v-icon>
                  </template>
                  <v-list-item-title
                    class="text-body-1 font-weight-medium text-wrap"
                    >Melbourne 3000, Victoria, Australia</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0 min-h-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="mr-4">mdi-email</v-icon>
                  </template>
                  <v-list-item-title class="text-body-1 font-weight-medium"
                    >ceo@onedrop.com</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import L from "leaflet";

// Need to fix leaflet default icon issue when using webpack/vue-cli
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      mymap: null,
    };
  },
  mounted: function () {
    this.mymap = L.map("map").setView([-37.8001008, 144.95825360000003], 13);

    // We can use openstreetmap tiles directly, so mapbox token isn't strictly required
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.mymap);

    //add marker to map, peter institute
    L.marker([-37.800224, 144.958295]).addTo(this.mymap);
    //healthsmart chemist
    L.marker([-37.798817, 144.955548]).addTo(this.mymap);
    //melbourne central pharmacy
    L.marker([-37.809833, 144.963583]).addTo(this.mymap);

    L.circle([-37.8, 144.97], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(this.mymap);

    // Invalidate map size after a short delay to ensure it renders correctly in layout
    setTimeout(() => {
      if (this.mymap) {
        this.mymap.invalidateSize();
      }
    }, 100);
  },
  beforeUnmount() {
    if (this.mymap) {
      this.mymap.remove();
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__hero {
    background: linear-gradient(
      135deg,
      var(--v-theme-primary, #1867c0) 0%,
      #0d47a1 100%
    );
    overflow: hidden;

    // Subtle overlay pattern
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: radial-gradient(
        circle at 80% 20%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      );
      pointer-events: none;
    }
  }

  &__hero-container {
    position: relative;
    z-index: 1;
  }

  &__logo {
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  }

  &__cta {
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
    }
  }

  &__divider {
    height: 4px;
    width: 60px;
    background-color: var(--v-theme-primary, #1867c0);
  }

  &__map-card {
    height: 450px;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  &__map {
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  &__map-search {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    z-index: 1000 !important; // Must be above Leaflet elements
    // background: rgba(255, 255, 255, 0.95) !important;
    // backdrop-filter: blur(8px);
    width: auto !important; // override default toolbar width
  }

  &__feature-card {
    border: 1px solid rgba(0, 0, 0, 0.03);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08) !important;

      .home__feature-icon-wrapper {
        transform: scale(1.1);
      }
    }
  }

  &__feature-icon-wrapper {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  // Vuetify overrides to ensure layout works perfectly
  .min-h-0 {
    min-height: 0;
  }

  .transition-all {
    transition: all 0.3s ease;
  }
}
</style>
