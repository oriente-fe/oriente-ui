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
export default {
  name: 'BackToTopButton',
  data() {
    return {
      isShown: false
    }
  },
  created() {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { innerHeight, pageYOffset } = window
      this.isShown = pageYOffset > innerHeight
    },
    scrollToTop() {
      window.scrollTo({
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
  box-shadow: 0 2px 1.25rem rgba(0,0,0,0.15);
  z-index: 2;
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
  <BackToTopButton />
</template>
```
</docs>
