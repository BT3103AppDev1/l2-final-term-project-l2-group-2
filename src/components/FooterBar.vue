<template>
    <footer class="footer">
      <div class="footer-container">
        <!-- Contact Column -->
        <div class="footer-section">
          <h5>CONTACT</h5>
          <ul class="footer-list">
            <li v-for="link in contactLinks" :key="link.text">
              <a :href="link.url" class="footer-link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
        <!-- Product Column -->
        <div class="footer-section">
          <h5>PRODUCT</h5>
          <ul class="footer-list">
            <li v-for="link in productLinks" :key="link.text">
              <a :href="link.url" class="footer-link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
        <!-- About Column -->
        <div class="footer-section">
          <h5>ABOUT</h5>
          <ul class="footer-list">
            <li v-for="link in aboutLinks" :key="link.text">
              <a :href="link.url" class="footer-link">{{ link.text }}</a>
            </li>
          </ul>
        </div>
        <!-- Company Description and Email Subscription Column -->
        <div class="footer-section description-subscription">
          <h5>ONTRACK</h5> <!-- Header for the fourth column -->
          <p class="company-description">
            OnTrack is an easy, all-in-one inventory management system for small to medium scale business retailers to sort, track and analyse their business, with a built-in management and statistics service. Do more with less.
          </p>
          <div class="email-subscription">
            <p>Get our emails on management tips from experts of the craft & new deals year round!</p>
            <form @submit.prevent="subscribe">
              <input type="email" v-model="email" placeholder="Email Address" required>
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  
  <script>
  export default {
    name: 'FooterBar',
    data() {
      return {
        contactLinks: [
          { text: 'Helpdesk (Singapore)', url: 'tel:+6590273552' },
          { text: 'Helpdesk (Overseas)', url: 'tel:+6590273552' },
          { text: 'Email Inquiry', url: 'mailto:helpdesk@ontrack.sg' }
        ],
        productLinks: [
          { text: 'Pricing', url: '#' },
          { text: 'Customer Stories', url: '#' },
          { text: 'Status', url: '#' },
          { text: 'Client Galleries', url: '#' },
          { text: 'Product Updates', url: '#' }
        ],
        aboutLinks: [
          { text: 'About', url: '#' },
          { text: 'Terms of Use', url: '#' },
          { text: 'Privacy Policy', url: '#' }
        ],
        email: '' // Bound to the email input in the template
      };
    },
    methods: {
      subscribe() {
        // Placeholder method for subscription logic
        alert(`Subscription successful for: ${this.email}`);
        this.email = ''; // Clear input after submission
      }
    }
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #f4f4f4;
    color: rgb(0, 0, 0);
    padding: 40px;
    width: 100%;
  }
  
  .footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-section {
    flex-basis: 190px; /* Adjust the base width as needed */
    margin: 10px;
  }
  
  .footer-list {
    list-style-type: none; /* Remove bullets */
    padding: 0;
  }
  
  .footer-link {
    color: rgb(0, 0, 0); /* Set link text to white */
    text-decoration: none; /* Remove underline */
    transition: color 0.3s ease-in-out;
  }
  
  .footer-link:hover {
    color: #3b3b3b; /* Lighten color on hover */
  }
  
  .description-subscription {
    flex-basis: 390px; /* Adjust base width for the fourth column as needed */
  }
  .description-subscription h5 {
  font-size: 1.5rem; /* Increase the font size of the OnTrack header */
  margin-bottom: 0rem; /* Adjust the space below the header if necessary */
  color: rgb(0, 0, 0); /* Ensures the header is white */
  text-align: left;
}

  .company-description {
  margin-bottom: 20px; /* Space between description and subscription box */
  text-align: justify; /* Justify the company description text */
  font-size: 0.9rem;
}
  
  .email-subscription {
    text-align: right;
  }
  
  .email-subscription p {
    margin-bottom: 10px;
    text-align: left;
  }
  
  .email-subscription form {
    display: flex;
    flex-direction: row; /* Change this from column to row */
    align-items: center;
  }
  
  .email-subscription input {
  background-color: #f4f4f4; /* Darker background for the input */
  color: rgb(0, 0, 0); /* White text color */
  border: 1px solid #c5c5c5; /* Slightly lighter border color for the input */
  padding: 10px;
  margin-right: 0px;
  width: calc(100% - 22px); /* Adjust width to account for padding and border */
}
  
.email-subscription button {
  background-color: #777; /* Darker background for the button */
  color: white; /* White text color for the button */
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}

  
.email-subscription button:hover {
  background-color: #888; /* Slightly lighter background for the button on hover */
}
  
  @media (max-width: 992px) {
    .footer-container {
      flex-direction: column;
      align-items: center;
    }
  
    .footer-section {
      flex-basis: 100%;
      text-align: center;
      margin: 10px 0;
    }
  
    .email-subscription {
      text-align: center;
    }
  
    .email-subscription form {
      align-items: center;
    }
  }
  </style>
  