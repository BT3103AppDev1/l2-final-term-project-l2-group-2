<template>
  <div class="product-card">
    <img :src='product.image' :alt="product.name">
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <div class="price">${{ product.price.toFixed(2) }}</div>
    <div class="quantity">({{ product.quantity }})</div>
    <div class="sell-section">
      <input type="number" class="quantity-input" v-model="product.sellQuantity" min="1">
      <button @click="sellProduct(product.sellQuantity)">Sell</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  methods: {
    sellProduct(quantity) {
      // Method to handle selling the product
    }
  }
};
</script>

<style scoped>
.product-card {
  /* Styles for the product card */
  border: 1px solid #ddd;
  padding: 1rem;
  margin: 1rem;
  width: 250px;
  min-height: 50px;
  text-align: center;
}

.product-card .price {
  font-weight: bold;
}

.product-card .quantity {
  font-weight: bold;
}

.product-card img {
  width: 100%;
  /* Maintains the image width responsive to the card width */
  height: 150px;
  /* fixed height for all images */
  object-fit: contain;
  /* Ensures the whole image is visible */
  object-position: center;
  /* Centers the image within the element's box */

  background-color: white;
}

.product-card .quantity-input {
  width: 2em; /* Example fixed width, adjust as needed */
  margin-left: 0.5rem;
  margin-right: 0.5rem; /* Spacing between input and button */
  padding: 0.15rem 0.3rem; /* Padding inside the input */
}

.product-card button {
  background-color: #4CAF50; /* Change to your desired color */
  color: white; /* Adjust text color if needed */
  border: none; /* No border for a flat look */
  padding: 0.5rem 1rem; /* Add padding for spacing */
  border-radius: 4px; /* Rounded corners for a button */
  cursor: pointer; /* The hand cursor on hover */
  /* other styles */
}

.product-card button:hover {
  background-color: #367C39; /* Darker shade for hover effect */
}

</style>