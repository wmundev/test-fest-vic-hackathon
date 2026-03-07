<template>
  <div class="cart">
    <v-container class="cart__container" fluid>
      <h1 class="cart__title text-center text-h3 mb-10">Your Cart</h1>

      <v-row v-if="cartItems.length > 0" class="cart__content">
        <v-col cols="12" md="8" class="cart__items">
          <v-card
            v-for="(item, index) in cartItems"
            :key="index"
            class="cart-item rounded-xl elevation-2 mb-6"
          >
            <div class="d-flex flex-column flex-sm-row">
              <v-img
                :src="item.image"
                class="cart-item__image"
                width="150px"
                max-width="100%"
                height="150px"
                cover
              ></v-img>

              <div
                class="cart-item__details d-flex flex-column justify-center flex-grow-1 px-5 py-4"
              >
                <div class="d-flex justify-space-between align-start mb-2">
                  <h3 class="cart-item__title text-h6 font-weight-bold">
                    {{ item.title }}
                  </h3>
                  <v-btn
                    icon
                    variant="text"
                    color="red-lighten-1"
                    @click="removeFromCart(item)"
                    class="cart-item__remove"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>

                <h4
                  class="cart-item__price font-weight-black text-primary mb-4"
                >
                  {{ item.price }}
                </h4>

                <div class="cart-item__actions d-flex align-center">
                  <v-btn
                    icon
                    size="small"
                    variant="tonal"
                    color="primary"
                    @click="updateQuantity(item, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>

                  <span class="cart-item__quantity mx-4 text-h6">{{
                    item.quantity
                  }}</span>

                  <v-btn
                    icon
                    size="small"
                    variant="tonal"
                    color="primary"
                    @click="updateQuantity(item, item.quantity + 1)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="cart__summary">
          <v-card class="summary-card rounded-xl elevation-3 p-6 sticky-top">
            <v-card-title
              class="summary-card__title text-h5 font-weight-bold mb-4 pt-5 px-5"
            >
              Order Summary
            </v-card-title>

            <v-card-text class="px-5">
              <div class="d-flex justify-space-between mb-3 text-body-1">
                <span class="text-grey-darken-1">Items ({{ cartCount }})</span>
                <span class="font-weight-medium"
                  >${{ cartTotal.toFixed(2) }}</span
                >
              </div>
              <v-divider class="my-4"></v-divider>
              <div
                class="d-flex justify-space-between mb-5 text-h5 font-weight-black"
              >
                <span>Total</span>
                <span class="text-primary">${{ cartTotal.toFixed(2) }}</span>
              </div>
            </v-card-text>

            <v-card-actions class="px-5 pb-5">
              <v-btn
                class="summary-card__checkout text-none flex-grow-1 rounded-pill elevation-2"
                size="x-large"
              >
                Proceed to Checkout
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12" class="text-center py-16">
          <v-icon size="100" color="grey-lighten-2" class="mb-6"
            >mdi-cart-outline</v-icon
          >
          <h2 class="text-h4 text-grey-darken-1 mb-6">Your cart is empty</h2>
          <v-btn
            to="/shop"
            class="rounded-pill px-8"
            color="primary"
            size="large"
            elevation="2"
          >
            Continue Shopping
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCartStore } from "@/store/cart";

export default {
  name: "Cart",
  computed: {
    ...mapState(useCartStore, ["cartItems", "cartTotal", "cartCount"]),
  },
  methods: {
    ...mapActions(useCartStore, ["removeFromCart"]),
    updateQuantity(item, quantity) {
      if (quantity > 0) {
        useCartStore().updateQuantity(item, quantity);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
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
}

.cart-item {
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: white;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -8px rgba(99, 102, 241, 0.15) !important;
  }

  &__image {
    background-color: #f1f5f9;
  }

  &__title {
    color: #334155;
    line-height: 1.3;
    white-space: normal !important;
    word-break: break-word;
  }
}

.summary-card {
  position: sticky;
  top: 100px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: white;

  &__checkout {
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
