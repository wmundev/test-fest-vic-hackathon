import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
  }),
  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => {
        // Handle "TBA" and strings with "$"
        const priceStr = String(item.price).replace("$", "");
        const price = parseFloat(priceStr);
        return total + (isNaN(price) ? 0 : price * item.quantity);
      }, 0);
    },
    cartCount: (state) => {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
  },
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find(
        (item) => item.title === product.title,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(product) {
      const index = this.cart.findIndex((item) => item.title === product.title);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    },
    updateQuantity(product, quantity) {
      const existingProduct = this.cart.find(
        (item) => item.title === product.title,
      );
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },
    clearCart() {
      this.cart = [];
    },
  },
});
