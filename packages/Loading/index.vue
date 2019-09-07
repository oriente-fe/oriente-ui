<template>
  <div :class="[$style['container'], { [$style['fixed']]: mode === 'fixed' }]">
    <span
      :class="[$style['icon'], { [$style['dark']]: mask === 'dark' }]"
      v-html="mask === 'dark' ? darkIcon : icon"
    >
    </span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    mode: {
      type: String,
      default: 'absolute',
      validator: val => {
        return ['absolute', 'fixed'].includes(val)
      }
    },
    mask: {
      type: String,
      default: 'default',
      validator: val => {
        return ['default', 'dark'].includes(val)
      }
    }
  },
  data() {
    return {
      icon: require('~/assets/loading.svg'),
      darkIcon: require('~/assets/loading_img.svg')
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/extend/flexbox.scss';
@import '~/styles/_variables.scss';

.container {
  @extend %flex-center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.dark {
  @extend %flex-center;

  background: rgba($black, 0.8);
  border-radius: $border-radius;
}

.icon {
  width: 58px;
  height: 58px;
}

.fixed {
  position: fixed;

  svg {
    width: 35px;
    height: 35px;
  }
}
</style>

<docs>
Default

```jsx
<div :style="{position: 'relative', width: '100%', height: '50px'}">
  <Loading />
</div>
```

Dark

```jsx
<template>
  <div>
    <Button
      style-type="default"
      @click="open"
      :style="{border: '1px solid #333'}"
      >
      Open Loading
    </Button>
    <Loading
      v-if="loading"
      mode="fixed"
      mask="dark"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    open() {
      this.loading = true
      setTimeout(() => this.close(), 1500)
    },
    close() {
      this.loading = false
    }
  }
}
</script>
```
</docs>
