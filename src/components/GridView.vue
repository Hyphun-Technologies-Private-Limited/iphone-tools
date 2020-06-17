<template>
    <div class="wrapper max-w-full overflow-y-auto overflow-x-auto">
  <div id="grid-template">
    <div class="table-body-wrapper">
      <table class="table-body">
        <thead>
          <th class="bg-dark text-dark-white text-left" v-for="key in columns"
            @click="sortBy(key)" v-bind:key="key"
            :class="{ active: sortKey == key }"
          >
            {{ key | capitalize }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(entry,index) in filteredData" :key="index">
            <td class="border-b border-black-light text-left" v-for="(key,indx) in columns" :key="indx" v-html="entry[key]"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "grid",
  props: {
    data: Array,
    columns: Array,
  },
  data(){
    return {
      searchQuery: '',
      sortKey: '',
      sortOrders: {},
    }
  },
  computed: {
    filteredData: function () {
      let data = this.data;
    return data;
    },
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
  },
  created(){
    let sortOrders = {};
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    })
    this.sortOrders = sortOrders;
  }
}
</script>
<style>

table {
  border-spacing: 0;
  width: 100%;
}

th {
  /*background-color: #008f68;*/
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

th, td {
  min-width: 10px;
  text-align: left;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

#grid-template {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  min-width: 600px;
}
</style>