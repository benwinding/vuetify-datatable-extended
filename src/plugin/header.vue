<template>
  <div>
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
                    <v-btn
                      :disabled="!hasFilters || loading"
                      v-on="onMenu"
                      fab
                      x-small
                    >
                      <v-icon>mdi-filter</v-icon>
                    </v-btn>
                  </div>
                </v-badge>
              </template>
              <span v-if="loading">Loading</span>
              <div v-else>
                <span v-if="hasFilters">Filter Data</span>
                <span v-if="!hasFilters">Filters Disabled</span>
              </div>
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
            <v-card-subtitle v-if="!hasFilters">
              No filters enabled
            </v-card-subtitle>

            <v-card-subtitle v-if="$options.filters.haslength(selectManyFilters)">
              Active Select (From Many) Filters
            </v-card-subtitle>

            <v-card-text>
              <v-list dense>
                <v-list-item
                  v-for="(f, i) in selectManyFilters"
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
                    @change="onChangedFilters()"
                  ></v-select>
                </v-list-item>
              </v-list>
            </v-card-text>

            <v-card-subtitle v-if="$options.filters.haslength(selectFilters)">
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
                    @change="onChangedFilters()"
                  ></v-select>
                </v-list-item>
              </v-list>
            </v-card-text>

            <v-card-subtitle v-if="$options.filters.haslength(checkboxFilters)">
              Active Switch Filters
            </v-card-subtitle>

            <v-card-text v-if="$options.filters.haslength(checkboxFilters)">
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
                    @change="onChangedFilters()"
                  ></v-checkbox>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>

      <div class="d-flex flex-row">
        <v-tooltip v-if="hasCsvExport" bottom>
          <template v-slot:activator="{ on: onTooltip }">
            <div v-on="onTooltip" class="mr-1">
              <v-btn @click="onClickExport()" fab x-small>
                <v-icon>mdi-file-download</v-icon>
              </v-btn>
            </div>
          </template>
          <span>Download as CSV file</span>
        </v-tooltip>
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
                    :value="headersChoosen"
                    :items="headerChoices"
                    @change="e => headersChoosenChanged(e)"
                  ></v-select>
                </v-list-item-action>
              </v-list-item-content>
            </v-card-text>
          </v-card>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<style scoped>
.align-center {
  align-items: center;
}
.d-flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.justify-space-between {
  justify-content: space-between;
}
.ma-0 {
  margin: 0;
}
.pa-0 {
  padding: 0;
}
.mr-1 {
  margin-right: 1em;
}
</style>

<script>
export default {
  props: [
    'hasCsvExport',
    'headersChoosen',
    'headerChoices',
    'selectManyFilters',
    'selectFilters',
    'checkboxFilters',
    'filtersEnabledCount',
    'hasFilters',
    'loading'
  ],
  data() {
    return {
      searchValue: null,
      showFilterMenu: null,
    }
  },
  watch: {
    searchValue(newValue) {
      this.$emit('searchValueChanged', newValue)
    },
    showFilterMenu(newValue) {
      this.$emit('showFilterMenuChanged', newValue)
    }
  },
  methods: {
    clearFilters() {
      this.$emit('clearFilters')
    },
    onChangedFilters() {
      this.$emit('onChangedFilters')
    },
    resetColumns() {
      this.$emit('resetColumns')
    },
    headersChoosenChanged(e) {
      this.$emit('headersChoosenChanged', e)
    },
    onClickExport() {
      this.$emit('onClickExport')
    }
  },
  filters: {
    haslength(val) {
      return Array.isArray(val) && !!val.length;
    }
  }
};
</script>

<style></style>
