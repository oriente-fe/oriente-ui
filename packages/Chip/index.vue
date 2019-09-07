<template>
  <span :class="[$style['label-chips'], $style[styleType]]">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    /**
     * Define different chip style
     */
    styleType: {
      type: String,
      default: 'primary',
      validator: val =>
        [
          'primary',
          'secondary',
          'success',
          'cancel',
          'error',
          'reverse-warn'
        ].includes(val)
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
.label-chips {
  font-size: $fs-12;
  color: $white;
  background-color: $gray;
  border-radius: 2px;
  padding: 1px $spacing-1;
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }

  &.secondary {
    background-color: $secondary;
  }

  &.success {
    background-color: $success;
  }

  &.primary {
    background-color: $primary;
  }

  &.cancel {
    background-color: $cancel;
  }

  &.error {
    background-color: $fail;
  }
  &.reverse-warn {
    color: $warn;
    border: 1px solid $warn;
    background-color: transparent;
  }
}
</style>

<docs>
Completed, Paid, Delivered

```jsx
<Chip style-type="success">
Completed
</Chip>
```

Confirmed, In Progress

```jsx
<Chip style-type="primary">
Confirmed
</Chip>
```

Cancelled, Unfullfilled, Expired

```jsx
<Chip style-type="cancel">
Cancelled
</Chip>
```

Unpaid

```jsx
<Chip style-type="error">
Unpaid
</Chip>
```

Reverse Warn

```jsx
<Chip style-type="reverse-warn">
Reverse Warn
</Chip>
```
</docs>
