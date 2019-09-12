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
    }
  },
  data() {
    return {
      currentTab: this.names.find((_, i) => i === 0)
    }
  },
  computed: {
    tabs() {
      return this.$refs.tabs
    },
    activeTabContent() {
      return this.names.find(name => name === this.currentTab)
    }
  },
  methods: {
    clickTab(target, name) {
      this.currentTab = name

      const tabsLeft = this.tabs.offsetLeft
      const tabsWidth = this.tabs.offsetWidth
      const tabLeft = target.offsetLeft
      const tabWidth = target.offsetWidth
      const offset =
        tabLeft -
        tabsLeft -
        Math.floor(tabsWidth / 2) +
        Math.floor(tabWidth / 2)
      this.tabs.scrollTo({
        behavior: 'smooth',
        left: offset
      })
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/_variables.scss';
@import '~/styles/extend/flexbox.scss';

.tabs {
  @extend %flex-default;

  overflow-x: scroll;
  width: 300px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab {
  color: #555;
  font-size: $fs-12;
  font-weight: $fw-regular;
  white-space: nowrap;
  padding: $spacing-2 $spacing-1;
  margin: 0 $spacing-1;
  cursor: pointer;

  &:last-of-type {
    margin: 0;
  }
}

.active {
  color: $primary;
  font-weight: $fw-bold;
  border-bottom: 2px solid $primary;
}
</style>

<docs>
Usage

```
<template>
  <Tabs :names="names">
    <div slot="All">All</div>
    <div slot="Confirmed">Confirmed</div>
    <div slot="Completed">Completed</div>
    <div slot="Failed">Failed</div>
    <div slot="Cancelled">Cancelled</div>
  </Tabs>
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
  }
}
</script>
```
</docs>
