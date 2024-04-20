<template>
  <div class="inventory-grid">
    <ProductCard
      v-for="product in products"
      :key="product.name"
      :product="product"
    />
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import ccxt from 'ccxt';
import { getAuth } from 'firebase/auth';
import ProductCard from './ProductCard.vue';

const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      useremail: '',
      products: [],
    };
  },

  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
    console.log('User Email:', this.useremail);
    await this.fetchAndUpdateData(this.useremail);
  },
  
  methods: {
    async fetchAndUpdateData(useremail) {
      console.log('Fetching data for:', useremail);
      let allDocuments = await getDocs(collection(db, String(useremail)));
      console.log('All Documents:', allDocuments.docs);

      this.products = await Promise.all(
        allDocuments.docs.map(async (doc) => {
          console.log('Document Data:', doc.data());

          let documentData = doc.data();

          let name = documentData.Item;
          let description = documentData.Description;
          let price = documentData.Price;
          let quantity = documentData.Stock; //quantity will equal stock, stock changes when I sell

          return {
            name,
            description,
            price,
            quantity,
          };
        }),
      );
      console.log('Updated Products:', this.products);
    },
  },

  components: {
    ProductCard
  },
};
</script>

<style scoped>
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr)); /* Adjust the minmax values based on your design */
  grid-gap: 1rem; /* Adjust spacing between cards */
}
</style>
