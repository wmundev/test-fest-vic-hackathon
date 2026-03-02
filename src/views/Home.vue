<template>
  <div class="home">
    <section>
      <v-parallax :src="require('@/assets/dark.jpg')">
        <v-row
          align="center"
          justify="center"
          class="text-white"
          style="height: 600px"
        >
          <v-col cols="12" class="text-center">
            <img
              :src="require('@/assets/icons/TranBg1.svg')"
              alt="Vuetify.js"
              height="200"
            />
            <h1 class="text-white mb-2 text-h4 text-center">
              Get tested for HIV for free!
            </h1>
            <div class="text-subtitle-1 mb-3 text-center"></div>

            <v-btn
              class="bg-blue-lighten-2 mt-5"
              dark
              size="large"
              to="/quiz"
              v-on:click="showQuizMethod"
              >Get started</v-btn
            >
          </v-col>
        </v-row>
      </v-parallax>
    </section>

    <section>
      <v-row class="my-5" justify="center">
        <v-col cols="12" sm="6" md="6" class="my-3">
          <h2 class="text-h5">HIV Testing Kit</h2>
          <span class="text-subtitle-1">Get a free HIV Testing Kit today!</span>
          <p>
            When you complete the quiz, you can get a free HIV testing kit
            delivered to your house or at any of our vending machine at
            convenient locations around Australia!
          </p>
        </v-col>
        <v-col cols="12" sm="6" md="6" class="my-3">
          <div id="map">
            <v-toolbar dense floating id="map-search">
              <v-text-field
                hide-details
                prepend-icon="mdi-magnify"
                single-line
              ></v-text-field>

              <v-btn icon>
                <v-icon>mdi-crosshairs-gps</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
          </div>
        </v-col>
      </v-row>
      <v-row class="my-5" justify="center">
        <v-col cols="12">
          <h1>Benefits of HIV Testing</h1>
        </v-col>
      </v-row>
      <v-row class="my-5" justify="center">
        <v-col cols="12">
          <v-container>
            <v-row align="center">
              <v-col cols="12" md="3">
                <v-card class="elevation-0" variant="flat" color="transparent">
                  <v-card-text class="text-center">
                    <v-icon size="x-large" class="text-blue-lighten-2"
                      >mdi-palette</v-icon
                    >
                  </v-card-text>
                  <v-card-title class="justify-center">
                    <div class="text-h5 text-center">Early detection</div>
                  </v-card-title>
                  <v-card-text
                    >Early detection is the key to slowing the spread of
                    HIV</v-card-text
                  >
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="elevation-0" variant="flat" color="transparent">
                  <v-card-text class="text-center">
                    <v-icon size="x-large" class="text-blue-lighten-2"
                      >mdi-flash</v-icon
                    >
                  </v-card-text>
                  <v-card-title class="justify-center">
                    <div class="text-h5">Less likely to transmit disease</div>
                  </v-card-title>
                  <v-card-text>
                    HIV positive people who KNOW their status are
                    <strong>less likely</strong>
                    to transmit the virus to someone else.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="elevation-0" variant="flat" color="transparent">
                  <v-card-text class="text-center">
                    <v-icon size="x-large" class="text-blue-lighten-2"
                      >mdi-wrench</v-icon
                    >
                  </v-card-text>
                  <v-card-title class="justify-center">
                    <div class="text-h5 text-center">Fight HIV</div>
                  </v-card-title>
                  <v-card-text>
                    Early detection allows for the HIV positive person to
                    receive anti-HIV medications to fight the HIV
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-card class="elevation-0" variant="flat" color="transparent">
                  <v-card-text class="text-center">
                    <v-icon size="x-large" class="text-blue-lighten-2"
                      >mdi-wrench</v-icon
                    >
                  </v-card-text>
                  <v-card-title class="justify-center">
                    <div class="text-h5 text-center">Longer-term survival</div>
                  </v-card-title>
                  <v-card-text
                    >Earlier treatment is the key to longer-term survival and
                    higher CD4 levels.</v-card-text
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </section>

    <section>
      <v-row justify="center" class="my-5">
        <v-col cols="12" sm="4">
          <v-card class="elevation-0" variant="flat" color="transparent">
            <v-card-title class="justify-center">
              <div class="text-h5">Company info</div>
            </v-card-title>
            <v-card-text>
              <p>
                We are a startup focus on providing essential HIV testing to at
                risk people living in Australia completely free!
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" offset-sm="1">
          <v-card class="elevation-0" variant="flat" color="transparent">
            <v-card-title class="justify-center">
              <div class="text-h5">Contact us</div>
            </v-card-title>
            <v-card-text></v-card-text>
            <v-list bg-color="transparent">
              <v-list-item prepend-icon="mdi-phone" class="text-blue-lighten-2">
                <v-list-item-title>1800 659 547</v-list-item-title>
              </v-list-item>
              <v-list-item
                prepend-icon="mdi-map-marker"
                class="text-blue-lighten-2"
              >
                <v-list-item-title
                  >Melbourne 3000, Victoria, Australia</v-list-item-title
                >
              </v-list-item>
              <v-list-item prepend-icon="mdi-email" class="text-blue-lighten-2">
                <v-list-item-title>ceo@onedrop.com</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  name: "Home",
  components: {},
  mounted: function () {
    let mymap = L.map("map").setView([-37.8001008, 144.95825360000003], 13);
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          process.env.VUE_APP_MAPBOX_ACCESS_TOKEN || "",
      },
    ).addTo(mymap);

    //add marker to map, peter institute
    L.marker([-37.800224, 144.958295]).addTo(mymap);
    //healthsmart chemist
    L.marker([-37.798817, 144.955548]).addTo(mymap);
    //melbourne central pharmacy
    L.marker([-37.809833, 144.963583]).addTo(mymap);

    L.circle([-37.8, 144.97], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(mymap);
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.bg-dark-img {
  width: inherit;
  height: inherit;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.bg-light-img {
  width: inherit;
  height: inherit;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 100;
}

#map {
  height: 600px;
  width: 1000px;
}

#map-search {
  z-index: 1000;
}

.darkness {
  filter: brightness(50%);
}
</style>
