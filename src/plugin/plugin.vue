<template>
  <div>
    <v-container fluid>
      <!-- SEARCH BAR -->
      <div class="d-flex flex-row justify-space-between align-center">
        <div class="d-flex flex-row align-center">
          <v-text-field
            label="Search Table"
            v-model="searchValue"
            append-icon="mdi-magnify"
          ></v-text-field>
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
        </div>

        <div>
          <v-menu
            :close-on-content-click="false"
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
                  <v-icon dark>mdi-view-column</v-icon>
                </v-btn>
              </v-badge>
            </template>

            <v-card>
              <v-card-title>
                Choose Columns
                <v-spacer></v-spacer>
                <v-btn dark @click="clearFilters()">
                  <v-icon left>mdi-close</v-icon>
                  Reset
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>

              <v-card-text>
                <!-- Categorie -->
                <v-list-item-content>
                  <v-list-item-action class="pa-0 ma-0">
                    <v-select
                      label="Select Columns"
                      multiple
                      chips
                      v-model="headersChoosen"
                      :items="headerChoices"
                    ></v-select>
                  </v-list-item-action>
                </v-list-item-content>
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
      </div>
    </v-container>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      :items="itemsFiltered"
      :headers="headersChoosenObjs"
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
      headersAllMap: {},
      headersChoosen: [],
    };
  },
  computed: {
    filtersEnabledCount() {
      const enabled = this.selectFilters.filter(
        (f) => Array.isArray(f.model) && f.model.length
      );
      return enabled.length;
    },
    headerChoices: function () {
      return Object.values(this.headersAllMap);
    },
    headersChoosenObjs: function () {
      return this.headersChoosen.map((h) => {
        return this.headersAllMap[h];
      });
    },
  },
  watch: {
    headersChoosen: function (newVal) {
      console.log("headersChoosen", { newVal });
    },
    searchValue: debounce(function (newVal) {
      this.searchValueDebounced = newVal;
      console.log("debouncing");
    }, 300),
    headers: {
      immediate: true,
      handler(newVal) {
        if (!Array.isArray(newVal)) {
          return;
        }
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
        newVal.map((h) => {
          if (this.headersAllMap[h.value]) {
            return;
          }
          this.headersAllMap[h.value] = h;
        });
        this.clearFilters();
        this.headersChoosen = newVal;
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
        const firstRow = newVal[0];
        if (!firstRow) {
          return;
        }
        Object.keys(firstRow).map((itemFieldName) => {
          if (this.headersAllMap[itemFieldName]) {
            return;
          }
          this.headersAllMap[itemFieldName] = {
            value: itemFieldName,
            text: itemFieldName.toUpperCase(),
          };
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
