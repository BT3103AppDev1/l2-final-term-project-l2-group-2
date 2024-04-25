<template>
    <div class="sales-table">
      <h2>Highest Movement Items</h2>
      <table class="center styled-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Sale Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in HighMovementItems.slice(0,10)" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.Quantitysold }}</td>
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
    HighMovementItems: [],
    useremail: ''
  };
},
async mounted() {
  const auth = getAuth(firebaseApp); // Pass the firebaseApp to getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.useremail = user.email;
      this.fetchHighMovementItems(this.useremail);
    } else {
      this.useremail = '';
      this.HighMovementItems = [];
    }
  });
},
methods: {
  async fetchHighMovementItems(useremail) {
    try {
      console.log("Fetching data for user:", useremail);
      const q = query(collection(db, useremail), orderBy('Quantitysold', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Retrieved data for document", doc.id + ":", data);
        items.push({
          key: doc.id,
          name: data.Item,
          Quantitysold: data.Quantitysold,
        });
      });
      console.log("All sold items:", items);


      console.log("Items sorted by sales:", items);
      this.HighMovementItems = items;
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

