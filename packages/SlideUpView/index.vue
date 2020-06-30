<template>
  <div :class="[$style.container, { [$style['hidden']]: !value }]">
    <!-- @slot modal header -->
    <slot name="header">
      <Header>
        <template slot="left">
          <span
            :class="$style.close"
            @click="close"
            v-html="require('~/assets/ic_close.svg')"
          />
        </template>
        <div v-if="title" :class="$style.title">{{ title }}</div>
        <div slot="right"></div>
      </Header>
    </slot>

    <div :class="$style.content" ref="content">
      <!-- @slot modal content -->
      <slot />
    </div>

    <!-- @slot modal footer -->
    <slot name="footer"></slot>
  </div>
</template>

<script>
import {
  enableBodyScroll,
  disableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'

export default {
  name: 'SlideUpView',
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
    }
  },
  data() {
    return {
      touchDeltaY: 0
    }
  },
  watch: {
    value(val) {
      const target = this.$refs.content
      if (val) {
        disableBodyScroll(target)
      } else {
        enableBodyScroll(target)
      }
    }
  },
  beforeDestory() {
    clearAllBodyScrollLocks()
  },
  methods: {
    close() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/extend/flexbox.scss';
@import '~/styles/extend/card.scss';

%fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 1000;
}

.modal {
  @extend %fullscreen;

  background: rgba($black, 0.55);
  animation: motion_bg 0.3s ease-out 0s;
}

.container {
  @extend %fullscreen;
  @extend %flex-space-between;
  @extend %card;
  border-radius: 0;

  transform: translateY(0%);
  transition: 0.3s;

  &.hidden {
    transform: translateY(100%);
  }
}

.content {
  flex: 1;
  overflow: auto;
  width: 100%;
}

.title {
  font-weight: bold;
}

.close {
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
</style>

<docs>
Usage

```
<template>
  <div>
    <Button
      style-type="default"
      @click="openSlideUpView"
      :style="{ border: '1px solid #333' }"
    >
      Open SlideUpView
    </Button>
    <SlideUpView v-model="isSlideUpViewShown">
      <div slot="header">
        <span @click="closeSlideUpView">x</span>
      </div>
      Content
      <Button
        slot="footer"
        styleType="primary"
        @click="closeSlideUpView"
      >
        Close Button
      </Button>
    </SlideUpView>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSlideUpViewShown: false
    }
  },
  methods: {
    openSlideUpView() {
      this.isSlideUpViewShown = true
    },
    closeSlideUpView() {
      this.isSlideUpViewShown = false
    }
  }
}
</script>
```
</docs>
