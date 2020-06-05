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
            <template v-slot:activator="{ on: onMenu }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: onTooltip }">
                  <v-badge
                    :value="filtersEnabledCount > 0"
                    color="accent"
                    :content="filtersEnabledCount"
                    overlap
                  >
                    <div v-on="onTooltip">
                      <v-btn :disabled="!hasFilters" v-on="onMenu" fab x-small>
                        <v-icon>mdi-filter</v-icon>
                      </v-btn>
                    </div>
                  </v-badge>
                </template>
                <span v-if="hasFilters">Filter Data</span>
                <span v-else>Filters Disabled</span>
              </v-tooltip>
            </template>

            <v-card>
              <v-card-title>
                Filter Data
                <v-spacer></v-spacer>
                <v-btn small dark @click="clearFilters()">
                  <v-icon left>mdi-close</v-icon>
                  Clear Filters
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-subtitle>
                Active Select Filters
              </v-card-subtitle>

              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="(f, i) in selectFilters"
                    :key="i"
                    dense
                    class="ma-0 pa-0"
                  >
                    <v-select
                      :label="f.label"
                      multiple
                      chips
                      dense
                      v-model="f.model"
                      :items="f.items"
                      @change="onChangedSelect()"
                    ></v-select>
                  </v-list-item>
                </v-list>
              </v-card-text>

              <v-card-subtitle>
                Active Switch Filters
              </v-card-subtitle>

              <v-card-text>
                <v-list dense>
                  <v-list-item
                    v-for="(f, i) in checkboxFilters"
                    :key="i"
                    dense
                    class="ma-0 pa-0"
                  >
                    <v-checkbox
                      :label="f.label"
                      v-model="f.model"
                      @change="onChangedSelect()"
                    ></v-checkbox>
                  </v-list-item>
                </v-list>
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
            <template v-slot:activator="{ on: onMenu }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: onTooltip }">
                  <div v-on="onTooltip">
                    <v-btn v-on="onMenu" fab x-small>
                      <v-icon>mdi-view-column</v-icon>
                    </v-btn>
                  </div>
                </template>
                <span>Choose Columns</span>
              </v-tooltip>
            </template>

            <v-card>
              <v-card-title>
                Choose Columns
                <v-spacer></v-spacer>
                <v-btn dark @click="resetColumns()" small>
                  <v-icon left>mdi-close</v-icon>
                  Reset Columns
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
      :items="itemsFiltered || []"
      :headers="headersChoosenObjs || []"
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
import { Subject, BehaviorSubject, combineLatest } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import * as _ from "lodash";

export default {
  props: ["items", "headers"],
  data() {
    return {
      test: null,
      searchValue: "",
      searchValueDebounced: "",
      selectFilters: [],
      selectFiltersRegistered: {},
      checkboxFilters: [],
      checkboxFiltersRegistered: {},
      itemsFiltered: [],
      filterHandler: new FiltersHandler(),
      showFilterMenu: false,
      headersAllMap: {},
      headersChoosen: [],
      o$items: new BehaviorSubject(),
      o$headers: new BehaviorSubject(),
      o$destroyed: new Subject(),
    };
  },
  computed: {
    filtersEnabledCount() {
      const enabledSelect = this.selectFilters.filter(
        (f) => !_.isEmpty(f.model)
      );
      const enabledCheckbox = this.checkboxFilters.filter(
        (f) => !!f.model
      );
      return enabledSelect.length || enabledCheckbox.length;
    },
    hasFilters() {
      return !!this.allFilters.length;
    },
    allFilters() {
      return this.selectFilters.concat(this.checkboxFilters);
    },
    headerChoices: function () {
      return Object.values(this.headersAllMap);
    },
    headersChoosenObjs: function () {
      return this.headersChoosen
        .map((h) => this.headersAllMap[h])
        .filter((h) => !!h);
    },
  },
  mounted() {
    combineLatest([this.o$items, this.o$headers])
      .pipe(
        filter(
          ([items, headers]) => Array.isArray(items) && Array.isArray(headers)
        )
      )
      .pipe(takeUntil(this.o$destroyed))
      .subscribe(([items, headers]) => {
        this._processHeaders(headers);
        this._processItems(items);
      });
  },
  destroyed() {
    this.o$destroyed.next();
  },
  watch: {
    searchValue: debounce(function (newVal) {
      this.searchValueDebounced = newVal;
    }, 300),
    headers: {
      immediate: true,
      handler(newVal) {
        this.o$headers.next(newVal);
      },
    },
    items: {
      immediate: true,
      handler(newVal) {
        this.o$items.next(newVal);
      },
    },
  },
  methods: {
    clearFilters() {
      this.showFilterMenu = false;
      this.itemsFiltered = this.items;
      this.allFilters.map((f) => (f.model = null));
    },
    onChangedSelect() {
      this._setFiltersToHandler();
      this._filterItems();
    },
    resetColumns() {
      this.headersChoosen = this.headers
        .filter((h) => !h.hide)
        .map((h) => h.value);
    },
    _setFiltersToHandler() {
      this.allFilters.map((f) => {
        console.log('updateFilterValue: ', f.name, {...f})
        this.filterHandler.updateFilterValue(f.name, f.model);
      });
    },
    _filterItems() {
      this.itemsFiltered = this.items.filter((item) =>
        this.filterHandler.runFilter(item)
      );
    },
    _processHeaders(newHeaders) {
      newHeaders
        .filter((h) => h.select_filter)
        .map((h) => {
          const fieldName = h.value;
          if (this.selectFiltersRegistered[fieldName]) {
            return;
          }
          this.selectFiltersRegistered[fieldName] = true;
          this.selectFilters.push({
            name: fieldName,
            model: [],
            label: "Select " + h.text,
            items: [],
          });
          this.filterHandler.registerFilter(fieldName);
        });
      newHeaders
        .filter((h) => h.checkbox_filter)
        .map((h) => {
          const fieldName = h.value;
          if (this.checkboxFiltersRegistered[fieldName]) {
            return;
          }
          this.checkboxFiltersRegistered[fieldName] = true;
          this.checkboxFilters.push({
            name: fieldName,
            model: false,
            label: "Select " + h.text,
            items: [true, false],
          });
          this.filterHandler.registerFilter(fieldName);
        });
      newHeaders.map((h) => {
        this._setHeaderMap(h.value, h);
      });
      this.clearFilters();
      this.resetColumns();
    },
    _processItems(newItems) {
      const filters = this.selectFilters;
      newItems.map((item) => {
        filters.map((f) => {
          const fieldValue = _.get(item, f.name);
          f.items.push(fieldValue);
        });
      });
      filters.map((f) => {
        f.items = _.sortedUniq(_.sortBy(f.items));
      });
      const firstRow = newItems[0];
      if (!firstRow) {
        return;
      }
      Object.keys(firstRow).map((itemFieldName) => {
        this._setHeaderMap(itemFieldName, {
          value: itemFieldName,
          text: itemFieldName.toUpperCase(),
        });
      });
    },
    _setHeaderMap(fieldName, headerObj) {
      if (this.headersAllMap[fieldName]) {
        return;
      }
      this.headersAllMap[fieldName] = headerObj;
      this.headersAllMap = { ...this.headersAllMap };
    },
  },
};
</script>
