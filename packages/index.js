import Alert from './Alert'
import Button from './Button'
import Chip from './Chip'
import ConfirmDialog from './ConfirmDialog'
import Dialog from './Dialog'
import FixedButton from './FixedButton'
import Header from './Header'
import Loading from './Loading'
import Modal from './Modal'
import Price from './Price'
import StandarizedContainer from './StandarizedContainer'
import StandarizedImage from './StandarizedImage'
import Toast from './Toast'

const components = [
  Alert,
  Button,
  Chip,
  ConfirmDialog,
  Dialog,
  FixedButton,
  Header,
  Loading,
  Modal,
  Price,
  StandarizedContainer,
  StandarizedImage,
  Toast
]

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
