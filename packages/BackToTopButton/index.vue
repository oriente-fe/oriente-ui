<template>
  <Button
    :class="[$style.float, { [$style.show]: isShown }]"
    @click="scrollToTop"
    size="medium"
    round
  >
    <span
      :class="$style.icon"
      slot="icon"
      v-html="require('~/assets/ic-arror-top.svg')"
    />
  </Button>
</template>

<script>
/**
 * This component should only be used on client side rendering,
 * and targetEl prop type must be Element or Window.
 */
export default {
  name: 'BackToTopButton',
  props: ['targetEl'],
  data() {
    return {
      isShown: false
    }
  },
  watch: {
    targetEl(el, prevEl) {
      if (prevEl) {
        prevEl.removeEventListener('scroll', this.handleScroll)
      }

      if (el) {
        el.addEventListener('scroll', this.handleScroll)
      }
    }
  },
  mounted() {
    if (this.targetEl) {
      this.targetEl.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    if (this.targetEl) {
      this.targetEl.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll() {
      const {
        innerHeight,
        pageYOffset,
        offsetHeight,
        scrollTop
      } = this.targetEl
      this.isShown =
        this.targetEl === window
          ? pageYOffset > innerHeight
          : scrollTop > offsetHeight
    },
    scrollToTop() {
      this.targetEl.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/extend/flexbox.scss';

.float {
  @extend %flex-center;

  position: fixed;
  right: 6px;
  bottom: $spacing-2;
  box-shadow: 0 2px 1.25rem rgba(0, 0, 0, 0.15);
  z-index: 99;
  transition: 0.3s;
  opacity: 0;
  pointer-events: none;

  &.show {
    opacity: 1;
    pointer-events: auto;
  }
}

.icon {
  width: 1rem;
  height: 1rem;
}
</style>

<docs>
Usage

```
<template>
  <div>
    <div ref="main" class="main">
      <BackToTopButton :targetEl="el" />
      <div class="body" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      el: null
    }
  },
  mounted() {
    this.el = this.$refs.main
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 300px;
  overflow-y: scroll;
}

.body {
  background: rgb(188,255,254);
  background: linear-gradient(0deg, rgba(188,255,254,1) 0%, rgba(0,234,255,1) 100%);
  height: 1000px;
}
</style>
```
</docs>
