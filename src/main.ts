import './app.scss'
import { App } from './components/App'
import { van } from './van'

van.add(document.getElementById('app')!, App())
