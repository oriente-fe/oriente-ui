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
     * reminder, processing, success, cancel, danger
     */
    styleType: {
      type: String,
      default: 'reminder',
      validator: val =>
        ['reminder', 'processing', 'success', 'cancel', 'danger'].includes(val)
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_all.scss';

.label-chips {
  display: inline-block;
  font-size: $fs-12;
  line-height: 1.67;
  color: $white;
  background-color: $gray;
  border-radius: 2px;
  padding: 0 6px;
  user-select: none;
  white-space: nowrap;

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
<Chip style-type="reminder">
Confirmed
</Chip>
```

Processing

```jsx
<Chip style-type="processing">
Pending
</Chip>
```

Success

```jsx
<Chip style-type="success">
Completed
</Chip>
```

Cancel

```jsx
<Chip style-type="cancel">
Cancelled
</Chip>
```

Danger

```jsx
<Chip style-type="danger">
Failed
</Chip>
```
</docs>
