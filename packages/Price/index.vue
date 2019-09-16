<template>
  <span
    :class="[
      $style.sale,
      {
        [$style['disabled']]: disabled,
        [$style['fs-small']]: size === 'small',
        [$style['fs-medium']]: size === 'medium'
      }
    ]"
  >
    {{ formattedPrice }}
  </span>
</template>

<script>
import { formatMoney } from '~/utils/currency'

export default {
  name: 'Price',
  props: {
    /**
     * price
     */
    price: {
      type: Number,
      required: true
    },
    /**
     * currency mark
     */
    currency: {
      type: String,
      default: 'PHP'
    },
    /**
     * font size
     */
    size: {
      type: String,
      default: 'small'
    },
    /**
     * disabled
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedPrice() {
      if (typeof this.price !== 'number') {
        return null
      }
      return formatMoney(this.price, {
        currency: this.currency
      })
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
.price {
  margin: 3px 0 0 0;
}
.sale {
  display: inline-block;
  vertical-align: middle;
  font-weight: $fw-bold;
  color: $primary;
}
.disabled {
  color: $black;
  text-decoration: line-through;
  opacity: 0.3;
}
.fs-medium {
  font-size: $fs-18;
}
.fs-small {
  font-size: $fs-14;
}
.fs-mini {
  font-size: $fs-12;
}
</style>

<docs>
Usage

```
<div>
  <Price
    :price="1"
    currency="USD"
    size="1"
  />
</div>
<div>
<Price
  :price="1000"
  currency="IDR"
  size="1"
/>
</div>
<div>
  <Price
    :price="1000"
    currency="PHP"
    size="2"
  />
  <Price
    :price="1000"
    currency="PHP"
    size="2"
    disabled
  />
</div>
```
</docs>
