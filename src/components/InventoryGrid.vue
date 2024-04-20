<template>
  <div class="inventory-grid" v-if="products.length > 0">
    <ProductCard
      v-for="product in products"
      :key="product.key"
      :product="product"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


export default {
  components: {
    ProductCard
  },
  data() {
  return {
    products: [],
    useremail: ''
  };
},
async mounted() {
  const auth = getAuth(firebaseApp); // Pass the firebaseApp to getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.useremail = user.email;
      this.fetchproducts(this.useremail);
    } else {
      this.useremail = '';
      this.products = [];
    }
  });
},
methods: {
  async fetchproducts(useremail) {
    try {
      console.log("Fetching data for user:", useremail);
      const q = query(collection(db, useremail), orderBy('Item', 'asc'));
      const querySnapshot = await getDocs(q);
      const items = [];

      // Iterate through each document in the query snapshot
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        console.log("Retrieved data for document", doc.id + ":", data);

        // Get the download URL of the image associated with the item
        const imageUrl = await getDownloadURL(ref(storage, data.ImageUrl));
        items.push({
          key: doc.id,
          name: data.Item,
          image: imageUrl,
          price: data.Price ? parseFloat(data.Price) : 0, // Default to 0 if price is missing
          quantity: data.Stock,
          description: data.Description,
        });
      };
      console.log("All items:", items);


      console.log("Items sorted by sales:", items);
      this.products = items;
    } catch (error) {
      console.error("Error fetching and updating data:", error);
    }
  },
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
