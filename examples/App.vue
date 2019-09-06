<template>
  <div id="app">
    <div class="page-header">
      <h1>Oriente UI</h1>
      <h2>A bunch of components for supporting Oriente front-end team.</h2>
      <a href="https://github.com/" class="btn" target="_blank">View on GitHub</a>
    </div>
    <div class="page-content" v-hljs>
      <h1>Setup</h1>
      <pre>$ npm install oriente-ui</pre>
      <h1>Usage</h1>
<pre>
import orienteUI from 'oriente-ui'
Vue.use(orienteUI)
</pre>
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
      </Chip> &nbsp;
      <Chip style-type="primary">
        primary
      </Chip> &nbsp;
      <Chip style-type="error">
        error
      </Chip>
    </div>
  </div>
</template>

<style lang="sass">
@import "assets/style.scss";
</style>
