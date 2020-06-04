(function(e){function t(t){for(var n,s,l=t[0],o=t[1],c=t[2],f=0,d=[];f<l.length;f++)s=l[f],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&d.push(a[s][0]),a[s]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);u&&u(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,l=1;l<r.length;l++){var o=r[l];0!==a[o]&&(n=!1)}n&&(i.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},i=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/vuetify-datatable-extended/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=o;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("1a91"),r("e74f"),r("beae"),r("5e60");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("link",{attrs:{href:"https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",rel:"stylesheet"}}),r("v-app",[r("v-card",{staticClass:"pa-5"},[r("v-data-table-extended",{staticClass:"elevation-10",attrs:{headers:e.headers,items:e.desserts,"sort-by":["calories","fat"],"sort-desc":[!1,!0],"multi-sort":""},scopedSlots:e._u([{key:"item.calories",fn:function(t){var n=t.item;return[r("v-chip",[e._v(e._s(n.calories))])]}}])})],1)],1)],1)},i=[],s={data:function(){return{headers:[{text:"Dessert (100g serving)",align:"start",sortable:!1,select_filter:!0,value:"name"},{text:"Calories",value:"calories",select_filter:!0},{text:"Fat (g)",value:"fat"},{text:"Carbs (g)",value:"carbs"},{text:"Protein (g)",value:"protein"},{text:"Iron (%)",value:"iron",select_filter:!0}],desserts:[{name:"Frozen Yogurt",calories:200,fat:6,carbs:24,protein:4,iron:"1%",otherColumn:4},{name:"Ice cream sandwich",calories:200,fat:9,carbs:37,protein:4.3,iron:"1%"},{name:"Eclair",calories:300,fat:16,carbs:23,protein:6,iron:"7%"},{name:"Cupcake",calories:300,fat:3.7,carbs:67,protein:4.3,iron:"8%"},{name:"Gingerbread",calories:400,fat:16,carbs:49,protein:3.9,iron:"16%"},{name:"Jelly bean",calories:400,fat:0,carbs:94,protein:0,iron:"0%"},{name:"Lollipop",calories:400,fat:.2,carbs:98,protein:0,iron:"2%"},{name:"Honeycomb",calories:400,fat:3.2,carbs:87,protein:6.5,iron:"45%"},{name:"Donut",calories:500,fat:25,carbs:51,protein:4.9,iron:"22%"},{name:"KitKat",calories:500,fat:26,carbs:65,protein:7,iron:"6%"}]}}},l=s,o=r("95c6"),c=Object(o["a"])(l,a,i,!1,null,null,null),u=c.exports,f=(r("bf40"),r("ce5b")),d=r.n(f),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-container",{attrs:{fluid:""}},[r("div",{staticClass:"d-flex flex-row justify-space-between align-center"},[r("div",{staticClass:"d-flex flex-row align-center"},[r("v-text-field",{attrs:{label:"Search Table","append-icon":"mdi-magnify"},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),r("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":300,"offset-x":"",transition:"scale-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[r("v-badge",{attrs:{value:e.filtersEnabledCount>0,color:"accent",content:e.filtersEnabledCount,overlap:""}},[r("v-btn",e._g({attrs:{color:e.filtersEnabledCount>0?"primary":null,icon:""}},n),[r("v-icon",{attrs:{dark:""}},[e._v("mdi-filter")])],1)],1)]}}]),model:{value:e.showFilterMenu,callback:function(t){e.showFilterMenu=t},expression:"showFilterMenu"}},[r("v-card",[r("v-card-title",[e._v(" Filter "),r("v-spacer"),r("v-btn",{attrs:{dark:""},on:{click:function(t){return e.clearFilters()}}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-close")]),e._v(" Clear Filters ")],1)],1),r("v-divider"),r("v-card-text",[r("v-list-item-title",[e._v("Select Filters")]),e._l(e.selectFilters,(function(t){return r("v-list-item-content",{key:t.name},[r("v-list-item-action",{staticClass:"pa-0 ma-0"},[r("v-select",{attrs:{label:t.label,multiple:"",chips:"",items:t.items},on:{change:function(t){return e.onChangedSelect()}},model:{value:t.model,callback:function(r){e.$set(t,"model",r)},expression:"f.model"}})],1)],1)}))],2)],1)],1)],1),r("div",[r("v-menu",{attrs:{"close-on-content-click":!1,"offset-x":"",transition:"scale-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[r("v-badge",{attrs:{value:e.filtersEnabledCount>0,color:"accent",content:e.filtersEnabledCount,overlap:""}},[r("v-btn",e._g({attrs:{color:e.filtersEnabledCount>0?"primary":null,icon:""}},n),[r("v-icon",{attrs:{dark:""}},[e._v("mdi-view-column")])],1)],1)]}}])},[r("v-card",[r("v-card-title",[e._v(" Choose Columns "),r("v-spacer"),r("v-btn",{attrs:{dark:""},on:{click:function(t){return e.resetColumns()}}},[r("v-icon",{attrs:{left:""}},[e._v("mdi-close")]),e._v(" Reset ")],1)],1),r("v-divider"),r("v-card-text",[r("v-list-item-content",[r("v-list-item-action",{staticClass:"pa-0 ma-0"},[r("v-select",{attrs:{label:"Select Columns",multiple:"",chips:"",items:e.headerChoices},model:{value:e.headersChoosen,callback:function(t){e.headersChoosen=t},expression:"headersChoosen"}})],1)],1)],1)],1)],1)],1)])]),r("v-data-table",e._g(e._b({attrs:{items:e.itemsFiltered,headers:e.headersChoosenObjs,search:e.searchValueDebounced},scopedSlots:e._u([e._l(Object.keys(e.$scopedSlots),(function(t){return{key:t,fn:function(r){return[e._t(t,null,null,r)]}}}))],null,!0)},"v-data-table",e.$attrs,!1),e.$listeners),[e._l(Object.keys(e.$slots),(function(t){return e._t(t,null,{slot:t})}))],2)],1)},v=[],h=(r("04ca"),r("12be"),r("4dc8"),r("aa12"),r("2cff"),r("a4bc"),r("c36d"),r("fe53"),r("0185"),r("2ef0"));r("1785"),r("9c1d"),r("22e6");function m(e,t,r){var n=r&&r.options||{},a=r&&r.value,i=h["get"](e,t),s=b(i),l=y(a),o=s,c=l;n.caseSensitive||(o=s.toLowerCase(),c=l.map((function(e){return(e+"").toString().toLowerCase()})));var u=c.map((function(e){return e===o})),f=u.reduce((function(e,t){return e||t}),!1);return f}function b(e){return h["isNil"](e)?"":"string"===typeof e?e:e.toString()}function y(e){return h["isNil"](e)?[]:h["isArray"](e)?e.map((function(e){return e+""})):"string"===typeof e?[e]:e}var g=function(){function e(){this.filters={}}return e.prototype.updateFilterValue=function(e,t){this.filters[e]||(this.filters[e]={}),this.filters[e].value=t},e.prototype.registerFilter=function(e,t){this.filters[e]={options:t,value:null}},e.prototype.runFilter=function(e){if(h["isEmpty"](this.filters)||!h["isObject"](this.filters))return!0;if(Object.values(this.filters).every((function(e){return h["isNil"](e.value)||Array.isArray(e.value)&&!e.value.length})))return!0;var t=Object.entries(this.filters),r=t.map((function(t){var r=t[0],n=t[1],a=m(e,r,n);return a})),n=r.reduce((function(e,t){return e||t}),!1);return n},e}(),_=g;r("9cb7");function C(e,t){var r=null;return function(){clearTimeout(r);var n=arguments,a=this;r=setTimeout((function(){e.apply(a,n)}),t)}}var x={props:["items","headers"],data:function(){return{searchValue:"",searchValueDebounced:"",selectFilters:[],itemsFiltered:[],filterHandler:new _,showFilterMenu:!1,headersAllMap:{},headersChoosen:[]}},computed:{filtersEnabledCount:function(){var e=this.selectFilters.filter((function(e){return Array.isArray(e.model)&&e.model.length}));return e.length},headerChoices:function(){return Object.values(this.headersAllMap)},headersChoosenObjs:function(){var e=this;return this.headersChoosen.map((function(t){return e.headersAllMap[t]})).filter((function(e){return!!e}))}},watch:{headersChoosen:function(e){console.log("headersChoosen",{newVal:e})},searchValue:C((function(e){this.searchValueDebounced=e}),300),headers:{immediate:!0,handler:function(e){var t=this;Array.isArray(e)&&(e.filter((function(e){return e.select_filter})).map((function(e){var r=e.value;t.selectFilters.push({name:r,model:[],label:"Select "+e.text,items:[]}),t.filterHandler.registerFilter(r)})),e.map((function(e){t.headersAllMap[e.value]||(t.headersAllMap[e.value]=e)})),this.clearFilters(),this.headersChoosen=e.filter((function(e){return!e.hide})).map((function(e){return e.value})))}},items:{immediate:!0,handler:function(e){var t=this;if(Array.isArray(e)){var r=this.selectFilters;e.map((function(e){r.map((function(t){t.items.push(e[t.name])}))})),r.map((function(e){e.items=h["sortedUniq"](h["sortBy"](e.items))}));var n=e[0];n&&Object.keys(n).map((function(e){t.headersAllMap[e]||(t.headersAllMap[e]={value:e,text:e.toUpperCase()})}))}}}},methods:{clearFilters:function(){this.showFilterMenu=!1,this.itemsFiltered=this.items,this.selectFilters.map((function(e){return e.model=null}))},onChangedSelect:function(){this._setFiltersToHandler(),this._filterItems()},resetColumns:function(){this.headersChoosen=this.headers.map((function(e){return e.value}))},_setFiltersToHandler:function(){var e=this;this.selectFilters.map((function(t){e.filterHandler.updateFilterValue(t.name,t.model)}))},_filterItems:function(){var e=this;this.itemsFiltered=this.items.filter((function(t){return e.filterHandler.runFilter(t)}))}}},F=x,w=Object(o["a"])(F,p,v,!1,null,null,null),k=w.exports,j={install:function(e){e.component("v-data-table-extended",k)}};n["default"].use(d.a),n["default"].use(j),new n["default"]({el:"#app",vuetify:new d.a,render:function(e){return e(u)}})}});
//# sourceMappingURL=app.28e0ed11.js.map