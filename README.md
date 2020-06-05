# vuetify-datatable-extended

This is an extension of [vuetify's](https://github.com/vuetifyjs/vuetify) awesome [v-data-table](https://vuetifyjs.com/en/components/data-tables/). It gives you additional features including:

- A search field 
- Per field filtering
- Column selection

## Install

```
yarn add vuetify-datatable-extended
```

Use the plugin in vue somewhere.

```js
import Vue from "vue";
import VuetifyTable from "vuetify-datatable-extended";

Vue.use(VuetifyTable);
```

## Usage

### Same API as v-data-table

This component has all the same API as [`<v-data-table />`](https://vuetifyjs.com/en/components/data-tables/) and just adds additional features that most data-tables need.

Instead of `v-data-table`, use `v-data-table-extended`

### Simple Example

[DEMO HERE](https://benwinding.github.io/vuetify-datatable-extended/)

```html
<template>
  <v-data-table-extended 
    :headers="headers" 
    :items="desserts">
  </v-data-table-extended>
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          {
            text: "Dessert (100g serving)",
            select_filter: true,
            value: "name",
          },
          {
            text: "Calories",
            value: "calories",
            select_filter: true
          },
        ],
        desserts: [
          {
            name: "Donut",
            calories: 500,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%",
          },
          {
            name: "KitKat",
            calories: 500,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%",
          },
        ];,
      };
    },
  };
</script>
```

This will give you a `v-data-table` with all the same hooks and props, but also:

- A search field 
- Per field filtering
- Column selection
