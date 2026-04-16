import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        cart: resolve(__dirname, "pages/cart/cart.html"),
        login: resolve(__dirname, "pages/auth/login.html"),
        signup: resolve(__dirname, "pages/auth/signup.html"),
      },
    },
  },
});
