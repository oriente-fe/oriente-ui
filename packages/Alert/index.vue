<template>
  <div :class="[$style['alert'], $style[styleType]]">
    <span
      :class="[$style['icon']]"
      v-html="require(`~/assets/ic_order-${styleType}.svg`)"
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
     * Define alert style
     */
    styleType: {
      type: String,
      default: 'confirmed'
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/extend/flexbox.scss';
.alert {
  @extend %flex-center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  color: $white;
  background-color: $gray;
  font-size: $fs-14;
  font-weight: $fw-medium;
  padding: $spacing-2;
  .icon {
    width: 30px;
    height: 30px;
    margin: 0 10px 0 0;
  }
  &.completed {
    background-color: $success;
  }
  &.confirmed {
    background-color: $primary;
  }
  &.cancelled {
    background-color: $cancel;
  }
}
</style>

<docs>
Completed

```jsx
<Alert style-type="completed">
Thank you, your order is completed!
</Alert>
```

Confirmed

```jsx
<Alert style-type="confirmed">
Your order is confirmed.
</Alert>
```

Cancelled

```jsx
<Alert style-type="cancelled">
Sorry, your order was cancelled.
</Alert>
```

</docs>
