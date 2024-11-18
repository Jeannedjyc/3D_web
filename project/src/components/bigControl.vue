<template>
  <div class="container">
    <form>
      <label v-for="(item, index) in controls" @click="activeFun(item, index)">
        <input type="radio" name="radio" :checked="index === activeVar" />
        <span>{{ item.name }}</span>
      </label>
    </form>
    <tooltip
      :style="{
        visibility: showInfoStyle.show ? 'visible' : 'hidden',
        left: showInfoStyle.x + 'px',
        top: showInfoStyle.y + 'px',
      }"
      :data="showInfoStyle"
    ></tooltip>
  </div>
</template>

<script>
import { loaderFloorManage } from "@/three/floorManage";
import router from "@/router";
import { Model_Present } from "@/three/model";
import tooltip from "@/components/tooltip";

export default {
  name: "",
  router,
  components: {
    tooltip,
  },
  props: {},
  data() {
    return {
      showInfoStyle: {
        show: false,
        x: 0,
        y: 0,
        name: "",
      },
      controls: [
        {
          name: "Model ",
          goFunction: () => {
            Model_Present(window.app);
          },
          backFunction: () => {},
        },
        {
          name: "Onsite ",
          goFunction: () => {
            loaderFloorManage(window.app);
          },
          backFunction: () => {},
        },
        {
          name: " Yard ",
          goFunction: () => {},
          backFunction: () => {},
        },
        {
          name: "Custom ",
          goFunction: () => {
            Model_Present(window.app);
          },
          backFunction: () => {},
        },
        {
          name: "Factory",
          goFunction: () => {
            Model_Present(window.app);
          },
          backFunction: () => {},
        },
        {
          name: "TopView",
          goFunction: () => {
            Model_Present(window.app);
          },
          backFunction: () => {},
        },
      ],
      activeVar: 0,
    };
  },
  watch: {
    activeVar(newVal, oldVal) {
      const oldControl = this.controls.filter(
        (item) => item.name === this.controls[oldVal].name
      );
      oldControl[0].backFunction();
      const newControl = this.controls.filter(
        (item) => item.name === this.controls[newVal].name
      );
      newControl[0].goFunction();
    },
  },
  methods: {
    activeFun(item, index) {
      this.activeVar = index;
    },
    changeLocation() {},
  },
  mounted() {
    this.$EventBus.$on("showInfo", (obj) => {
      this.showInfoStyle = obj;
    });
  },
};
</script>
<style lang="less" scoped>
.back {
  width: 48px;
  position: fixed;
  bottom: 4%;
  left: 25%;
  z-index: 3;
  cursor: pointer;
  font-size: 18px;
  img {
    width: 100%;
  }
  p {
    color: #fff;
    text-align: center;
  }
}

.container form {
  display: flex;
  flex-wrap: wrap;
}

.container label {
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
  margin-right: 3em;
  margin-left: 3em;
  right: 10%;
}

.container label input {
  position: absolute;
  left: -9999px;
}

.container label input:checked + span {
  background-color: #414181;
  color: white;
}

.container label input:checked + span:before {
  box-shadow: inset 0 0 0 0.4375em #00005c;
}

.container label span {
  display: flex;
  align-items: center;
  padding: 0.375em 0.75em 0.375em 0.375em;
  border-radius: 99em;
  transition: 0.25s ease;
  color: #414181;
}

.container label span:hover {
  background-color: #d6d6e5;
}

.container label span:before {
  display: flex;
  flex-shrink: 0;
  content: "";
  background-color: #fff;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-right: 0.375em;
  transition: 0.25s ease;
  box-shadow: inset 0 0 0 0.125em #00005c;
}
</style>
