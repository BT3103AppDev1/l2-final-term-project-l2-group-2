<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <img src = '@/assets/onTrackLogi.jpg' alt="OnTrack Logo">
        
      </div>
      <ul class="navbar-menu">
        <li class="navbar-item"><a href="#">Inventory Management</a></li>
        <li class="navbar-item"><a href="#">Sales DashBoard</a></li>
        
        
      </ul>
      <div class="navbar-end">
        <button class="login-button">Login</button>
        
      </div>
    </nav>
  </template>
  
  <script>
  
  export default {
    
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f4e8de;
    color: black;
    height:5vh;
    width: 100vw;
  }
  
  .navbar-brand img {
    height: 5vh;
    width: 6vw;
  }
  
  
  /*make horizontal navbar-menu */
  .navbar-menu {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  /* margin btw navbar-tems */
  .navbar-item:not(:first-of-type) {
    margin-left: 1vw;
  }
  
  .navbar-item a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    transition: color 0.3s;
  }

  
  
  .navbar-item a:hover {
    color: #555;
  }
  
  .login-button {
    background: none;
    color: black;
    font-weight: bold;
    padding: 1vh 2vw;
    cursor: pointer;
    border: none;
  }
  
  .login-button:hover {
    background-color: white;
  }
  </style>
  