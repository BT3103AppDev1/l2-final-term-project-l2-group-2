<template>
    <div class="sales-table">
      <h2>Lowest Movement Items</h2>
      <table class="center styled-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Sale Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in LowMovementItems.slice(0,10)" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.sales }}</td>
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
    LowMovementItems: [],
    useremail: ''
  };
},
async mounted() {
  const auth = getAuth(firebaseApp); // Pass the firebaseApp to getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.useremail = user.email;
      this.fetchLowMovementItems(this.useremail);
    } else {
      this.useremail = '';
      this.LowMovementItems = [];
    }
  });
},
methods: {
  async fetchLowMovementItems(useremail) {
    try {
      console.log("Fetching data for user:", useremail);
      const q = query(collection(db, useremail), orderBy('Sales', 'asc'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Retrieved data for document", doc.id + ":", data);
        items.push({
          key: doc.id,
          name: data.Item,
          sales: data.Sales,
        });
      });
      console.log("All items:", items);


      console.log("Items sorted by sales:", items);
      this.LowMovementItems = items;
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
</style>