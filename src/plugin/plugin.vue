<template>
  <div>
    <v-container fluid>
      <v-row dense>
        <v-col class="mb-n5">
          <v-text-field
            append-icon="mdi-magnify"
            label="Search"
            debounce
            single-line
            hide-details
            v-model="searchValue"
          ></v-text-field>
        </v-col>
        <v-col class="mb-n5">
          <v-select label="Select Columns" multiple></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
      v-bind="$attrs"
      :search="searchValue"
      :customFilter="customFilter"
    >
      <slot></slot>
    </v-data-table>
  </div>
</template>

<script>
import FiltersHandler from "./filter";

export default {
  props: [],
  data() {
    return {
      searchValue: "",
      filterHandler: new FiltersHandler(),
    };
  },
  watch: {
    searchValue(newValue) {
      this.filterHandler.updateFilterValue('name', newValue);
    }
  },
  mounted() {
    console.log({ $attrs: this.$attrs });
    const headers = this.$attrs.headers;
    headers
      .filter((h) => h.select_filter)
      .map((h) => {
        const fieldName = h.value;
        this.filterHandler.registerFilter(fieldName, (filterValue, item) => {
          if (!filterValue) {
            return item;
          }
          return item[fieldName].toLowerCase().includes(filterValue);
        });
      });
  },
  methods: {
    filterAuthor(val) {
      this.filterHandler.updateFilterValue("name", val);
    },
    customFilter(value, search, item) {
      return this.filterHandler.runFilters(value, search, item);
    },
  },
};
</script>
