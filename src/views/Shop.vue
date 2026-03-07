<template>
  <div class="shop">
    <v-container class="shop__container" fluid>
      <h1 class="shop__title text-center text-h3 mb-10">Premium Shop</h1>

      <v-row class="shop__grid">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(product, index) in products"
          :key="index"
        >
          <v-card class="product-card shop__product rounded-xl elevation-3">
            <div class="product-card__image-wrapper">
              <v-img
                :src="product.image"
                class="product-card__image align-end"
                height="280px"
                cover
              ></v-img>
            </div>

            <v-card-title
              class="product-card__title text-h6 font-weight-bold pt-5 px-5"
            >
              {{ product.title }}
            </v-card-title>

            <v-card-text
              class="product-card__price font-weight-black px-5 pb-2"
            >
              {{ product.price }}
            </v-card-text>

            <v-card-actions class="product-card__action px-5 pb-5">
              <v-btn
                class="product-card__button text-none flex-grow-1 rounded-pill elevation-2"
                size="large"
                @click="handleAddToCart(product)"
              >
                <v-icon left size="20" class="mr-2">mdi-cart-plus</v-icon>
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        class="shop__cart-btn position-fixed"
        to="/cart"
        icon="mdi-cart"
        color="primary"
        size="x-large"
        elevation="8"
      ></v-btn>

      <v-snackbar
        v-model="snackbar.show"
        :timeout="3000"
        color="success"
        elevation="10"
        location="bottom center"
        rounded="pill"
      >
        <div class="d-flex align-center">
          <v-icon left class="mr-3" size="24">mdi-check-circle</v-icon>
          <span class="text-body-1 font-weight-medium">{{
            snackbar.text
          }}</span>
        </div>

        <template v-slot:actions>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="white"
            @click="snackbar.show = false"
          ></v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import { useCartStore } from "@/store/cart";

export default {
  name: "Shop",
  data() {
    return {
      snackbar: {
        show: false,
        text: "",
      },
      products: [
        {
          title: "Atomo Diagnostics HIV Testing Kit",
          price: "$TBA",
          image: require("@/assets/atomo01.jpg"),
          link: null,
        },
        {
          title: "Bundle of Condoms",
          price: "$7",
          image: require("@/assets/condomBundle.jpg"),
          link: null,
        },
        {
          title: "2xPair Durex Condoms",
          price: "$5",
          image: require("@/assets/durex.jpeg"),
          link: "./BuyModel",
        },
        {
          title: "Female Condom",
          price: "$18.50",
          image: require("@/assets/femaleCondom.jpg"),
          link: null,
        },
      ],
    };
  },
  methods: {
    handleAddToCart(product) {
      useCartStore().addToCart(product);
      this.snackbar.text = `${product.title} added to cart!`;
      this.snackbar.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.shop {
  background-color: #f4f7fb;
  min-height: 100vh;
  padding-bottom: 100px;
  width: 100%;

  &__container {
    padding-top: 3rem;
    padding-bottom: 3rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  &__title {
    color: #1e293b;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(135deg, #1e293b 0%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__cart-btn {
    bottom: 32px;
    right: 32px;
    z-index: 100;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
    color: white !important;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
      transform: scale(1.15) rotate(-5deg);
    }
  }
}

.product-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: white;
  overflow: hidden;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 22px 44px -12px rgba(99, 102, 241, 0.25) !important;
  }

  &__image-wrapper {
    overflow: hidden;
    background-color: #f1f5f9;
  }

  &__image {
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);

    .product-card:hover & {
      transform: scale(1.08);
    }
  }

  &__title {
    font-size: 1.15rem;
    line-height: 1.4;
    color: #334155;
    min-height: 72px;
    display: flex;
    align-items: flex-start;
    word-break: break-word;
    white-space: normal !important;
  }

  &__price {
    font-size: 1.6rem;
    color: #6366f1;
  }

  &__action {
    width: 100%;
  }

  &__button {
    font-weight: 700;
    letter-spacing: 0.5px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
    color: white !important;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 8px 16px -4px rgba(99, 102, 241, 0.4) !important;
      transform: translateY(-2px);
    }
  }
}
</style>
