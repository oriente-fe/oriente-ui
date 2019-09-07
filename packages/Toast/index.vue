<template>
  <div :class="{ [$style['container']]: true, [$style['hidden']]: !value }">
    <div :class="$style['toast']">
      <!-- @slot toast content -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    /**
     * show / hide
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * time duration
     */
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      timer: null
    }
  },
  watch: {
    value(val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('input', false)
      }, this.duration)
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/extend/flexbox.scss';

.container {
  @extend %flex-center;

  position: fixed;
  width: 100%;
  bottom: 100px;
  z-index: 999;
  opacity: 1;
  transition: 0.5s all;
}

.toast {
  @extend %flex-center;

  font-size: $fs-14;
  line-height: $fs-20;
  color: #fff;
  text-align: center;
  width: calc(100% - 80px);
  padding: 14px 10px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.8);
}

.hidden {
  z-index: -1;
  opacity: 0;
}
</style>

<docs>
```jsx
<template>
  <div>
    <Button
      style-type="default"
      @click="open"
      :style="{border: '1px solid #333'}"
      >
      Open Toast
    </Button>
      <Toast :value="isShown" @input="close">
      This is a toast.
      </Toast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShown: false
    }
  },
  methods: {
    open() {
      this.isShown = true
    },
    close() {
      this.isShown = false
    }
  }
}
</script>
```
</docs>
