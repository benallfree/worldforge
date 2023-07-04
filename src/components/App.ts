import buildInfo from '../../buildInfo.json'
import { gameStore } from '../store/gameStore'
import { a, bind, div, h1 } from '../van'
import classes from './App.module.scss'
import { Game } from './Game'

export const App = () => {
  const { loaded, modal } = gameStore
  return div(
    { class: classes.App },
    bind(loaded, (loaded) => {
      if (loaded) {
        return Game()
      }
      return h1(`WorldForge`)
    }),
    div(
      { class: classes.footer },
      a({ href: `https://github.com/benallfree/worldforge` }, `WorldForge`),
      ` build ${buildInfo.build}. Created with love under the MIT open source license. `
    ),
    modal()
  )
}
