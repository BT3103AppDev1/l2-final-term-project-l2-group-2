<template>
  <div class="sales-table">
    <h2>Low Stock Items</h2>
    <table class="center styled-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in lowStockItems" :key="index">
            <td>{{ item.name }}</td>
            <td class="stocks">{{ item.stock }}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "MyTable",
  data() {
    return {
      lowStockItems: [],
      useremail: ''
    };
  },
  async mounted() {
    const auth = getAuth(firebaseApp); // Pass the firebaseApp to getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = user.email;
        this.fetchAndUpdateData(this.useremail);
      } else {
        this.useremail = '';
        this.lowStockItems = [];
      }
    });
  },
  methods: {
    async fetchAndUpdateData(useremail) {
      try {
        console.log("Fetching data for user:", useremail);
        const q = query(collection(db, useremail), orderBy('Stock', 'asc'));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Retrieved data for document", doc.id + ":", data);
          items.push({
            key: doc.id,
            name: data.Item,
            stock: data.Stock
          });
        });
        console.log("All items:", items);

        // Filter items with stock less than 100
        const lowStockItems = items.filter(item => item.stock < 100);
        console.log("Low stock items:", lowStockItems);
        
        this.lowStockItems = lowStockItems;
      } catch (error) {
        console.error("Error fetching and updating data:", error);
      }
    }
  }
}
</script>

<style scoped>
/* Center align the table */
.center {
  margin: 0 auto;
}
.styled-table {
    border-collapse: collapse;
    margin: 25px auto;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #cf4747;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #cf4747;
}

.stocks {
    background-color: #e99d9d;
}
</style>