<template>
  <div :class="[$style['container'], $style[ratioClass]]">
    <div></div>
    <div>
      <!-- @slot full size component -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'StandarizedContainer',
  props: {
    /**
     * ratio e.g. 1:1, 4:3, 16:10, 16:9
     */
    ratio: {
      type: String,
      default: '1:1',
      validator: val => {
        return ['1:1', '4:3', '16:10', '16:9'].includes(val)
      }
    }
  },
  computed: {
    ratioClass() {
      const [x, y] = this.ratio.split(':')
      return `ratio-${x}-${y}`
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/_mixin.scss';

.container {
  background: $white;
}

.ratio-1-1 {
  @include rwd-image(100%);
}

.ratio-4-3 {
  @include rwd-image(75%);
}

.ratio-16-10 {
  @include rwd-image(62.5%);
}

.ratio-16-9 {
  @include rwd-image(56.25%);
}
</style>

<docs>
```
<template>
  <div>
    <label>Width:</label>
    <input type="number" step="10" v-model="widthValue" size="4" />px
    <div class="row" :style="{width}">
      <StandarizedContainer ratio="1:1">
        <img src="https://picsum.photos/id/47/1000/1000" />
      </StandarizedContainer>
    </div>
    <div class="row" :style="{width}">
      <StandarizedContainer ratio="16:9">
        <iframe src="https://www.youtube.com/embed/jDDy-Vh55to" />
      </StandarizedContainer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      widthValue: 200
    }
  },
  computed: {
    width() {
      return `${this.widthValue}px`
    }
  }
}
</script>
<style scoped>
.row {
  margin: 0 0 8px 0;
}
</style>
```
</docs>
