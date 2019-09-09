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
        return [
          'default',
          'primary',
          'secondary',
          'reverse-secondary',
          'normal'
        ].includes(value)
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
}

.primary {
  color: $white;
  @include linear-gradient(45deg, #ff9436 30%, #ff6600 60%);
  font-weight: bold;
  &:active {
    filter: brightness(0.95);
    transition: 0.3s;
  }
  &:disabled {
    background: rgba($black, 0.15);
  }
}

.secondary {
  color: #266bb7;
  background: $white;
  border: solid 1px #266bb7;
  &:active {
    background: #e8f3ff;
    transition: 0.3s;
  }
  &:disabled {
    color: rgba($black, 0.2);
    border: solid 1px rgba($black, 0.15);
  }
}

.normal {
  background: #fff;
}

.reverse-secondary {
  color: $white;
  background: #266bb7;
}
</style>

<docs>
Default

```jsx
<Button style-type="default">&lt;</Button>
```

Primary

```jsx
<Button style-type="primary">Primary</Button>
```

Secondary

```jsx
<Button style-type="secondary">Secondary</Button>
```

Normal

```jsx
<template>
  <Button style-type="normal">
    <div slot="icon" v-html="icon" v-bind:style="{width: '24px', height: '24px'}" />
    <div slot="default">
      Back
    </div>
  </Button>
</template>

<script>
export default {
  data() {
    return {
      icon: require('~/assets/ic_back.svg')
    }
  }
}
</script>
```

Reverse Secondary

```jsx
<Button style-type="reverse-secondary">Reverse Secondary</Button>
```

</docs>
