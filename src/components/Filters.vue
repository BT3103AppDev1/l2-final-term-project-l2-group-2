<template>
  <div class="filterbar">

    <ul class="filterbar-menu">
      <li class="filterbar-item"><a href="#">Sort by</a>
        <span class="sortByPlaceholder"> Quantity</span>
      </li>
      <li class="filterbar-item"><a href="#">Search</a>
        <span class="searchPlaceholder"></span>
      </li>

    </ul>

    <button class="new-item-button">+ New Item</button> <!-- New button added here -->

  </div>
</template>

<script>

export default {

};
</script>

<style scoped>
.filterbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: black;
  height: 5vh;
  width: 100vw;
}



/*make horizontal navbar-menu */
.filterbar-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

/* margin btw navbar-tems */
.filterbar-item:not(:first-of-type) {
  margin-left: 7vw;
}

.filterbar-item a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  transition: color 0.3s;
}

.sortByPlaceholder {
  background-color: #cccccc;
  display: inline-block;
  width: 7vw;
  height: 3vh;
  margin-left: 1rem;
  padding-left: 1rem;
}

.searchPlaceholder {
  background-color: #cccccc;
  display: inline-block;
  width: 7vw;
  height: 3vh;
  margin-left: 1rem;
  padding-left: 1rem;
}

.new-item-button {
    background-color: #4CAF50; /* Example green background */
    color: white; /* Text color */
    border: none; /* Removes the border */
    padding: 0.5rem 1rem; /* Padding around the text */
    border-radius: 4px; /* Rounded corners */
    cursor: pointer; /* Hand cursor on hover */
    margin-right: 1rem; /* Ensures some space from the right edge */
  }

  .new-item-button:hover {
    background-color: #367C39; /* Darker green on hover for effect */
  }
  
</style>