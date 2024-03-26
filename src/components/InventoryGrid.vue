<template>
  <div class="inventory-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: [
        // Populate this array with product objects
         { id: 1, name: 'Black Ballpoint Pen', image: 'item1.jpg', price: 2.20, quantity: 60,sellQuantity: 1},
         { id: 2, name: 'Iphone 13 Pro Clear Case', image: 'item2.jpg', price: 4.00, quantity: 54,sellQuantity: 1},
         { id: 3, name: 'Lays Potato Chips Classic 170g', image: 'item3.jpg', price: 6.20, quantity: 43,sellQuantity: 1},
         { id: 4, name: 'Self Made brown Card Holder', image: 'item4.jpg', price: 7.00, quantity: 32,sellQuantity: 1},
         { id: 5, name: 'PaperOne Copier Paper A4', image: 'item5.jpg', price: 4.20, quantity: 15,sellQuantity: 1},
         { id: 6, name: 'Totoro Brown wallet', image: 'item6.jpg', price: 22.00, quantity: 8,sellQuantity: 1},
         { id: 7, name: 'Self Made Bracelet B/W', image: 'item7.jpg', price: 12.00, quantity: 5,sellQuantity: 1},
         { id: 8, name: 'The Gruffalo', image: 'item8.jpg', price: 15.00, quantity: 1,sellQuantity: 1},
         
        // ...
      ]
    };
  }
};
</script>

<style scoped>
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr)); /* Adjust the minmax values based on your design */
  grid-gap: 1rem; /* Adjust spacing between cards */
}
</style>
