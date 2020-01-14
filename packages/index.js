import Alert from './Alert'
import Button from './Button'
import Chip from './Chip'
import ConfirmDialog from './ConfirmDialog'
import Dialog from './Dialog'
import FixedButton from './FixedButton'
import Header from './Header'
import Input from './Input'
import Loading from './Loading'
import Modal from './Modal'
import SearchNav from './SearchNav'
import SlideUpDialog from './SlideUpDialog'
import StandarizedContainer from './StandarizedContainer'
import StandarizedImage from './StandarizedImage'
import Tabs from './Tabs'
import Toast from './Toast'

const components = [
  Alert,
  Button,
  Chip,
  ConfirmDialog,
  Dialog,
  FixedButton,
  Header,
  Input,
  Loading,
  Modal,
  SearchNav,
  SlideUpDialog,
  StandarizedContainer,
  StandarizedImage,
  Tabs,
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
