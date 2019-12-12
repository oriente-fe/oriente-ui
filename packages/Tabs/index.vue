<template>
  <div>
    <div ref="tabs" :class="$style['tabs']">
      <div
        v-for="(name, index) in names"
        :key="`tab${index}`"
        :class="[$style['tab'], { [$style['active']]: name === currentTab }]"
        @click="e => clickTab(e.target, name)"
      >
        {{ name }}
      </div>
    </div>
    <!-- @slot offer multiple slots for matching different tabs -->
    <slot :name="activeTabContent"></slot>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    /**
     * tab names
     */
    names: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    const currentTab = this.value || this.names[0]
    return {
      currentTab
    }
  },
  computed: {
    tabsRef() {
      return this.$refs.tabs
    },
    activeTabContent() {
      return this.names.find(name => name === this.currentTab)
    }
  },
  mounted() {
    const index = this.names.indexOf(this.currentTab)
    const tab = this.tabsRef.children[index]
    this.scrollTo(tab)
  },
  methods: {
    clickTab(target, name) {
      this.currentTab = name
      this.scrollTo(target)
      this.$emit('click', name)
    },
    scrollTo(target) {
      const tabsWidth = this.tabsRef.offsetWidth
      const tabLeft = target.offsetLeft
      const tabWidth = target.offsetWidth
      const offset =
        tabLeft - Math.floor(tabsWidth / 2) + Math.floor(tabWidth / 2)
      this.tabsRef.scrollTo({
        behavior: 'smooth',
        left: offset
      })
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_all.scss';

.tabs {
  @extend %flex-default;

  overflow-x: scroll;
  background: $white;
  position: relative;
  z-index: 1;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.04);

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab {
  color: #555;
  font-size: $fs-12;
  font-weight: $fw-regular;
  white-space: nowrap;
  padding: $spacing-2;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:last-of-type {
    margin: 0;
  }
}

.active {
  color: $primary;
  border-bottom: 2px solid $primary;
}
</style>

<docs>
Usage

```
<template>
  <div :style="{width: '300px'}">
    <Tabs :names="names" @click="log" value="Cancelled">
      <div slot="All">All</div>
      <div slot="Confirmed">Confirmed</div>
      <div slot="Completed">Completed</div>
      <div slot="Failed">Failed</div>
      <div slot="Cancelled">Cancelled</div>
    </Tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      names: [
        'All',
        'Confirmed',
        'Completed',
        'Failed',
        'Cancelled'
      ]
    }
  },
  methods: {
    log(name) {
      console.log(name)
    }
  }
}
</script>
```
</docs>
