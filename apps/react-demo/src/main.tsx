import ReactDOM from 'react-dom/client'
import { initArrowNavigation } from '@arrow-navigation/react'
import App from './App'
import './index.css'

initArrowNavigation({
  debug: true
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
