<script lang="ts">
const jsFluidEvents = {
  Refresh: "jsFluidLayout:Refresh",
};
export function notifyToJsFluidForRefresh(from: HTMLElement | undefined) {
  from?.dispatchEvent(new CustomEvent(jsFluidEvents.Refresh, { bubbles: true }));
}
</script>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onUpdated } from "vue";
const props = defineProps<{
  equalEachMargin?: boolean; // 设置是否将额外空间平均分配给子元素作为其左右边距
  minEqualEachMargin?: number; // 设置当equalEachMargin为true时盒子间的最小间距
  verticalLeftAlign?: boolean; // 是否优先左对齐

  // 子元素的下外边距和右外边距
  childMarginBottom?: number;
  childMarginRight?: number;

  // 父元素的上内边距和左内边距
  parentPaddingTop?: number;
  parentPaddingLef?: number;
  // 父元素的下内边距和右内边距
  parentPaddingBot?: number;

  // testing mode
  testing?: boolean;
}>();

let colNum = 0; // 列数
let actualColNum = 0; // 实际列数
let childWidth = 0; // 子盒子宽度
let parentWidth = 0; // 父盒子宽度
let parentHight = ref("100%"); // 父盒子高度
let colHeights = [0]; // 第n列代表第n列的高度
let colEleCnts = [0]; // 记录第n列有多少个元素

let childMarginBottom = props.childMarginBottom || 0;
let childMarginRight = props.childMarginRight || 0;
let minEqualEachMargin = props.minEqualEachMargin || 0;
let parentPaddingTop = props.parentPaddingTop || 0;
let parentPaddingLef = props.parentPaddingLef || 0;
let parentPaddingBot = props.parentPaddingBot || 0;

let equalEachMargin = props.equalEachMargin || false;
let verticalLeftAlign = props.verticalLeftAlign || false;

let fix_parenPaddingLeft = 0;
let fix_childMarginRight = 0;

let parent = ref<HTMLElement>();

function refresh() {
  // 父盒子为相对定位
  // parent!.value!.style.position = 'relative'
  // 获取父盒子的宽度
  parentWidth = parent!.value!.clientWidth;
  // 获取子盒子的宽度（子盒子的宽度应当相同，所以直接取第一个）
  childWidth = (parent!.value!.firstElementChild as HTMLElement)?.clientWidth || parentWidth;
  // 计算父盒子一行能放多少个子盒子（计算列数，下取整，最小为1）
  colNum = Math.max(1, Math.floor(parentWidth / childWidth));
  // 实际的列数,因为可能列宽有5列，但实际只有1个元素，实际列宽为1
  actualColNum = Math.min(colNum, parent.value!.childElementCount);
  // 计算多余的宽度，除以列数+1
  let eachSpace = (parentWidth - actualColNum * childWidth) / (actualColNum + 1);

  if (equalEachMargin) {
    if (colNum > 1 && eachSpace <= minEqualEachMargin) {
      // 防止eachSpace很小
      actualColNum -= 1;
      eachSpace = (parentWidth - actualColNum * childWidth) / (actualColNum + 1);
    }

    // 将额外空间平均分配给子元素作为其左右边距
    fix_childMarginRight = eachSpace - childMarginRight;
    fix_parenPaddingLeft = eachSpace - parentPaddingLef;

    if (verticalLeftAlign && colNum > parent.value!.childElementCount) {
      // 实际列数和应有列数不等时，左对齐
      fix_childMarginRight = 0;
      fix_parenPaddingLeft = 0;
    }
  }
  // 用来记录每一列的高度，初始高度都为0
  colHeights = new Array(actualColNum).fill(0);
  // 用来记录每一列的元素个数，初始个数为0
  colEleCnts = new Array(actualColNum).fill(0);
  // 用来记录子元素中，最高的哪一列
  let childMaxHightCol = 0;
  // 遍历子元素
  parent!.value!.childNodes.forEach((node) => {
    if (node.nodeType != Node.ELEMENT_NODE) return;
    let childNode = node as HTMLElement;
    // 找到高度最小的列作为目标列
    let heightMinColIdx = 0;
    let minHegiht = colHeights[heightMinColIdx];
    for (let idx = 0; idx < colHeights.length; idx++) {
      const val = colHeights[idx];
      if (minHegiht > val) {
        heightMinColIdx = idx;
        minHegiht = val;
      }
    }
    // 当前所在列
    let curColIdx = heightMinColIdx;
    // 当前所在行=当前列已经存在的元素个数
    let curRowIdx = colEleCnts[curColIdx];
    // 当前元素的top = 当前列已经存在的元素的总高度
    let curElementOffsetTop = colHeights[curColIdx];
    // 当前所在行的left = 当前所在的列 * 每列的宽度
    let curElementOffsetLeft = curColIdx * childWidth;

    // 修正量
    let fix_left = fix_parenPaddingLeft + curColIdx * fix_childMarginRight;

    // 计算位置
    let top = parentPaddingTop + curElementOffsetTop + curRowIdx * childMarginBottom;
    let left = parentPaddingLef + curElementOffsetLeft + curColIdx * childMarginRight + fix_left;
    // 通过绝对定位确定位置（相对于父盒子定位）
    // childNode.style.position = 'absolute'
    childNode.style.top = top + "px";
    childNode.style.left = left + "px";
    // 把当前元素高度累加进去
    colHeights[curColIdx] += childNode.offsetHeight;
    colEleCnts[curColIdx] += 1;
    childMaxHightCol = Math.max(childMaxHightCol, top + childNode.offsetHeight + childMarginBottom);
  });
  parentHight.value = childMaxHightCol + parentPaddingBot + "px";
}
function delayAction(delay: number, action: Function) {
  let timer: any = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      requestAnimationFrame(() => {
        action();
      });
    }, delay);
  };
}
let delayRefresh = delayAction(100, refresh);

