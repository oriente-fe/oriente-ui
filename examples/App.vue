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
      <h2>BackToTopButton</h2>
      <div>
        <Button
          style-type="default"
          @click="isBackToTopButtonShown = !isBackToTopButtonShown"
          :style="{ border: '1px solid #333' }"
        >
          Toggle Back to Top Button
        </Button>
        <BackToTopButton v-if="isBackToTopButtonShown" />
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
        :type="inputType"
        label="Number"
        placeholder="[0-10000]"
        size="large"
        :value="inputValue"
        :rules="[isNumber, lte0, ste10000]"
        :format="inputFormat"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="v => console.log(v)"
      />
      <br />
      <Input size="medium" styleType="box" placeholder="Search something...">
        <div slot="prependIcon">
          <i class="fas fa-search"></i>
        </div>
        <div slot="appendIcon">
          <i class="fas fa-times-circle"></i>
        </div>
      </Input>
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
      <h2>SearchNav</h2>
      <SearchNav
        value="default value"
        placeholder="Type anything..."
        :history="Array.from(history).reverse()"
        @open="openSearchNav"
        @back="searchNavClickback"
        @change="searchNavOnChange"
        @submit="searchNavOnSubmit"
        @cleanSearch="searchNavCleanSearch"
        @deleteHistory="searchNavDeleteHistory"
      >
        <div slot="appendSection">
          👌
        </div>
      </SearchNav>
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
      <h2>SlideUpView</h2>
      <div>
        <Button
          style-type="default"
          @click="isSlideUpViewShown = true"
          :style="{ border: '1px solid #333' }"
        >
          Open SlideUpView
        </Button>
        <SlideUpView v-model="isSlideUpViewShown" title="Title">
          Content
          <Button
            slot="footer"
            styleType="primary"
            style="border-radius: 0"
            @click="isSlideUpViewShown = false"
          >
            Close Button
          </Button>
        </SlideUpView>
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
        <StandarizedImage url="https://placehold.it/1000x1000" ratio="16:9" />
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
    <portal-target name="search-nav" />
  </div>
</template>

<script>
import Vue from 'vue'
import PortalVue from 'portal-vue'
Vue.use(PortalVue)

export default {
  data() {
    return {
      isDialogShown: false,
      isConfirmDialogShown: false,
      isBackToTopButtonShown: true,
      isFixedButtonShown: false,
      isLoading: false,
      isModalShown: false,
      isSlideUpDialogShown: false,
      isSlideUpViewShown: false,
      isToastShown: false,
      history: new Set(['Airpods', 'iPhone', 'Macbook Pro']),
      inputType: 'text',
      inputValue: '1234'
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
    ste10000(n) {
      if (n > 10000) {
        return 'input must smaller than or equal to 10000'
      }
    },
    openSearchNav() {
      console.log('click open')
    },
    searchNavClickback() {
      console.log('click back')
    },
    searchNavOnChange(text) {
      console.log('change', text)
    },
    searchNavOnSubmit(text) {
      this.history.add(text)
      this.$forceUpdate()
      console.log('submit', text)
    },
    searchNavCleanSearch() {
      console.log('clean search')
    },
    searchNavDeleteHistory() {
      this.history.clear()
      this.$forceUpdate()
      console.log('delete history')
    },
    handleBlur() {
      this.inputType = 'text'
    },
    handleFocus() {
      this.inputType = 'number'
    },
    inputFormat(v) {
      return v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="sass">
@import "assets/style.scss";
</style>
