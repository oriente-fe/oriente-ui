import Alert from './Alert'
import Button from './Button'
import Chip from './Chip'
import ConfirmDialog from './ConfirmDialog'
import Dialog from './Dialog'

const components = [Alert, Button, Chip, ConfirmDialog, Dialog]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
