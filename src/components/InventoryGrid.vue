<template>
  <div class="inventory-grid" v-if="products.length > 0">
    <div v-for="product in products" :key="product.key" class="product-card">
      <img :src="product.image" :alt="product.name">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="price">${{ product.price.toFixed(2) }}</div>
      <div class="quantity">Current Stock: {{ product.quantity }}</div>
      <div class="quantity">LifeTime Stock: {{ product.lifetime_quantity }}</div>
      <div class="sell-section">
        <input type="number" class="quantity-input" v-model="product.sellQuantity" min="1">
        <button @click="sellProduct(product.name, product.sellQuantity, useremail)">Sell</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, query, orderBy, doc, getDoc, updateDoc, getFirestore} from "firebase/firestore";

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default {
  data() {
    return {
      products: [],
      useremail: ''
    };
  },
  async mounted() {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = user.email;
        this.fetchProducts(this.useremail);
      } else {
        this.useremail = '';
        this.products = [];
      }
    });
  },
  methods: {
    async fetchProducts(useremail) {
      try {
        const q = query(collection(db, useremail), orderBy('Item', 'asc'));
        const querySnapshot = await getDocs(q);
        const items = [];
  
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, data.ImageUrl));
          items.push({
            key: doc.id,
            name: data.Item,
            image: imageUrl,
            price: data.Price ? parseFloat(data.Price) : 0,
            quantity: data.Stock,
            lifetime_quantity: data.LifetimeQuantity,
            description: data.Description,
            sellQuantity: 1 // Default sell quantity
          });
        };
  
        this.products = items;
      } catch (error) {
        console.error("Error fetching and updating data:", error);
      }
    },
    async sellProduct(productName, sellqty, user) {
      console.log("Selling", sellqty, "units of", productName);
      let item = productName
        const itemRef = doc(db, String(this.useremail), item);
        try {
        const docSnap = await getDoc(itemRef);
        if (docSnap.exists()) {
            // Item exists in the database, update stock
            let currentStock = parseInt(docSnap.data().Stock, 10);
            let currentSales = parseInt(docSnap.data().Quantitysold, 10);
            sellqty = parseInt(sellqty, 10);

            let updateData = {
                Stock: currentStock - sellqty,// Update stock by subtracting sellqty
                Quantitysold: currentSales + sellqty,
            };

            await updateDoc(itemRef, updateData);
            alert("Item sold successfully!");
            this.$emit("updated"); // Emit event to notify parent component of the update
        } else {
            // Item does not exist in the database
            alert("Item not found in the database.");
        }
        } catch (error) {
        console.error("Error updating document: ", error);
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
}

.product-card button:hover {
  background-color: #367C39; /* Darker shade for hover effect */
}
</style>
