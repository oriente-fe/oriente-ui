<template>
  <button
    :type="type"
    :class="[
      $style['button'],
      $style[styleType],
      $style[size],
      { [$style.round]: round }
    ]"
    @click="$emit('click', $event)"
  >
    <!-- @slot button icon -->
    <slot name="icon" />
    <!-- @slot button content -->
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    /**
     * button type
     */
    type: {
      type: String,
      default: 'button'
    },
    /**
     * large, medium
     */
    size: {
      type: String,
      default: 'large',
      validator: value => {
        return ['large', 'medium'].includes(value)
      }
    },
    /**
     * default, primary, secondary, action, info
     */
    styleType: {
      type: String,
      default: 'default',
      validator: value => {
        return ['default', 'primary', 'secondary', 'action', 'info'].includes(
          value
        )
      }
    },
    /**
     * whether is circled
     */
    round: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/_mixin.scss';
@import '~/styles/extend/flexbox.scss';

.button {
  @extend %flex-center;

  width: 100%;
  background: transparent;
  border: 0;
  border-radius: $border-radius - 2px;
  cursor: pointer;
  padding: 0;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    opacity: 0.8;
    transition: 0.3s;
  }

  &:disabled {
    cursor: not-allowed;
  }
}

@mixin round($size) {
  &.round {
    width: $size;
    height: $size;
    border-radius: 50%;
  }
}

.large {
  $size: 48px;
  @include round($size);

  font-size: $fs-16;
  height: $size;
}

.medium {
  $size: 36px;
  @include round($size);

  font-size: $fs-14;
  height: $size;
}

.default {
  background: $white;
}

.primary {
  color: $white;
  background: $primary;
  &:active {
    background: $primary-dark;
    opacity: 1;
    transition: 0.3s;
  }
  &:disabled {
    opacity: 0.4;
  }
}

.secondary {
  color: $primary;
  background: $white;
  border: solid 1px $primary;
  &:active {
    background: $primary-light;
    opacity: 1;
    transition: 0.3s;
  }
  &:disabled {
    opacity: 0.4;
  }
}

.action {
  color: $white;
  background: $secondary;
  &:active {
    background: $secondary-dark;
    opacity: 1;
    transition: 0.3s;
  }
  &:disabled {
    opacity: 0.4;
  }
}

.info {
  color: #777;
  background: $white;
  border: 1px solid #dfdfdf;
  &:active {
    background: #f7f7f7;
    opacity: 1;
    transition: 0.3s;
  }
  &:disabled {
    opacity: 0.4;
  }
}
</style>

<docs>
Primary

```jsx
<div v-bind:style="{display:'flex',alignItems:'center'}">
  <Button style-type="primary">Primary Large</Button>
  &nbsp;
  <Button size="medium" style-type="primary" disabled>Primary Medium</Button>
</div>
```

Secondary

```jsx
<div v-bind:style="{display:'flex',alignItems:'center'}">
  <Button style-type="secondary">Secondary Large</Button>
  &nbsp;
  <Button size="medium" style-type="secondary" disabled>Secondary Medium</Button>
</div>
```

Action

```jsx
<div v-bind:style="{display:'flex',alignItems:'center'}">
  <Button style-type="action">Action Large</Button>
  &nbsp;
  <Button size="medium" style-type="action" disabled>Action Medium</Button>
</div>
```

Info

```jsx
<div v-bind:style="{display:'flex',alignItems:'center'}">
  <Button style-type="info">Info Large</Button>
  &nbsp;
  <Button size="medium" style-type="info" disabled>Info Medium</Button>
</div>
```

Round

```jsx
<div v-bind:style="{display:'flex',alignItems:'center',justifyContent:'space-evenly'}">
  <Button style-type="info" round>
    <i slot="icon" class="fas fa-times"></i>
  </Button>
  <Button size="medium" round style-type="info" disabled>
    <i slot="icon" class="fas fa-times"></i>
  </Button>
</div>
```

Default

```jsx
<template>
  <div v-bind:style="{display:'flex'}">
    <Button style-type="default">
      <i class="fas fa-times"></i>
    </Button>
    &nbsp;
    <Button style-type="default">
      <i slot="icon" class="fas fa-long-arrow-alt-left"></i>
      <div slot="default">
        &nbsp;Back
      </div>
    </Button>
  </div>
</template>
```

</docs>
