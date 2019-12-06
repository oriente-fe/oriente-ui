<template>
  <Dialog
    :value="value"
    :title="title"
    size="large"
    @input="$emit('input', $event)"
  >
    <div slot="header">
      <span
        :class="$style.close"
        @click="close"
        v-html="require('~/assets/ic_close.svg')"
      >
      </span>
      <div v-if="title" :class="$style.title">
        {{ title }}
      </div>
    </div>
    <!-- @slot modal content -->
    <slot />
  </Dialog>
</template>

<script>
import Dialog from '@/Dialog'

export default {
  name: 'Modal',
  components: { Dialog },
  props: {
    /**
     * show / hide
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * modal title
     */
    title: {
      type: String,
      default: null
    }
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
@import '~/styles/extend/card.scss';

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

.title {
  @extend %card-title;
}
</style>

<docs>

Usage

```jsx
<template>
  <div>
    <Button
      style-type="default"
      @click="openModal"
      :style="{border: '1px solid #333'}"
      >
      Open Modal
    </Button>
      <Modal
        title="Title"
        :value="isModalShown"
        @input="closeModal"
        >
        Content
      </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalShown: false
    }
  },
  methods: {
    openModal() {
      this.isModalShown = true
    },
    closeModal() {
      this.isModalShown = false
    }
  }
}
</script>
```
</docs>
