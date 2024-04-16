<template>
  <div class="container">
    <form id="myform">
      <h2>Add item to your inventory</h2>

      <div class="formli">
        <label for="item1">Item Name: </label>
        <input
          type="text"
          id="item1"
          required=""
          placeholder="Enter item name"
        />
        <br /><br />
        <!-- <label for="img1">Image: </label>
        <input
          type="text"
          id="img1"
          required=""
          placeholder="img"
        /> -->
        <br /><br />
        <label for="price1">Price: </label>
        <input
          type="number"
          id="price1"
          required=""
          placeholder="Enter the price"
        /><br /><br />
        <label for="stock1">Stock: </label>
        <input
          type="number"
          id="stock1"
          required=""
          placeholder="Enter Stock"
        /><br /><br />
        <div class="save">
          <button id="savebutton" type="button" v-on:click="savetofs">
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
      console.log("IN AC");

      let item = document.getElementById("item1").value;
      // let image = document.getElementById("image1").value;
      let price = document.getElementById("price1").value;
      let stock = document.getElementById("stock1").value;

      //Parse stock as an integer
      stock = parseInt(stock,10);

      alert("Saving your data for item : " + item);

      try {
        const docRef = await setDoc(doc(db, String(this.useremail), item), {
          Item: item,
        //  Image: image,
          Price: price,
          Stock: stock,
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
h2 {
  background-color: #818cf8;
}

.formli {
  display: inline-block;
  text-align: right;
}

form {
  text-align: center;
  align-items: center;
  margin: autp;
}

input:hover {
  box-shadow: 2px 2px #6366f1;
  border-radius: 2px;
}

.save {
  text-align: center;
}
</style>
