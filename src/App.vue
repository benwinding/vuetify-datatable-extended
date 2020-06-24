<template>
  <div id="app">
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <v-app>
      <GithubCorner />
      <v-card class="pa-5">
        <v-btn @click="addItem()">
          Add Item
        </v-btn>
        <v-data-table-extended
          :headers="headers"
          :items="desserts"
          :sort-by="['calories', 'fat']"
          :sort-desc="[false, true]"
          multi-sort
          class="elevation-10"
        >
          <template v-slot:item.calories="{ item }">
            <v-chip>{{ item.calories }}</v-chip>
          </template>
        </v-data-table-extended>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import GithubCorner from './github-corner.vue';

export default {
  components: {
    GithubCorner
  },
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          select_filter: true,
          value: "name",
        },
        { text: "Calories", value: "calories", select_filter: true },
        { text: "Type", value: "obj.val", select_filter: true },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Is Healthy?", value: "is_healthy", scheckbox_filter: true },
        { text: "Iron (%)", value: "iron", select_filter: true },
      ],
      desserts: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.setDeserts();
    }, 1000);
  },
  methods: {
    addItem() {
      this.desserts.push({
        name: "Frozen Yogurt" + Math.random().toString(32).slice(2, 5),
        obj: {
          val: 'Orange'
        },
        calories: 200,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        is_healthy: false,
        iron: "1%",
      });
    },
    setDeserts() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          obj: {
            val: 'Banana'
          },
          calories: 200,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          is_healthy: true,
          iron: "1%",
          otherColumn: 4.0,
        },
        {
          name: "Ice cream sandwich",
          obj: {
            val: 'Apple'
          },
          calories: 200,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          is_healthy: true,
          iron: "1%",
        },
        {
          name: "Eclair",
          obj: {
            val: 'Apple'
          },
          calories: 300,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          is_healthy: false,
          iron: "7%",
        },
        {
          name: "Cupcake",
          obj: {
            val: 'Apple'
          },
          calories: 300,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          is_healthy: false,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          obj: {
            val: 'Apple'
          },
          calories: 400,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          is_healthy: false,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          obj: {
            val: 'Apple'
          },
          calories: 400,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          is_healthy: false,
          iron: "0%",
        },
        {
          name: "Lollipop",
          obj: {
            val: 'Apple'
          },
          calories: 400,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          is_healthy: false,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          obj: {
            val: 'Apple'
          },
          calories: 400,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          is_healthy: false,
          iron: "45%",
        },
        {
          name: "Donut",
          obj: {
            val: 'Apple'
          },
          calories: 500,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          is_healthy: false,
          iron: "22%",
        },
        {
          name: "KitKat",
          obj: {
            val: 'Apple'
          },
          calories: 500,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          is_healthy: false,
          iron: "6%",
        },
      ];
    },
  },
};
</script>
