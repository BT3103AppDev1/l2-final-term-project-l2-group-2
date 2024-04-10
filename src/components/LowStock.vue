<template>
    <div class="sales-table">
      <h2>Low Stock Items</h2>
      <table class="center styled-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ row.column1 }}</td>
            <td class="stocks">{{ row.column2 }}</td>
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
        { column1: "Lays Potato Chips Classic", column2: "5"},
        { column1: "Self Made Brown Card Holder", column2: "3"},
        { column1: "Iphone 13 Pro Clear Case", column2: "$1"},
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

.stocks {
    background-color: #e99d9d;
}
</style>