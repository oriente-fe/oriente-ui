<template>
  <div :class="$style.price">
    <span
      :class="[
        $style.sale,
        {
          [$style['fs-small']]: size === 'small',
          [$style['fs-medium']]: size === 'medium'
        }
      ]"
    >
      {{ formattedPrice }}
    </span>
    <span
      v-if="formattedOriginalPrice"
      :class="[
        $style.original,
        {
          [$style['fs-mini']]: size === 'small',
          [$style['fs-small']]: size === 'medium'
        }
      ]"
    >
      {{ formattedOriginalPrice }}
    </span>
  </div>
</template>

<script>
import { formatMoney } from '~/utils/currency'

export default {
  name: 'Price',
  props: {
    /**
     * original price
     */
    originalPrice: {
      type: Number,
      default: null
    },
    /**
     * on-sale price
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
    },
    formattedOriginalPrice() {
      if (typeof this.originalPrice !== 'number') {
        return null
      }
      return formatMoney(this.originalPrice, {
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
  color: $secondary;
  padding: 0 $spacing-1 0 0;
}
.original {
  display: inline-block;
  vertical-align: middle;
  text-decoration: line-through;
  opacity: 0.4;
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
<Price
  :price="1"
  currency="USD"
  size="1"
/>
<Price
  :price="10"
  currency="IDR"
  size="1"
/>
<Price
  :originalPrice="100"
  :price="10"
  currency="PHP"
  size="2"
/>
```
</docs>
