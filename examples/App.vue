<template>
  <div id="app">
    <div class="page-header">
      <h1>Oriente UI</h1>
      <h2>A bunch of components for supporting Oriente front-end team.</h2>
      <a href="https://github.com/tpai/oriente-ui" class="btn" target="_blank">
        View on GitHub
      </a>
    </div>
    <div class="page-content" v-hljs>
      <h1>Setup</h1>
      <pre>$ yarn add oriente-ui</pre>
      <h1>Usage</h1>
      <pre>
import orienteUI from 'oriente-ui'
Vue.use(orienteUI)
</pre
      >
      <h1>Demo</h1>
      <h2>Alert</h2>
      <Alert>
        This is a alert
      </Alert>
      <h2>Button</h2>
      <Button style-type="primary">
        Button
      </Button>
      <h2>Chip</h2>
      <Chip style-type="success">
        success
      </Chip>
      &nbsp;
      <Chip style-type="primary">
        primary
      </Chip>
      &nbsp;
      <Chip style-type="error">
        error
      </Chip>
      <h2>ConfirmDialog</h2>
      <div>
        <Button
          style-type="default"
          @click="openConfirmDialog"
          :style="{ border: '1px solid #333' }"
        >
          Open Confirm Dialog
        </Button>
        <ConfirmDialog
          message="Content to confirm"
          button-text="I agree"
          v-model="isConfirmDialogShown"
          @confirm="confirm"
        />
      </div>
      <h2>Dialog</h2>
      <div>
        <Button
          style-type="default"
          @click="openDialog"
          :style="{ border: '1px solid #333' }"
        >
          Open Dialog
        </Button>
        <Dialog :value="isDialogShown" @input="closeDialog">
          <div slot="header">
            Header
          </div>
          Content
          <div slot="footer">
            Footer
          </div>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDialogShown: false,
      isConfirmDialogShown: false
    }
  },
  methods: {
    openDialog() {
      this.isDialogShown = true
    },
    closeDialog() {
      this.isDialogShown = false
    },
    openConfirmDialog() {
      this.isConfirmDialogShown = true
    },
    confirm() {
      console.log('confirmed')
    }
  }
}
</script>

<style lang="sass">
@import "assets/style.scss";
</style>
