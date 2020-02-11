import Alert from './Alert'
import BackToTopButton from './BackToTopButton'
import Button from './Button'
import Chip from './Chip'
import ConfirmDialog from './ConfirmDialog'
import Dialog from './Dialog'
import FixedButton from './FixedButton'
import Header from './Header'
import Input from './Input'
import Loading from './Loading'
import Modal from './Modal'
import SearchPanel from './SearchPanel'
import SlideUpDialog from './SlideUpDialog'
import SlideUpView from './SlideUpView'
import StandarizedContainer from './StandarizedContainer'
import StandarizedImage from './StandarizedImage'
import Tabs from './Tabs'
import Toast from './Toast'

const components = [
  Alert,
  BackToTopButton,
  Button,
  Chip,
  ConfirmDialog,
  Dialog,
  FixedButton,
  Header,
  Input,
  Loading,
  Modal,
  SearchPanel,
  SlideUpDialog,
  SlideUpView,
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
