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
        <v-col class="mb-n5" v-for="f of selectFilters" :key="f.name">
          <v-select
            :label="f.label"
            multiple
            chips
            v-model="f.model"
            :items="f.items"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      v-bind="$attrs"
      :items="items"
      :headers="headers"
      :search="searchValueJsonDebounced"
      :customFilter="customFilter"
    >
      <slot></slot>
    </v-data-table>
  </div>
</template>

<script>
import FiltersHandler from "./filter";
import { debounce } from "./debounce";

export default {
  props: ["items", "headers"],
  data() {
    return {
      searchValue: "",
      searchValueJsonDebounced: "",
      selectFilters: [],
      filterHandler: new FiltersHandler(),
    };
  },
  computed: {
    searchValueJson() {
      const searchObj = this.selectFilters.reduce((acc, curr) => {
        acc[curr.name] = curr.model;
        return acc;
      }, {});
      this.filterHandler.updateFilterValues(searchObj);
      return JSON.stringify(searchObj);
    },
  },
  watch: {
    searchValueJson: debounce(function (newVal) {
      this.searchValueJsonDebounced = newVal;
      console.log("debouncing");
    }, 100),
    headers: {
      immediate: true,
      handler(newVal) {
        newVal
          .filter((h) => h.select_filter)
          .map((h) => {
            const fieldName = h.value;
            this.selectFilters.push({
              name: fieldName,
              model: [],
              label: "Select " + h.text,
              items: [],
            });
            this.filterHandler.registerFilter(
              fieldName,
              (itemValue, filterValueArr) => {
                // if (filterName !== fieldName) {
                //   return true;
                // }
                if (!Array.isArray(filterValueArr) || !filterValueArr.length) {
                  return true;
                }
                const itemValueLower = (itemValue + "").toLowerCase();
                const doesFilterMatch = filterValueArr.some((filterValue) => {
                  return itemValueLower.includes(
                    (filterValue + "").toLowerCase()
                  );
                });
                console.log("filter all", {
                  fieldName,
                  filterValueArr,
                  doesFilterMatch,
                  itemValue,
                });
                return doesFilterMatch;
              }
            );
          });
      },
    },
    items: {
      immediate: true,
      handler(newVal) {
        if (!Array.isArray(newVal)) {
          return;
        }
        const filters = this.selectFilters;
        newVal.map((item) => {
          filters.map((f) => {
            f.items.push(item[f.name]);
          });
        });
      },
    },
  },
  methods: {
    customFilter(value, search, item) {
      return this.filterHandler.runFilters(value, search, item);
    },
  },
};
</script>
