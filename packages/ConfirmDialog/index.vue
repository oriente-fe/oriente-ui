<template>
  <Dialog persistent size="small" :value="value" :class="$style.dialog">
    {{ message }}
    <div slot="footer" :class="$style.actions" @click="confirm">
      {{ buttonText }}
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/Dialog'

export default {
  name: 'ConfirmDialog',
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
     * dialog content
     */
    message: {
      type: String,
      default: null
    },
    /**
     * dialog button text
     */
    buttonText: {
      type: String,
      default: 'Ok'
    }
  },
  methods: {
    confirm() {
      this.$emit('input', false)
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/extend/card.scss';
.dialog {
  div {
    font-size: $fs-14;
    line-height: $fs-20;

    > div:first-child {
      padding-top: $spacing-4;
    }
  }

  .actions {
    @extend %card-actions;

    color: $primary;
    text-align: center;
    margin-top: $spacing-4;
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
      Open Confirm Dialog
    </Button>
      <ConfirmDialog
        message="Content to confirm"
        button-text="I agree"
        v-model="isDialogShown"
        @confirm="confirm"
        />
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
    confirm() {
      console.log('confirmed')
    }
  }
}
</script>
```
</docs>
