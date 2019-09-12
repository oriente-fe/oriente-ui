<template>
  <div
    v-if="value"
    :class="$style.modal"
    @click="close"
    @scroll.self.stop.prevent
    @wheel.self.stop.prevent
    @touchmove.self.stop.prevent
  >
    <div
      :class="[$style.container, $style[size]]"
      @click.stop.prevent
      @scroll.self.stop.prevent
      @wheel.self.stop.prevent
      @touchmove.self.stop.prevent
    >
      <!-- @slot modal header -->
      <slot name="header">
        <div :class="$style.header" />
      </slot>

      <div :class="$style.content">
        <!-- @slot modal content -->
        <slot />
      </div>

      <!-- @slot modal footer -->
      <slot name="footer">
        <div :class="$style.footer" />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    /**
     * size of dialog
     */
    size: {
      type: String,
      default: 'large',
      validator: val => {
        return ['small', 'large'].includes(val)
      }
    },
    /**
     * show / hide
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * whether allow click outside to close dialog
     */
    persistent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      if (this.persistent) {
        return false
      }
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/extend/flexbox.scss';
@import '~/styles/extend/card.scss';

.modal {
  @extend %flex-center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($black, 0.55);
  z-index: 999;
  animation: motion_bg 0.3s ease-out 0s;
}
.container {
  @extend %card;
  animation: motion_card 0.25s ease-out 0s;
}
.content {
  @extend %card-content;
  p {
    line-height: $fs-16;
  }
}
.small {
  min-width: 200px;
  max-width: 80vw;
  min-height: 130px;
  max-height: 50vh;
  text-align: center;
}
.large {
  width: 90vw;
  max-height: 70vh;
}
.header,
.footer {
  @extend %card-footer;
}
@keyframes motion_bg {
  0% {
    background: rgba($black, 0);
  }
  100% {
    background: rgba($black, 0.55);
  }
}
@keyframes motion_card {
  0% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<docs>

Usage

```jsx
<template>
  <div>
    <Button
      style-type="default"
      @click="openDialog"
      :style="{border: '1px solid #333'}"
      >
      Open Dialog
    </Button>
      <Dialog
        :value="isDialogShown"
        @input="closeDialog"
        >
        <div slot="header">
          Header
        </div>
        Content
        <div slot="footer">
          Footer
        </div>
      </Dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDialogShown: false
    }
  },
  methods: {
    openDialog() {
      this.isDialogShown = true
    },
    closeDialog() {
      this.isDialogShown = false
    }
  }
}
</script>
```
</docs>
