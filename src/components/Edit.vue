<template>
  <div class="container">
    <form id="myform">
      <h2>Edit or Restock and item in your inventory</h2>

      <div class="form-group">
        <label for="item1"><strong>Item Name:</strong></label>
        <input
          type="text"
          id="item1"
          required
          placeholder="Enter the item to edit"
          class="input-field"
        /><br /><br />
        <label for="description1"><strong>Edit Item Description:</strong></label>
        <input
          type="text"
          id="description1"
          placeholder="(leave blank if no edits)"
          class="input-field"
        /><br /><br />
        <label for="stock1"><strong>Restock:</strong></label>
        <input
          type="number"
          id="stock1"
          required
          placeholder="Enter restock quantity"
          class="input-field"
        /><br /><br />

        <div class="save">
          <br /><br />
          <button id="savebutton" type="button" v-on:click="editItem" class="nav-button">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebaseApp from "../firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { ref, getStorage, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      useremail: "",
    };
  },
  async mounted() {
    const auth = getAuth();
    this.useremail = auth.currentUser.email;
  },

  methods: {
    async editItem() {
        let item = document.getElementById("item1").value; // Fetch data from Firestore based on the item name
        const itemRef = doc(db, String(this.useremail), item);
        try {
        const docSnap = await getDoc(itemRef);
        if (docSnap.exists()) {
            // Item exists in the database, update its stock and description
            let description = document.getElementById("description1").value; // Update description input field
            let restockInput = document.getElementById("stock1").value; // Update stock input field
            let currentStock = parseInt(docSnap.data().Stock, 10);
            let total = parseInt(docSnap.data().LifetimeQuantity, 10);
            // Parse stock as an integer
            let restock = restockInput.trim() !== '' ? parseInt(restockInput, 10) : 0;

            let updateData = {
                Stock: currentStock + restock,// Update stock by adding the restock quantity
                LifetimeQuantity: total + restock
            };

            // Check if description is not empty, then update it
            if (description.trim() !== '') {
                updateData.Description = description;
            }

            await updateDoc(itemRef, updateData);
            alert("Item updated successfully!");
            document.getElementById("myform").reset(); // Reset form fields
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
.container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  background-color: #3d5975;
  color: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  text-align: left; /* Align form elements to the left */
  max-width: 400px; /* Limit the maximum width of the form */
  margin: 0 auto; /* Center the form horizontally */
}

.input-field {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 15px;
}

.input-field:hover {
  border-color: #2c3e50;
}

.save {
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2c3e50;
}

.nav-button {
  padding: 10px 20px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.nav-button:hover {
  background-color: #2c3e50;
}
</style>
