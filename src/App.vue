<script setup lang="ts">
import { Calendar } from "./components";
import { WaterFlowLayout } from "./layouts";
</script>

<template>
  <div class="wrapper">
    <h2>Calendar:</h2>
    <Calendar class="Calendar" />
    <Calendar class="Calendar" :is-dark="true" />
    <h2>WaterFlowLayout:</h2>
    <WaterFlowLayout
      class="WaterFlowLayout"
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
@import url(./styles/软萌小果冻.css);
.wrapper {
  width: 100%;
  height: 100%;
  .Calendar {
    font-family: "软萌小果冻";
    margin: 0 auto;
    width: fit-content;
    height: fit-content;
    border: 1px solid #eee;
  }
  .WaterFlowLayout {
    width: 100%;
    height: 100%;
  }
}
</style>
