<template>
  <div>
    <v-data-table
      v-bind="$attrs"
    >
      <slot></slot>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['filter']
}
</script>

<style>

</style>