app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /* html */
    `
    <h1>{{ title }}</h1>
      <img :src="image" />
      <p v-if="inventory">In Stock</p>
      <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{ shipping }}</p>
      <ul>
        <li v-for="detail in details ">{{detail}}</li>
      </ul>

      <div
        v-for="(variant, index) in variants"
        :key="variant.id"
        @mouseover="updateVariant(index)"
        class="color-circle"
        :style="{ backgroundColor: variant.color}"
      ></div>
      <button
        class="button"
        :class="{ disabledButton: !inStock }"
        :disabled="!inStock"
        @click="addToCart"
      >
        Add to Cart
      </button>
      <review-form @review-submitted="addReview"></review-form>
    `,
  data() {
    return {
      product: "Socks",
      brand: "MHS",
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 50,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.review.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
