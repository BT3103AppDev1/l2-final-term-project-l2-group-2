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
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.column1 }}</td>
            <td>{{ row.column2 }}</td>
            <td>{{ row.column3 }}</td>
            <td>{{ row.column4 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script>
export default {
  name: "MyTable",
  data() {
    return {
      tableData: [
        { column1: "Lays Potato Chips Classic", column2: "$6.20", column3: "43", column4: "$266.60" },
        { column1: "Self Made Brown Card Holder", column2: "$7.00", column3: "32", column4: "$224.00" },
        { column1: "Iphone 13 Pro Clear Case", column2: "$4.00", column3: "54", column4: "$216.00" },
        // Add more rows as needed
      ]
    };
  },
};
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
    background-color: #009879;
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
    border-bottom: 2px solid #009879;
}
</style>