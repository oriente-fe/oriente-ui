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
      <h1>Features</h1>
      <ul>
        <li>
          Mobile friendly.
        </li>
        <li>
          Works on all fancy browsers.
        </li>
        <li>
          Supports SSR, SPA, PWA and standard HTML pages.
        </li>
      </ul>
      <h1>Setup</h1>
      <pre>$ yarn add oriente-ui</pre>
      <h1>Usage</h1>
      <h2>SPA (CSR)</h2>
      <pre>
import OrienteUI from 'oriente-ui'
import 'oriente-ui/lib/oriente-ui.css'

Vue.use(OrienteUI)
</pre
      >
      <h2>Nuxt.js (SSR)</h2>
      <pre>
// plugins/oriente-ui.js
import OrienteUI from 'oriente-ui'
import 'oriente-ui/lib/oriente-ui.css'

export default () => {
  Vue.use(OrienteUI)
}

// nuxt.config.js
plugins: [
  '~/plugins/oriente-ui.js'
]</pre
      >
      <h1>Demo</h1>
      <h2>Alert</h2>
      <Alert style-type="reminder">
        This is an alert
      </Alert>
      <h2>Button</h2>
      <Button style-type="primary">
        Button
      </Button>
      <h2>Chip</h2>
      <Chip style-type="reminder">
        Reminder
      </Chip>
      &nbsp;
      <Chip style-type="processing">
        Processing
      </Chip>
      &nbsp;
      <Chip style-type="success">
        Success
      </Chip>
      &nbsp;
      <Chip style-type="cancel">
        Cancel
      </Chip>
      &nbsp;
      <Chip style-type="danger">
        Danger
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
      <h2>FixedButton</h2>
      <div>
        <Button
          style-type="default"
          @click="showFixedButton"
          :style="{ border: '1px solid #333' }"
        >
          Open FixedButton
        </Button>
        <FixedButton
          v-if="isFixedButtonShown"
          styleType="primary"
          @click="hideFixedButton"
        >
          Close FixedButton
        </FixedButton>
      </div>
      <h2>Header</h2>
      <Header>
        <div slot="left">Left</div>
        <div>Center</div>
        <div slot="right">Right</div>
      </Header>
      <h2>Input</h2>
      <Input
        label="Number"
        placeholder="[0-100]"
        :rules="[isNumber, lte0, ste100]"
        @change="v => console.log(v)"
      />
      <h2>Loading</h2>
      <div>
        <Button
          style-type="default"
          @click="showLoading"
          :style="{ border: '1px solid #333' }"
        >
          Open Loading
        </Button>
        <Loading v-if="isLoading" mode="fixed" mask="dark" />
      </div>
      <h2>Modal</h2>
      <div>
        <Button
          style-type="default"
          @click="openModal"
          :style="{ border: '1px solid #333' }"
        >
          Open Modal
        </Button>
        <Modal title="Title" :value="isModalShown" @input="closeModal">
          Content
        </Modal>
      </div>
      <h2>SlideUpDialog</h2>
      <div>
        <Button
          style-type="default"
          @click="openSlideUpDialog"
          :style="{ border: '1px solid #333' }"
        >
          Open SlideUpDialog
        </Button>
        <SlideUpDialog
          :value="isSlideUpDialogShown"
          title="Title"
          @input="closeSlideUpDialog"
        >
          Content
          <div slot="footer">
            Footer
          </div>
        </SlideUpDialog>
      </div>
      <h2>StandarizedContainer</h2>
      <h3>
        Define any aspect ratio such as <strong>16:9</strong>, element stays in
        this container will keep it.
      </h3>
      <section>
        <StandarizedContainer ratio="16:9">
          <iframe src="https://www.youtube.com/embed/jDDy-Vh55to" />
        </StandarizedContainer>
      </section>
      <h2>StandarizedImage</h2>
      <h3>
        Define any aspect ratio such as <strong>16:9</strong>, this image will
        keep it.
      </h3>
      <section>
        <StandarizedImage
          url="https://picsum.photos/id/47/1000/1000"
          ratio="16:9"
        />
      </section>
      <h2>Tabs</h2>
      <Tabs :names="['All', 'Confirmed', 'Completed', 'Failed', 'Cancelled']">
        <div slot="All">All</div>
        <div slot="Confirmed">Confirmed</div>
        <div slot="Completed">Completed</div>
        <div slot="Failed">Failed</div>
        <div slot="Cancelled">Cancelled</div>
      </Tabs>
      <h2>Toast</h2>
      <div>
        <Button
          style-type="default"
          @click="openToast"
          :style="{ border: '1px solid #333' }"
        >
          Open Toast
        </Button>
      </div>
    </div>
    <!-- Place Toast component is for better presentation. -->
    <Toast :value="isToastShown" @input="closeToast">
      This is a toast.
    </Toast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDialogShown: false,
      isConfirmDialogShown: false,
      isFixedButtonShown: false,
      isLoading: false,
      isModalShown: false,
      isSlideUpDialogShown: false,
      isToastShown: false
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
    },
    showFixedButton() {
      this.isFixedButtonShown = true
    },
    hideFixedButton() {
      this.isFixedButtonShown = false
    },
    showLoading() {
      this.isLoading = true
      setTimeout(() => this.hideLoading(), 1500)
    },
    hideLoading() {
      this.isLoading = false
    },
    openModal() {
      this.isModalShown = true
    },
    closeModal() {
      this.isModalShown = false
    },
    openSlideUpDialog() {
      this.isSlideUpDialogShown = true
    },
    closeSlideUpDialog() {
      this.isSlideUpDialogShown = false
    },
    openToast() {
      this.isToastShown = true
    },
    closeToast() {
      this.isToastShown = false
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

<style lang="sass">
@import "assets/style.scss";
</style>
