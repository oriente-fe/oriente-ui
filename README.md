# Oriente UI

> A bunch of components for supporting Oriente front-end team.

[DEMO](https://workspace.tonypai.now.sh)

## Features

- Mobile friendly.
- Works on all fancy browsers.
- Supports SSR, SPA, PWA and standard HTML pages.

## Setup

```sh
$ yarn add oriente-ui
```
## Usage

SPA (CSR)

```js
import OrienteUI from 'oriente-ui'
import 'oriente-ui/lib/oriente-ui.css'

Vue.use(OrienteUI)
```

Nuxt.js (SSR)

```js
// plugins/oriente-ui.js
import OrienteUI from 'oriente-ui'
import 'oriente-ui/lib/oriente-ui.css'

export default () => {
  Vue.use(OrienteUI)
}

// nuxt.config.js
plugins: [
  '~/plugins/oriente-ui.js'
]
```

## Build

Publish npm package

```bash
$ yarn lib
```

## Development

Start styleguidist

```bash
$ yarn styleguide
```

Start demo site

```bash
$ yarn serve
```
