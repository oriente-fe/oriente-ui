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
      :class="$style.container"
      @click.stop.prevent
      @scroll.self.stop.prevent
      @wheel.self.stop.prevent
      @touchmove.self.stop.prevent
    >
      <div>
        <span
          :class="$style.close"
          @click="close"
          v-html="require('~/assets/ic_close.svg')"
        />
        <div v-if="title" :class="$style.title">
          {{ title }}
        </div>
      </div>

      <div :class="$style.content">
        <!-- @slot modal content -->
        <slot />
      </div>

      <div>
        <!-- @slot modal footer -->
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideUpDialog',
  props: {
    /**
     * modal title
     */
    title: {
      type: String,
      default: ''
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
  align-items: flex-end;

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
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  width: 100%;
  padding: $spacing-2;
  animation: motion_card 0.25s ease-out 0s;
}

.title {
  margin: $spacing-1 0 0;
}

.close {
  position: absolute;
  right: $spacing-1;
  top: $spacing-1;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    cursor: pointer;
  }

  svg {
    width: 40px;
    height: 40px;
  }
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
    bottom: -100vh;
    opacity: 0.5;
  }
  100% {
    bottom: 0px;
    opacity: 1;
  }
}
</style>

<docs>
Usage

```
<template>
  <div>
    <Button
      style-type="default"
      @click="openSlideUpDialog"
      :style="{border: '1px solid #333'}"
      >
      Open SlideUpDialog
    </Button>
    <SlideUpDialog
      :value="isSlideUpDialogShown"
      title="Title"
      @input="closeSlideUpDialog"
    >
      Content
      <div slot="footer">
        Footer
      </div>
    </SlideUpDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSlideUpDialogShown: false
    }
  },
  methods: {
    openSlideUpDialog() {
      this.isSlideUpDialogShown = true
    },
    closeSlideUpDialog() {
      this.isSlideUpDialogShown = false
    }
  }
}
</script>
```
</docs>
