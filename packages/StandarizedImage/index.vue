<template>
  <StandarizedContainer :ratio="ratio">
    <img :src="url" />
  </StandarizedContainer>
</template>

<script>
import StandarizedContainer from '@/StandarizedContainer'

export default {
  name: 'StandarizedImage',
  components: {
    StandarizedContainer
  },
  props: {
    /**
     * image url
     */
    url: {
      type: String,
      default: ''
    },
    /**
     * image ratio e.g. 1:1, 4:3, 16:10, 16:9
     */
    ratio: {
      type: String,
      default: '1:1',
      validator: val => {
        return ['1:1', '4:3', '16:10', '16:9'].includes(val)
      }
    }
  }
}
</script>

<docs>
```
<template>
  <div>
    <label>Width:</label>
    <input type="number" step="10" v-model="widthValue" size="4" />px
    <div class="row" :style="{width}">
      <StandarizedImage url="https://placehold.it/1000x1000" ratio="1:1" />
    </div>
    <div class="row" :style="{width}">
      <StandarizedImage url="https://placehold.it/1000x1000" ratio="16:9" />
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
