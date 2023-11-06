<script lang="ts">
export type LocaleDateString = string;
// Style is like HTMLAttributes["style"]
export type Style = Array<CSSProperties>;
export type StyleMap = Map<LocaleDateString, Style>;
export type CalendarValModel = {
  title?: string;
  year?: number;
  styleMap?: StyleMap;
};
</script>
<script setup lang="ts">
import dayjs from "dayjs";
import { LayTooltip } from "@layui/layui-vue";
import "@layui/layui-vue/lib/index.css";
import { CSSProperties, onMounted, ref, defineModel, watchEffect, onUpdated } from "vue";

const wekMap = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const monMap = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];
const modelValData = defineModel<CalendarValModel>({ required: false, local: true });
const calendarData = ref({
  // 年数
  fullYear: 0,
  // bricksDiv的列数
  bricksDivColNum: 0,
  // calendarDiv的列数
  calendarDivColNum: 0,
  // 前缀占位符个数
  prefixWiteSpaceNum: 0,
  // 后缀占位符个数
  suffixWiteSpaceNum: 0,
  map: new Map<
    string,
    {
      date: Date;
      style?: Style;
    }
  >(),
});

function loadCalendar(year?: number) {
  let yearDate = year ? dayjs().set("year", year) : dayjs();
  let firstDayOfYear = yearDate.startOf("year").startOf("day");
  let lastDayOfYear = yearDate.endOf("year").startOf("day");
  calendarData.value.map = new Map();
  for (
    let t = firstDayOfYear;
    t.isBefore(lastDayOfYear) || t.isSame(lastDayOfYear);
    t = t.add(1, "day")
  ) {
    let thatDay = t.toDate();
    calendarData.value.map.set(thatDay.toLocaleDateString(), { date: thatDay });
  }
  calendarData.value.fullYear = yearDate.get("year");
  // 获取星期
  let dayOfWeek_firstDay = firstDayOfYear.get("day") == 0 ? 7 : firstDayOfYear.get("day");
  let dayOfWeek_lastDay = lastDayOfYear.get("day") == 0 ? 7 : lastDayOfYear.get("day");
  // 如果本年第一天是周三，就补3-1=2个占位符
  let prefixWiteSpaceNum = dayOfWeek_firstDay - 1;
  // 如果本年最后一天是周三，就补7-3=4个占位符
  let suffixWiteSpaceNum = 7 - dayOfWeek_lastDay;
  calendarData.value.prefixWiteSpaceNum = prefixWiteSpaceNum;
  calendarData.value.suffixWiteSpaceNum = suffixWiteSpaceNum;
  // 列数，用于计算宽度
  calendarData.value.bricksDivColNum = Math.ceil(
    (calendarData.value.map.size + prefixWiteSpaceNum + suffixWiteSpaceNum) / 7,
  );
  // 列数，用于自动计算单位宽度用于支持响应式,4是因为calendarDiv的paddingleft=4*boxWidth
  calendarData.value.calendarDivColNum = calendarData.value.bricksDivColNum + 4 + 1;
}

function loadModelData() {
  if (modelValData.value?.styleMap) {
    for (let { 0: date, 1: style } of modelValData.value.styleMap.entries()) {
      if (calendarData.value.map.has(date)) calendarData.value.map.get(date)!.style = style;
    }
  }
}

let brickWidth = ref(18);
let minBrickWidth = 15;
let maxBrickWidth = 20;

// 同步css变量到brickWidth
function syncBrickWidth() {
  document.body.style.setProperty("--brick-box-width", brickWidth.value + "px");
  document.body.style.setProperty("--brick-box-fntsz", 0.8 * brickWidth.value + "px");
}

function refresh() {
  syncBrickWidth();
  loadCalendar(modelValData?.value?.year);
  loadModelData();
}

// 执行一次，并在依赖数据更新时自动执行
watchEffect(refresh);
// ---------------------------------------------defineProps----------------------------------------------------
let { enableAutoResize: enabeAutoResize, isDark } = defineProps({
  enableAutoResize: {
    type: Boolean,
    require: false,
    default: false,
  },
  isDark: {
    type: Boolean,
    require: false,
    default: false,
  },
});

let calWrpElRef = ref<HTMLElement | undefined>(undefined);
// 根据父盒子宽度自动重设宽度
function autoResize() {
  if (calWrpElRef.value) {
    let width = 0;
    width = calWrpElRef.value.clientWidth / calendarData.value.calendarDivColNum;
    width = Math.max(minBrickWidth, Math.min(maxBrickWidth, width)); // 限制其范围
    brickWidth.value = Math.floor(width);
  }
}
if (enabeAutoResize) {
  onMounted(autoResize);
  onMounted(() => window.addEventListener("resize", autoResize));
  onUpdated(() => window.addEventListener("resize", autoResize));
}
</script>

