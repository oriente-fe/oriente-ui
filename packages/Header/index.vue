<template>
  <section :class="$style['header']">
    <div
      v-if="isTwoSlots || isThreeSlots"
      :class="[$style['left'], $style['slot']]"
    >
      <!-- @slot left column -->
      <slot name="left" />
    </div>
    <div
      v-if="isOneSlot || isThreeSlots"
      :class="[$style['middle'], $style['slot']]"
    >
      <!-- @slot center column -->
      <slot />
    </div>
    <div
      v-if="isTwoSlots || isThreeSlots"
      :class="[$style['right'], $style['slot']]"
    >
      <!-- @slot right column -->
      <slot name="right" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isOneSlot: function() {
      const { left, right, default: def } = this.$slots
      return def && !left && !right
    },
    isTwoSlots: function() {
      const { left, right, default: def } = this.$slots
      return !def && left && right
    },
    isThreeSlots: function() {
      const { left, right, default: def } = this.$slots
      return def && left && right
    }
  }
}
</script>

<style lang="scss" module>
@import '~/styles/extend/flexbox.scss';
@import '~/styles/_variables.scss';

.header {
  @extend %flex-center;

  width: 100%;
  height: $header-height;
  background-color: $white;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
  position: relative;
}

.slot {
  flex: 1;
  height: 100%;
}

.left {
  @extend %flex-center;
  justify-content: flex-start;
}

.middle {
  @extend %flex-center;

  flex: 10;
  font-size: $fs-18;
  font-weight: $fw-regular;
}

.right {
  @extend %flex-center;
  justify-content: flex-end;
}
</style>

<docs>
One Slot

```
<Header>
  <div>Center</div>
</Header>
```

Two Slots

```
<Header>
  <div slot="left">Left</div>
  <div slot="right">Right</div>
</Header>
```

Three Slots

```
<Header>
  <div slot="left">Left</div>
  <div>Center</div>
  <div slot="right">Right</div>
</Header>
```
</docs>
