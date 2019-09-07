<template>
  <div :class="$style['fixed-button']">
    <div :class="$style['container']">
      <Button
        :disabled="disabled"
        :style-type="styleType"
        :class="$style.button"
        @click="$emit('click', $event)"
      >
        <!-- @slot button text -->
        <slot />
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/Button'

export default {
  name: 'FixedButton',
  components: {
    Button
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    styleType: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/extend/flexbox.scss';
@import '~/styles/_mixin.scss';
.fixed-button {
  margin: $spacing-2 0 0;
  height: $header-height;
}
.container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: $white;
  padding: $spacing-1;
  z-index: 99;
}
.button {
  width: 100%;
  font-size: $fs-14;
}
</style>

<docs>

Usage

```jsx
<template>
  <div>
    <Button
      style-type="default"
      @click="show"
      :style="{border: '1px solid #333'}"
      >
      Open FixedButton
    </Button>
    <FixedButton
      v-if="isShown"
      styleType="primary"
      @click="hide"
      >
      Close FixedButton
    </FixedButton>
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
    show() {
      this.isShown = true
    },
    hide() {
      this.isShown = false
    }
  }
}
</script>
```
</docs>
