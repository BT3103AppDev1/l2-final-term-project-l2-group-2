<template>
  <div class="container">
    <form id="myform">
      <h2>Add an item to your inventory</h2>

      <div class="form-group">
        <label for="item1"><strong>Item Name:</strong></label>
        <input
          type="text"
          id="item1"
          required
          placeholder="Enter the item name"
          class="input-field"
        /><br /><br />
        <label for="description1"><strong>Item Description:</strong></label>
        <input
          type="text"
          id="description1"
          required
          placeholder="Enter item description"
          class="input-field"
        /><br /><br />
        <label for="price1"><strong>Price:</strong></label>
        <input
          type="number"
          id="price1"
          required
          placeholder="Enter the price"
          class="input-field"
        /><br /><br />
        <label for="stock1"><strong>Stock:</strong></label>
        <input
          type="number"
          id="stock1"
          required
          placeholder="Enter the stock quantity"
          class="input-field"
        /><br /><br />

        <input type="file" ref="fileInput">

        <div class="save">
          <button id="savebutton" type="button" v-on:click="savetofs" class="nav-button">
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
import { doc, setDoc } from "firebase/firestore";
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
    async savetofs() {
      let item = document.getElementById("item1").value;
      let description = document.getElementById("description1").value;
      let price = document.getElementById("price1").value;
      let stock = document.getElementById("stock1").value;
      let file = this.$refs.fileInput.files[0]; // Get the selected file from the file input
      //Parse stock as an integer
      stock = parseInt(stock,10);

      alert("Saving your data for item : " + item);

      try {
        // Upload file to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + file.name);
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded a file:', snapshot.metadata.name);

        const docRef = await setDoc(doc(db, String(this.useremail), item), {
          Item: item,
          Description: description,
          Price: price,
          Stock: stock,
          ImageUrl: snapshot.metadata.fullPath // Save the image URL in Firestore
        });
        console.log(docRef);
        document.getElementById("myform").reset();
        this.$emit("added");
      } catch (error) {
        console.error("Error adding document: ", error);
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
  background-color: #2c3e50;
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