<template>
  <div class="calendar-wrapper" ref="calWrpElRef" :dark="isDark">
    <div class="calendar">
      <h2 class="titleName" v-if="modelValData?.title">{{ modelValData.title }}</h2>
      <div
        class="bricks"
        :style="{
          minWidth: calendarData.bricksDivColNum * brickWidth + 'px',
          minHeight: 7 * brickWidth + 'px',
        }"
      >
        <div class="yearName">{{ calendarData.fullYear + "年" }}</div>
        <div class="weekName" v-for="idx in 7" :style="{ top: (idx - 1) * brickWidth + 'px' }">
          {{ wekMap[idx - 1] }}
        </div>
        <div class="brick" v-for="_idx in calendarData.prefixWiteSpaceNum">
          <!-- 占位符 -->
          <div style="opacity: 0">_</div>
        </div>
        <div
          class="brick"
          v-for="({ '0': key, '1': val }, _idx) in calendarData.map"
          :id="key"
          :class="{ differentMonth: val.date.getMonth() % 2 == 1 }"
        >
          <div class="monthName" v-if="val.date.getDate() == 1">
            {{ monMap[val.date.getMonth()] }}
          </div>
          <LayTooltip position="bottom" :enterable="false" :is-dark="isDark">
            <template v-slot:content>
              <div class="content">
                <!-- 没有传入值就默认显示日期 -->
                <span class="title">{{ val.date.toLocaleDateString() }}</span>
                <div class="slot-box-wrapper">
                  <slot :date="key">
                    <!-- 插槽 -->
                  </slot>
                </div>
              </div>
            </template>
            <div class="box">
              <div class="style" :style="val.style"></div>
              <div class="text">{{ val.date.getDate() }}</div>
            </div>
          </LayTooltip>
        </div>
        <div class="brick" v-for="_idx in calendarData.suffixWiteSpaceNum">
          <!-- 占位符 -->
          <div style="opacity: 0">_</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
:root {
  --brick-box-width: 18px;
  --brick-box-fntsz: calc(0.8 * var(--brick-box-width));
}
</style>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.calendar-wrapper {
  --calendar-light-primary-color: #fff;
  --calendar-light-second-color: #eee;
  --calendar-light-fnt-color: #000;

  --calendar-dark-primary-color: #222;
  --calendar-dark-second-color: #333;
  --calendar-dark-fnt-color: #ddd;
  & {
    --calendar-primary-color: var(--calendar-light-primary-color);
    --calendar-second-color: var(--calendar-light-second-color);
    --calendar-fnt-color: var(--calendar-light-fnt-color);
  }
  &[dark="true"] {
    --calendar-primary-color: var(--calendar-dark-primary-color);
    --calendar-second-color: var(--calendar-dark-second-color);
    --calendar-fnt-color: var(--calendar-dark-fnt-color);
  }
}
.calendar-wrapper {
  height: fit-content;
  width: 100%;
  color: var(--calendar-fnt-color);
  background-color: var(--calendar-primary-color);
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: var(--calendar-primary-color);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--calendar-second-color);
  }
  .calendar {
    margin: 0 auto;
  }
}
.calendar {
  font-size: var(--brick-box-fntsz);

  width: fit-content;
  height: fit-content;

  background-color: var(--calendar-primary-color);
  padding-top: calc(1 * var(--brick-box-width));
  padding-bottom: calc(1 * var(--brick-box-width));
  padding-left: calc(4 * var(--brick-box-width));
  padding-right: calc(1 * var(--brick-box-width));

  .titleName {
    width: 100%;
    text-align: center;
    font-size: calc(1.2 * var(--brick-box-fntsz));
    line-height: calc(1.2 * var(--brick-box-fntsz));
  }
  .bricks {
    margin-top: calc(1 * var(--brick-box-width));

    height: calc(7 * var(--brick-box-width));
    width: fit-content;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center; //侧轴不要拉伸

    background-color: var(--calendar-primary-color);

    box-sizing: content-box; // width = contentWidth
    border-bottom: 1px solid var(--calendar-second-color);
    border-right: 1px solid var(--calendar-second-color);

    .brick {
      flex: 1;
      width: var(--brick-box-width);
      height: var(--brick-box-width);
      line-height: var(--brick-box-width);
      text-align: center;
      word-break: keep-all;
      overflow: visible;

      border-top: 1px solid var(--calendar-second-color);
      border-left: 1px solid var(--calendar-second-color);
      background-color: var(--calendar-primary-color);
      &.differentMonth {
        border-color: var(--calendar-primary-color);
        background-color: var(--calendar-second-color);
      }
      .box {
        position: relative;
        // 必须设置，因为脱离文档流了
        width: var(--brick-box-width);
        height: var(--brick-box-width);
        .text {
          z-index: 222;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .style {
          // 居中
          z-index: 111;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);

          // 计算宽高，边框的宽
          box-sizing: border-box;
          width: calc(0.85 * var(--brick-box-width));
          height: calc(0.85 * var(--brick-box-width));

          // 背景裁剪
          background-clip: content-box;
          // 默认边框宽度和style
          border-width: calc(0.15 / 2 * var(--brick-box-width));
          border-style: dashed;
          border-color: transparent;
        }
      }
    }
    position: relative;

    .yearName {
      display: inline-block;
      width: fit-content;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%) translateX(-100%);
    }
    .monthName {
      display: inline-block;
      width: fit-content;
      position: absolute;
      top: 0;
      transform: translateY(-100%);
    }

    .weekName {
      display: inline-block;
      width: fit-content;
      height: var(--brick-box-width);
      position: absolute;
      left: 0;
      transform: translateX(-100%);
    }
  }
}
//
.layui-popper {
  max-width: unset;
  width: fit-content;
  text-align: center;
  .content {
    .title {
      display: inline-block;
      width: 100%;
      text-align: center;
      line-height: var(--brick-box-width);
      font-size: var(--brick-box-fntsz);
    }
    .slot-box-wrapper {
      line-height: var(--brick-box-width);
      font-size: var(--brick-box-fntsz);
    }
  }
}
</style>
