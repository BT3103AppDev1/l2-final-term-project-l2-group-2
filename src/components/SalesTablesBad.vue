<template>
  <div class="sales-table">
    <h2>Lowest profit items</h2>
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
        <tr v-for="(item, index) in LowProfitItems.slice(0, 10)" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ '$' + item.price }}</td>
          <td>{{ item.Quantitysold }}</td>
          <td>{{ '$' + item.profit }}</td>
        </tr>
      </tbody>
    </table>
    <canvas ref="myBarChart" width="150" height="80"></canvas>

  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const db = getFirestore(firebaseApp);

export default {
  name: "MyTable",
  data() {
    return {
      LowProfitItems: [],
      useremail: ''
    };
  },
  async mounted() {
    const auth = getAuth(firebaseApp); // Pass the firebaseApp to getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = user.email;
        this.fetchLowProfitItems(this.useremail);
      } else {
        this.useremail = '';
        this.LowProfitItems = [];
      }
    });
  },
  methods: {
    async fetchLowProfitItems(useremail) {
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

        // Sort items by profit in ascending order
        items.sort((a, b) => a.profit - b.profit);

        console.log("Items sorted by profit:", items);
        this.LowProfitItems = items;
      } catch (error) {
        console.error("Error fetching and updating data:", error);
      }
      this.createBarChart();
    },

    createBarChart() {
      this.$nextTick(() => {
        const ctx = this.$refs.myBarChart.getContext('2d');
        // Dynamically generating labels and data from LowProfitItems
        const labels = this.LowProfitItems.map(item => item.name);
        const profitsData = this.LowProfitItems.map(item => item.profit);

        const data = {
          labels: labels,
          datasets: [{
            label: 'Profit',
            data: profitsData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // pink
              'rgba(54, 162, 235, 0.2)', // blue
              'rgba(255, 206, 86, 0.2)', // yellow
              'rgba(75, 192, 192, 0.2)', // green
              'rgba(153, 102, 255, 0.2)', // purple
              'rgba(255, 159, 64, 0.2)',  // orange
              'rgba(199, 199, 199, 0.2)', // grey
              'rgba(83, 102, 255, 0.2)',  // indigo
              'rgba(255, 99, 255, 0.2)',  // magenta
              'rgba(255, 99, 132, 0.2)'   // repeat the first color for the 10th item
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // pink
              'rgba(54, 162, 235, 1)', // blue
              'rgba(255, 206, 86, 1)', // yellow
              'rgba(75, 192, 192, 1)', // green
              'rgba(153, 102, 255, 1)', // purple
              'rgba(255, 159, 64, 1)',  // orange
              'rgba(199, 199, 199, 1)', // grey
              'rgba(83, 102, 255, 1)',  // indigo
              'rgba(255, 99, 255, 1)',  // magenta
              'rgba(255, 99, 132, 1)'   // repeat the first color for the 10th item
            ],
            borderWidth: 1
          }]
        };

        const myBarChart = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: {
            layout: {
              padding: {
                top: 30 // Add more space at the top of the chart
              }
            },
            scales: {
              y: {
                beginAtZero: true
              },
              x: {
                ticks: {
                  font: {
                    weight: 'bold' // This will make the x-axis labels bold
                  }
                }
              }
            },
            plugins: {
              legend: {
                display: false // This will hide the legend
              },
              datalabels: {
                color: '#000',
                anchor: 'end',
                align: 'top',
                formatter: (value, context) => {
                  return '$' + value; // Display the profit value on top of each bar
                }
              }
            }
          },
          plugins: [ChartDataLabels]
        });
      });
    },

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
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody td:nth-child(even) {
  background-color: rgb(208, 206, 206);
}

.styled-table tbody td:nth-child(odd) {
  background-color: lightgray;
}
</style>