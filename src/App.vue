<template>
  <div id="app">
    <v-app>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossorigin=""
        />
      </head>

      <v-app-bar>
        <router-link to="/"
          ><img
            height="40px"
            width="40px"
            :src="require('@/assets/icons/logo.svg')"
            alt="logo"
          />
        </router-link>

        <v-spacer></v-spacer>
        <v-btn variant="text" to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn variant="text" to="/about">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <v-btn variant="text" to="/quiz">
          <v-icon>mdi-comment-question</v-icon>
        </v-btn>
        <v-btn variant="text" to="/shop">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-app-bar>
      <!--for different router view-->
      <v-main>
        <router-view />
      </v-main>

      <!--footer-->
      <v-footer class="bg-blue-darken-2">
        <v-row align="center">
          <v-col cols="12">
            <div class="text-white ml-3">
              Made with
              <v-icon class="text-red">mdi-fire</v-icon>
              by
              <a class="text-white" href="https://vuetifyjs.com" target="_blank"
                >OneDrop</a
              >
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-white text-caption ml-3 hackathon-disclaimer">
              ⚠️ This is a hackathon project. All information displayed is for
              hackathon purposes only and is not an actual product.
            </div>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
