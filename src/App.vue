<script setup lang="ts">
import { Calendar } from "./components";
import { WaterFlowLayout } from "./layouts";
</script>

<template>
  <div class="wrapper">
    <h2>Calendar:</h2>
    <Calendar />
    <h2>WaterFlowLayout:</h2>
    <WaterFlowLayout
      class="container"
      :testing="true"
      :equal-each-margin="true"
      :parent-padding-top="15"
      :parent-padding-lef="15"
      :parent-padding-bot="15"
      :child-margin-right="15"
      :child-margin-bottom="15"
      :min-equal-each-margin="15"
    />
  </div>
</template>

<style lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
  }
}
</style>
