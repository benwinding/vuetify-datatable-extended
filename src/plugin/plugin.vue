<template>
  <div>
    <v-container fluid>
      <!-- SEARCH BAR -->
      <v-layout justify-center align-center>
        <v-flex xs6>
          <v-text-field
            label="Search Table"
            v-model="searchValue"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-flex>
        <!-- Filtri -->
        <v-flex xs1>
          <v-menu
            :close-on-content-click="false"
            :nudge-width="300"
            v-model="showFilterMenu"
            offset-x
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-badge
                :value="filtersEnabledCount > 0"
                color="accent"
                :content="filtersEnabledCount"
                overlap
              >
                <v-btn
                  :color="filtersEnabledCount > 0 ? 'primary' : null"
                  icon
                  v-on="on"
                >
                  <v-icon dark>mdi-filter</v-icon>
                </v-btn>
              </v-badge>
            </template>

            <v-card>
              <v-card-title>
                Filter
                <v-spacer></v-spacer>
                <v-btn dark @click="clearFilters()">
                  <v-icon left>mdi-close</v-icon>
                  Clear Filters
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text>
                <!-- Categorie -->
                <v-list-item-title>Select Filters</v-list-item-title>
                <v-list-item-content v-for="f of selectFilters" :key="f.name">
                  <v-list-item-action class="pa-0 ma-0">
                    <v-select
                      :label="f.label"
                      multiple
                      chips
                      v-model="f.model"
                      :items="f.items"
                      @change="onChangedSelect()"
                    ></v-select>
                  </v-list-item-action>
                </v-list-item-content>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-container>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      :items="itemsFiltered"
      :headers="headers"
      :search="searchValueDebounced"
    >
      <!-- Pass on all named slots -->
      <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot" />
      <!-- Pass on all scoped slots -->
      <template
        v-for="slot in Object.keys($scopedSlots)"
        :slot="slot"
        slot-scope="scope"
        ><slot :name="slot" v-bind="scope"
      /></template>
    </v-data-table>
  </div>
</template>

<script>
import FiltersHandler from "../helpers/filter";
import { debounce } from "./debounce";
import * as _ from "lodash";

export default {
  props: ["items", "headers"],
  data() {
    return {
      searchValue: "",
      searchValueDebounced: "",
      selectFilters: [],
      itemsFiltered: [],
      filterHandler: new FiltersHandler(),
      showFilterMenu: false,
    };
  },
  computed: {
    filtersEnabledCount() {
      const enabled = this.selectFilters.filter(
        (f) => Array.isArray(f.model) && f.model.length
      );
      return enabled.length;
    },
  },
  watch: {
    searchValue: debounce(function (newVal) {
      this.searchValueDebounced = newVal;
      console.log("debouncing");
    }, 300),
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
            this.filterHandler.registerFilter(fieldName);
          });
        this.clearFilters();
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
        filters.map((f) => {
          f.items = _.sortedUniq(_.sortBy(f.items));
        });
      },
    },
  },
  methods: {
    clearFilters() {
      this.showFilterMenu = false;
      this.itemsFiltered = this.items;
      this.selectFilters.map((f) => (f.model = null));
    },
    onChangedSelect() {
      this._setFiltersToHandler();
      this._filterItems();
    },
    _setFiltersToHandler() {
      this.selectFilters.map((f) => {
        this.filterHandler.updateFilterValue(f.name, f.model);
      });
    },
    _filterItems() {
      this.itemsFiltered = this.items.filter((item) =>
        this.filterHandler.runFilter(item)
      );
    },
  },
};
</script>
