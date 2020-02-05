<template>
  <div :class="$style['container']">
    <label :class="$style['label']">
      {{ label }}
      <div
        :class="[
          $style['input'],
          $style[size],
          $style[`${styleType}-bg`],
          { [$style['error']]: !!error }
        ]"
      >
        <div
          v-if="$slots.prependIcon"
          :class="[$style['icon'], $style['prepend']]"
        >
          <!-- @slot prepend icon -->
          <slot name="prependIcon" />
        </div>
        <input
          :type="type"
          :class="[$style['input-self'], $style[styleType]]"
          :placeholder="placeholder"
          @blur="handleBlur"
          @change="handleChange"
          @focus="handleFocus"
          @input="handleInput"
          v-model="internalValue"
        />
        <div v-if="$slots.appendIcon" :class="$style['icon']">
          <!-- @slot append icon -->
          <slot name="appendIcon" />
        </div>
      </div>
    </label>
    <div v-if="error" :class="$style['error-text']">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    /**
     * input type
     */
    type: {
      type: String,
      default: 'text'
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
     * style type (e.g. regular, box)
     */
    styleType: {
      type: String,
      default: 'regular'
    },
    /**
     * label text
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * placeholder text
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * two way value
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * rules for validation
     */
    rules: {
      type: Array,
      default: () => []
    },
    /**
     * format value
     */
    format: {
      type: Function,
      default: v => v
    }
  },
  data() {
    return {
      pureValue: this.value,
      lazyValue: this.format(this.value),
      error: ''
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.lazyValue
      },
      set(val) {
        this.lazyValue = val
      }
    }
  },
  watch: {
    value(val) {
      this.pureValue = val
      this.internalValue = this.format(val)
    }
  },
  methods: {
    handleBlur() {
      this.pureValue = this.internalValue
      this.internalValue = this.format(this.internalValue)
      /**
       * blur event callback
       *
       * @type {function}
       */
      this.$emit('blur')
    },
    handleChange() {
      if (this.internalValue === '' || this.checkIfError(this.internalValue)) {
        return
      }

      /**
       * handle input change, do validation then return value only if it is valid
       *
       * @type {function}
       */
      this.$emit('change', this.internalValue)
    },
    handleFocus() {
      this.internalValue = this.pureValue
      /**
       * focus event callback
       *
       * @type {function}
       */
      this.$emit('focus')
    },
    handleInput() {
      /**
       * handle input event and return value
       *
       * @type {function}
       */
      this.$emit('input', this.internalValue)
      this.$emit('keyup', this.internalValue)
    },
    checkIfError(value) {
      const errors = this.rules.reduce((result, rule) => {
        const valid = typeof rule === 'function' ? rule(value) : value
        if (typeof valid === 'string') {
          result.push(valid)
        }
        return result
      }, [])
      const hasError = errors.length > 0
      this.error = hasError ? errors.join(', ') : ''
      return hasError
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_all.scss';

.container {
  @extend %flex-default;
  flex-flow: column nowrap;

  width: 100%;
}

.large > input {
  font-size: $fs-16;
  height: 48px;
}

.medium > input {
  font-size: $fs-14;
  height: 36px;
}

.label {
  width: 100%;
  color: $black-50;
  font-size: $fs-14;
}

.input {
  @extend %flex-default;
  align-items: center;

  width: 100%;
}

.input-self {
  width: 100%;
  border: 0;
  padding: 0;
  background: transparent;
  outline: none;
  box-shadow: none;
}

.regular {
  color: $font-color;
  font-size: $fs-16;

  &::placeholder {
    color: $black-30;
  }
}

.regular-bg {
  width: 100%;
  box-sizing: border-box;
  background: transparent;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid $gray;

  &:focus-within {
    border-color: $black-09;
  }

  &.error {
    border-color: $danger;
  }
}

.box {
  color: $font-color;
  font-size: $fs-16;

  &::placeholder {
    color: $black-30;
  }
}

.box-bg {
  width: 100%;
  box-sizing: border-box;
  background: $black-09;
  padding: 0 $spacing-1;
  border: 1px solid #eee;
  border-radius: 5px;

  &:focus-within {
    background: #eee;
  }

  &.error {
    border-color: $danger;
  }
}

.error-text {
  color: $danger;
  font-size: $fs-12;
  margin: 4px 0 0;
}

.icon {
  @extend %flex-center;

  width: 25px;
  height: 25px;
  user-select: none;
}

.prepend {
  margin: 0 5px 0 0;
}
</style>

<docs>
Regular

```jsx
<template>
  <Input
    size="large"
    label="Text"
    placeholder="Placeholder"
    defaultValue="default value"
    @input="log"
  />
</template>

<script>
export default {
  methods: {
    log(value) {
      console.log(value)
    }
  }
}
</script>
```

Box

```jsx
<Input
  size="medium"
  styleType="box"
  placeholder="Search something..."
>
  <div slot="prependIcon">
    <i class="fas fa-search"></i>
  </div>
  <div slot="appendIcon">
    <i class="fas fa-times-circle"></i>
  </div>
</Input>
```

With formation and validation

```jsx
<template>
  <Input
    :type="inputType"
    label="Number"
    placeholder="[0-10000]"
    size="large"
    styleType="box"
    :value="value"
    :rules="[isNumber, lte0, ste10000]"
    :format="format"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="log"
  />
</template>

<script>
export default {
  data() {
    return {
      inputType: 'text',
      value: '9876'
    }
  },
  methods: {
    log(value) {
      console.log(value)
    },
    handleBlur() {
      this.inputType = 'text'
    },
    handleFocus() {
      this.inputType = 'number'
    },
    isNumber(n) {
      if (isNaN(n)) {
        return 'input must be Number'
      }
    },
    lte0(n) {
      if (n < 0) {
        return 'input must larger than or equal to 0'
      }
    },
    ste10000(n) {
      if (n > 10000) {
        return 'input must smaller than or equal to 10000'
      }
    },
    format(v) {
      return v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>
```
</docs>