function listenChildRefrushReq() {
  onMounted(() => {
    parent.value!.addEventListener(jsFluidEvents.Refresh, delayRefresh);
  });
  onBeforeUnmount(() => {
    parent.value!.removeEventListener(jsFluidEvents.Refresh, delayRefresh);
  });
}

function HandleResizeEvent() {
  onMounted(() => {
    window.addEventListener("resize", delayRefresh);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", delayRefresh);
  });
}

listenChildRefrushReq();
HandleResizeEvent();

onMounted(delayRefresh);
onUpdated(delayRefresh);
</script>

<template>
  <div
    ref="parent"
    class="fluid-wrapper common-scrollbar"
    :style="{ height: parentHight }"
    @mouseenter="delayRefresh"
    @mouseleave="delayRefresh"
    @input="delayRefresh"
  >
    <slot v-if="!testing" />
    <template v-else>
      <div class="test-item" style="height: 200px">1</div>
      <div class="test-item" style="height: 400px">2</div>
      <div class="test-item" style="height: 300px">3</div>
      <div class="test-item" style="height: 300px">4</div>
      <div class="test-item" style="height: 200px">5</div>
      <div class="test-item" style="height: 100px">6</div>
    </template>
  </div>
</template>

<style scoped lang="less">
.fluid-wrapper {
  width: 100%;
  height: 100%;
  min-height: 100%;
  position: relative;

  & > :nth-child(n) {
    position: absolute;
    top: 100%;
    left: 100%;

    // https://cubic-bezier.com/#.25,0,0,1
    transition:
      left cubic-bezier(0.25, 0, 0, 1) 0.5s,
      top cubic-bezier(0.25, 0, 0, 1) 0.5s;

    &.test-item {
      width: 300px; // 用户自定义,但所有子元素的宽度应当一致
      height: 400px; // 用户自定义，高度应当是可以任意的

      background-color: #eee;
      border: 1px dashed black;

      counter-increment: item-counter;

      &::after {
        position: absolute;
        top: 10px;
        right: 10px;

        display: block;
        width: 30px;
        height: 30px;

        text-align: center;
        line-height: 30px;
        background-color: #000;
        color: #fff;
        content: counter(item-counter);
      }
    }
  }
}
</style>
