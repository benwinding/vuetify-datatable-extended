<template>
  <div>
    <v-container fluid>
      <!-- SEARCH BAR -->
      <vde-header 
        :hasCsvExport="hasCsvExport"
        :selectManyFilters="selectManyFilters"
        :selectFilters="selectFilters"
        :checkboxFilters="checkboxFilters"
        :filtersEnabledCount="filtersEnabledCount"
        :hasFilters="hasFilters"
        :loading="loading"
        :headerChoices="headerChoices"
        :headersChoosen="headersChoosen"
        @onClickExport="onClickExport"
        @clearFilters="clearFilters"
        @onChangedFilters="onChangedFilters"
        @resetColumns="resetColumns"
        @searchValueChanged="searchValueChanged"
        @showFilterMenuChanged="showFilterMenuChanged"
        @headersChoosenChanged="headersChoosenChanged"
      />
    </v-container>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      :loading="loading"
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
import VdeHeader from "./header";
import FiltersHandler from "../helpers/filter";
import { downloadAsJson } from "../helpers/json-to-csv";
import { debounce } from "./debounce";
import { Subject, BehaviorSubject, combineLatest } from "rxjs";
import { takeUntil, filter } from "rxjs/operators";
import * as _ from "lodash";

export default {
  components: {
    VdeHeader
  },
  props: ["items", "headers", "loading", 'csvFilename'],
  data() {
    return {
      test: null,
      searchValue: "",
      searchValueDebounced: "",
      selectFilters: [],
      selectFiltersRegistered: {},
      selectManyFilters: [],
      selectManyFiltersRegistered: {},
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
    hasCsvExport() {
      const has = this.csvFilename;
      return !!has;
    },
    filtersEnabledCount() {
      const enabledSelect = this.selectFilters.filter(
        (f) => !_.isEmpty(f.model)
      );
      const enabledCheckbox = this.checkboxFilters.filter((f) => !!f.model);
      return enabledSelect.length || enabledCheckbox.length;
    },
    hasFilters() {
      return !!this.allFilters.length;
    },
    allFilters() {
      return [
        this.selectFilters,
        this.selectManyFilters,
        this.checkboxFilters,
      ].reduce((acc, cur) => acc.concat(cur), []);
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
    // console.log({$attrs: this.$attrs, this: this})
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
    onClickExport() {
      const filtered = this.itemsFiltered
      const headerValues = this.headersChoosen;
      const filenamePrefix = this.csvFilename || 'exported';
      downloadAsJson(filtered, headerValues, filenamePrefix)
    },
    searchValueChanged(e) {
      this.searchValue = e;
    },
    showFilterMenuChanged(e) {
      this.showFilterMenu = e;
    },
    headersChoosenChanged(e) {
      this.headersChoosen = e;
    },
    clearFilters() {
      this.showFilterMenu = false;
      this.itemsFiltered = this.items;
      this.allFilters.map((f) => (f.model = null));
    },
    onChangedFilters() {
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
        console.log("updateFilterValue: ", f.name, { ...f });
        this.filterHandler.updateFilterValue(f.name, f.model);
      });
    },
    _filterItems() {
      this.itemsFiltered = this.items.filter((item) =>
        this.filterHandler.runFilter(item)
      );
    },
    _processHeaders(newHeaders) {
      const handler = this.filterHandler;
      function addFilter(fieldName, label, registered, filters, options, model, items) {
        if (registered[fieldName]) {
          return;
        }
        registered[fieldName] = true;
        const filter = {
          name: fieldName,
          model:  [],
          label: label,
          items: [],
        }
        if (model !== undefined) {
          filter.model = model;
        }
        if (items !== undefined) {
          filter.items = items;
        }
        filters.push(filter);
        handler.registerFilter(fieldName, options);
      }

      newHeaders
        .filter((h) => h.select_filter)
        .map((h) => {
          addFilter(
            h.value,
            "Select " + h.text,
            this.selectFiltersRegistered,
            this.selectFilters,
            { caseSensitive: h.case_sensitive }
          );
        });
      newHeaders
        .filter((h) => h.select_filter_many)
        .map((h) => {
          addFilter(
            h.value,
            "Select (From Many) " + h.text,
            this.selectManyFiltersRegistered,
            this.selectManyFilters,
            { caseSensitive: h.case_sensitive, isManyFilter: true }
          );
        });
      newHeaders
        .filter((h) => h.checkbox_filter)
        .map((h) => {
          addFilter(
            h.value,
            "Select " + h.text,
            this.checkboxFiltersRegistered,
            this.checkboxFilters,
            { isCheckbox: true },
            false,
            [true, false]
          );
        });
      newHeaders.map((h) => {
        this._setHeaderMap(h.value, h);
      });
      this.clearFilters();
      this.resetColumns();
    },
    _processItems(newItems) {
      newItems.map((item) => {
        this.selectManyFilters.map((f) => {
          const fieldValue = _.get(item, f.name);
          if (!Array.isArray(fieldValue)) {
            return;
          }
          f.items = f.items.concat(fieldValue);
        });
        // Set select filters
        this.selectFilters.map((f) => {
          const fieldValue = _.get(item, f.name);
          f.items.push(fieldValue);
        });
      });
      // Order Items
      this.selectFilters.map((f) => {
        f.items = _.sortedUniq(_.sortBy(f.items));
      });
      this.selectManyFilters.map((f) => {
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
