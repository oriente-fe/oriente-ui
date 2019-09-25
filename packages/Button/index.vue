<template>
  <button
    :type="type"
    :class="[$style['button'], $style[styleType]]"
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
     * Define button type
     */
    type: {
      type: String,
      default: 'button'
    },
    /**
     * Define button style
     */
    styleType: {
      type: String,
      default: 'default',
      validator: value => {
        return ['default', 'primary', 'secondary', 'action'].includes(value)
      }
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

  font-size: $fs-16;
  width: 100%;
  height: 44px;
  background: transparent;
  border: 0;
  border-radius: $border-radius - 2px;
  cursor: pointer;
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    opacity: 0.8;
    transition: 0.3s;
  }

  &:disabled {
    cursor: not-allowed;
  }
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
</style>

<docs>
Primary

```jsx
<div v-bind:style="{display:'flex'}">
  <Button style-type="primary">Primary</Button>
  &nbsp;
  <Button style-type="primary" disabled>Primary</Button>
</div>
```

Secondary

```jsx
<div v-bind:style="{display:'flex'}">
  <Button style-type="secondary">Secondary</Button>
  &nbsp;
  <Button style-type="secondary" disabled>Secondary</Button>
</div>
```

Action

```jsx
<div v-bind:style="{display:'flex'}">
  <Button style-type="action">Action</Button>
  &nbsp;
  <Button style-type="action" disabled>Action</Button>
</div>
```

Default

```jsx
<template>
  <div>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      backIcon: require('~/assets/ic_back.svg'),
      closeIcon: require('~/assets/ic_close.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
.close-icon svg {
  width: 16px;
  height: 16px;
}
.back-icon > svg {
  width: 24px;
  height: 24px;
}
</style>
```

</docs>
