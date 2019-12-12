<template>
  <div :class="$style['container']">
    <label :class="$style['label']">
      {{ label }}
      <input
        type="text"
        :class="[$style['input'], { [$style['error']]: error }]"
        :placeholder="placeholder"
        @change="handleChange"
        @keyup="handleKeyup"
      />
    </label>
    <div v-if="error" :class="$style['error-text']">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
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
     * rules for validation
     */
    rules: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      error: ''
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
}

.label {
  width: 100%;
  color: $black-50;
  font-size: $fs-14;
}

.input {
  width: 100%;
  color: $font-color;
  font-size: $fs-16;
  padding: $spacing-2 0;
  border: 0;
  border-bottom: 1px solid $gray;
  outline: none;

  &:focus {
    border-color: $black-09;
  }

  &::placeholder {
    color: $black-30;
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
</style>

<docs>
Regular

```jsx
<template>
  <Input
    label="Text"
    placeholder="Placeholder"
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

With validation

```jsx
<template>
  <Input
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
