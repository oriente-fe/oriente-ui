<template>
  <div>
    <div :class="$style['fake']" @click="clickFake">
      <div :class="$style['mask']"></div>
      <Input
        size="medium"
        styleType="box"
        :placeholder="placeholder"
        :value="search"
      >
        <div slot="prependIcon">
          <div
            :class="$style['icon']"
            v-html="require('~/assets/ic_search.svg')"
          />
        </div>
      </Input>
    </div>
    <portal to="search-nav">
      <div :class="[$style['container'], { [$style['hidden']]: !isShown }]">
        <div ref="nav" :class="$style['nav']">
          <div :class="$style['back']">
            <Button style-type="default" @click="clickBack">
              <div
                :class="$style['icon']"
                v-html="require('~/assets/ic_chevron_left.svg')"
              />
            </Button>
          </div>
          <form @submit.prevent="() => submit(search)" :class="$style['form']">
            <Input
              size="medium"
              styleType="box"
              :placeholder="placeholder"
              :value="search"
              @keyup="emitChange"
            >
              <div slot="prependIcon">
                <div
                  :class="$style['icon']"
                  v-html="require('~/assets/ic_search.svg')"
                />
              </div>
              <div v-if="search" slot="appendIcon" :class="$style['clean']">
                <Button style-type="default" @click="clickClean">
                  <div
                    :class="$style['small-icon']"
                    v-html="require('~/assets/ic_clean.svg')"
                  />
                </Button>
              </div>
            </Input>
          </form>
        </div>
        <div :class="$style['content']">
          <div v-if="history.length > 0" :class="$style['section']">
            <div :class="$style['header']">
              <div :class="$style['title']">
                {{ historyLabel }}
              </div>
              <div :class="$style['delete']">
                <Button style-type="default" @click="clickDelete">
                  <div
                    :class="$style['small-icon']"
                    v-html="require('~/assets/ic_delete.svg')"
                  />
                </Button>
              </div>
            </div>
            <div :class="$style['row']">
              <div v-for="(label, i) in history" :key="`label${i}`">
                <Button
                  style-type="default"
                  @click="() => clickLabel(label)"
                  :class="$style['label']"
                >
                  <span>
                    {{ label }}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <!-- @slot append section -->
        <slot name="appendSection" />
      </div>
    </portal>
  </div>
</template>

<script>
import Vue from 'vue'
import PortalVue from 'portal-vue'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import _ from 'lodash'
import Input from '@/Input'

Vue.use(PortalVue)

export default {
  name: 'SearchNav',
  components: {
    Input
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search something...'
    },
    history: {
      type: Array,
      default: () => []
    },
    historyLabel: {
      type: String,
      default: 'Search History'
    }
  },
  data() {
    return {
      search: this.value,
      isExist: false,
      isShown: false
    }
  },
  watch: {
    isExist(val) {
      if (val) {
        this.$nextTick(() => {
          this.isShown = true
          this.$refs.nav.querySelector('input').focus()
          disableBodyScroll(this.$refs.nav.parentNode)
        })
      }
    },
    isShown(val) {
      if (!val) {
        this.$refs.nav.querySelector('input').blur()
        enableBodyScroll(this.$refs.nav.parentNode)
        setTimeout(() => (this.isExist = false), 300)
      }
    },
    value(val) {
      this.search = val
    }
  },
  methods: {
    emitChange(text) {
      this.search = text
      /**
       * search field change event
       */
      this.$emit('change', text)
    },
    submit(text) {
      this.emitChange(text)
      this.clickBack()
      /**
       * submit event
       */
      this.$emit('submit', text || this.search)
    },
    clickFake() {
      if (typeof this.$refs.nav === 'undefined') {
        throw new Error(
          'You should add <portal-target name="search-nav" /> for SearchNav.'
        )
      }

      this.isExist = true
      /**
       * click fake input callback
       */
      this.$emit('open')
    },
    clickBack() {
      this.isShown = false
      /**
       * click back callback
       */
      this.$emit('back')
    },
    clickClean(e) {
      e.stopPropagation()
      this.emitChange('')
      /**
       * clean search callback
       */
      this.$emit('cleanSearch')
    },
    clickDelete() {
      /**
       * delete history callback
       */
      this.$emit('deleteHistory')
    },
    clickLabel(text) {
      this.submit(text)
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_all.scss';

.fake {
  position: relative;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
}

.container {
  background: $white;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  opacity: 1;
  transition: all 0.3s ease-out;

  &.hidden {
    z-index: -1000;
    opacity: 0;
  }
}

.nav {
  @extend %flex-default;
  align-items: center;

  width: 100%;
  height: $header-height;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
}

.form {
  width: 100%;
  margin: 0 10px 0 0;

  input {
    width: auto;
    flex: 1;
  }
}

.back {
  button {
    height: 56px;
    padding: 0 $spacing-2;
  }
}

.clean {
  width: 100%;

  button {
    background: transparent;
  }
}

.icon {
  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
}

.small-icon {
  svg {
    display: block;
    width: 16px;
    height: 16px;
  }
}

.content {
  padding: $spacing-3 $spacing-2 0;
}

.section {
  position: relative;
}

.header {
  @extend %flex-space-between;
}

.title {
  flex: 1;
  color: $black-50;
  font-size: $fs-14;
  font-weight: $fw-bold;
  padding: 0 0 $spacing-1 0;
}

.delete {
  position: absolute;
  top: -14px;
  right: -14px;
  button {
    width: 48px;
  }
}

.row {
  @extend %flex-default;
  flex-flow: row wrap;
}

.label {
  height: auto;
  padding: 6px 0;

  span {
    display: inline-block;
    font-size: $fs-14;
    line-height: 2.14;
    color: $font-color;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    margin: 0 $spacing-1 0 0;
    padding: 0 10px;
    user-select: none;
    white-space: nowrap;
  }
}
</style>

<docs>
Usage

```jsx
<template>
  <div>
    <SearchNav
      value="default value"
      placeholder="Type anything..."
      :history="Array.from(history).reverse()"
      @open="open"
      @back="back"
      @change="change"
      @submit="submit"
      @cleanSearch="cleanSearch"
      @deleteHistory="deleteHistory"
    >
      <div slot="appendSection">
        👌
      </div>
    </SearchNav>
  </div>
</template>

<script>
import Vue from 'vue'
import PortalVue from 'portal-vue'
Vue.use(PortalVue)

export default {
  data() {
    return {
      history: new Set(['Airpods', 'iPhone', 'Macbook Pro'])
    }
  },
  methods: {
    open() {
      console.log('click open')
    },
    back() {
      console.log('click back')
    },
    change(text) {
      console.log('change', text)
    },
    submit(text) {
      this.history.add(text)
      this.$forceUpdate()
      console.log('submit', text)
    },
    cleanSearch() {
      console.log('clean search')
    },
    deleteHistory() {
      this.history.clear()
      this.$forceUpdate()
      console.log('delete history')
    }
  }
}
</script>
```
</docs>
