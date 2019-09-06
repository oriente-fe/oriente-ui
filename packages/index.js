import Alert from './Alert'
import Button from './Button'
import Chip from './Chip'

const components = [
  Alert,
  Button,
  Chip
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Alert
}
