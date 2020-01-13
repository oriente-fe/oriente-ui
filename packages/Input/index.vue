<template>
  <div :class="$style['container']">
    <label :class="$style['label']">
      {{ label }}
      <div :class="[$style['input'], $style[`${styleType}-bg`]]">
        <div
          v-if="$slots.prependIcon"
          :class="[$style['icon'], $style['prepend']]"
        >
          <!-- @slot prepend icon -->
          <slot name="prependIcon" />
        </div>
        <input
          :type="type"
          :class="[
            $style['input-self'],
            $style[styleType],
            { [$style['error']]: error }
          ]"
          :placeholder="placeholder"
          @change="handleChange"
          @keyup="handleKeyup"
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
    }
  },
  data() {
    return {
      lazyValue: this.value,
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
      this.lazyValue = val
    }
  },
  methods: {
    handleChange(e) {
      if (e.target.value === '' || this.checkIfError(e.target.value)) {
        return
      }

      /**
       * handle input change, do validation then return value only if it is valid
       *
       * @type {function}
       */
      this.$emit('change', e.target.value)
    },
    handleKeyup(e) {
      /**
       * handle keyup event and return value
       *
       * @type {function}
       */
      this.$emit('keyup', e.target.value)
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
  background: transparent;
  padding: $spacing-2 0;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid $gray;

  &:focus-within {
    border-color: $black-09;
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
  width: calc(100% - #{2 * $spacing-1});
  background: $black-09;
  padding: $spacing-1;
  border: 0;
  border-radius: 5px;

  &:focus-within {
    background: #eee;
  }
}

.error {
  border-color: $danger;
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
    label="Text"
    placeholder="Placeholder"
    defaultValue="default value"
    @keyup="log"
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
<Input styleType="box" placeholder="Search something...">
  <div slot="prependIcon">
    <i class="fas fa-search"></i>
  </div>
  <div slot="appendIcon">
    <i class="fas fa-times-circle"></i>
  </div>
</Input>
```

With validation

```jsx
<template>
  <Input
    type="number"
    label="Number"
    placeholder="[0-100]"
    :rules="[isNumber, lte0, ste100]"
    @change="log"
  />
</template>

<script>
export default {
  methods: {
    log(value) {
      console.log(value)
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
    ste100(n) {
      if (n > 100) {
        return 'input must smaller than or equal to 100'
      }
    }
  }
}
</script>
```
</docs>
