# Oriente UI

> A bunch of components for supporting Oriente front-end team.

[DEMO](https://oriente-ui.tonypai.now.sh/)

## Features

- Mobile friendly.
- Works on all fancy browsers.
- Supports SSR, SPA, PWA and standard HTML pages.

## Setup

```
$ yarn add oriente-ui
```
## Usage

SPA (CSR)

```javascript
import OrienteUI from 'oriente-ui'
import 'oriente-ui/lib/oriente-ui.css'

Vue.use(OrienteUI)
```

Nuxt.js (SSR)

```javascript
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

Build assets for demo site with bundle analyzer

```
$ yarn build:inspect
```

Build library files

```
$ yarn lib
```

## Development

Start styleguidist

```
$ yarn styleguide
```

Start demo site

```
$ yarn serve
```
