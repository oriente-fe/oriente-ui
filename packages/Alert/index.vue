<template>
  <div :class="[$style['alert'], $style[styleType]]">
    <span
      :class="[$style['icon']]"
      v-html="require(`~/assets/ic_order-${iconName}.svg`)"
    />
    <!-- @slot message text -->
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    /**
     * reminder, processing, success, cancel, danger
     */
    styleType: {
      type: String,
      default: 'reminder',
      validator: val =>
        ['reminder', 'processing', 'success', 'cancel', 'danger'].includes(val)
    }
  },
  computed: {
    iconName() {
      switch (this.styleType) {
        case 'success':
          return 'success'
        case 'cancel':
        case 'danger':
          return 'cancel'
        case 'reminder':
        case 'processing':
        default:
          return 'reminder'
      }
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_all.scss';

.alert {
  @extend %flex-center;
  justify-content: flex-start;

  width: 100%;
  box-sizing: border-box;
  font-size: $fs-12;
  color: $white;
  padding: 7px;
  border-radius: 4px;
  user-select: none;

  .icon {
    width: 30px;
    height: 30px;
    margin: 0 10px 0 0;
  }
  &.reminder {
    background-color: $reminder;
  }
  &.processing {
    background-color: $processing;
  }
  &.success {
    background-color: $success;
  }
  &.cancel {
    background-color: $cancel;
  }
  &.danger {
    background-color: $danger;
  }
}
</style>

<docs>
Reminder

```jsx
<Alert style-type="reminder">
Your order is confirmed.
</Alert>
```

Processing

```jsx
<Alert style-type="processing">
Your order is being processed.
</Alert>
```

Success

```jsx
<Alert style-type="success">
Thank you, your order is completed!
</Alert>
```

Cancel

```jsx
<Alert style-type="cancel">
Sorry, your order was cancelled.
</Alert>
```

Danger

```jsx
<Alert style-type="danger">
Sorry, your order was failed.
</Alert>
```
</docs>
