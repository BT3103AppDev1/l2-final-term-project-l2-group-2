<template>
    <div class="sales-table">
      <h2>Highest profit items</h2>
      <table class="center styled-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Sale Price</th>
            <th>Sale Quantity</th>
            <th>Profits</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in HighProfitItems.slice(0,10)" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ '$' + item.price }}</td>
            <td>{{ item.Quantitysold }}</td>
            <td>{{ '$' + item.profit }}</td>
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
      HighProfitItems: [],
      useremail: ''
    };
  },
  async mounted() {
    const auth = getAuth(firebaseApp); // Pass the firebaseApp to getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = user.email;
        this.fetchHighProfitItems(this.useremail);
      } else {
        this.useremail = '';
        this.HighProfitItems = [];
      }
    });
  },
  methods: {
    async fetchHighProfitItems(useremail) {
      try {
        console.log("Fetching data for user:", useremail);
        const q = query(collection(db, useremail));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Retrieved data for document", doc.id + ":", data);
          const price = data.Price;
          const Quantitysold = data.Quantitysold;
          const cost = data.Cost;
          const profit = (price - cost) * Quantitysold;
          
          items.push({
            key: doc.id,
            name: data.Item,
            price: data.Price,
            Quantitysold: data.Quantitysold,
            profit: profit.toFixed(2),
            cost: data.Cost
            
          });
        });
        console.log("All items:", items);

        // Sort items by profit in descending order
        items.sort((a, b) => b.profit - a.profit);

        console.log("Items sorted by profit:", items);
        this.HighProfitItems = items;
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
    font-size: 1rem;
    font-family: sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    min-width: 800px;
}

.styled-table thead th:nth-child(even) {
  background-color: rgb(190, 188, 188);
}

.styled-table thead th {
  border-bottom: 2px solid rgb(71, 71, 71);
  text-align: left;
}

.styled-table thead th:nth-child(odd) {
  background-color: lightgray;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
    letter-spacing: 0.8px;
    text-align: left;
}

.styled-table tbody td:nth-child(even) {
  background-color: rgb(206, 206, 206);
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody td:nth-child(odd) {
    background-color: rgb(221, 221, 221);
    border-bottom: 1px solid #c7c7c7;
}
</style>