import { TextEditor, IEventDesc, CompositeDisposable } from 'atom'
import { HoogleDocView as HoogleDocViewT, IProps as DocProps } from './hoogle-doc-view'
import { HoogleWebView as HoogleWebViewT, IProps as WebProps } from './hoogle-web-view'
import { Hoogle as HoogleT } from './hoogle'
export { config } from './config'

const disposables = new CompositeDisposable()
let hoogle: HoogleT

export function activate(state: never) {
  disposables.add(
    atom.packages.onDidTriggerActivationHook(
      'language-haskell:grammar-used',
      () => { reallyActivate(state) },
    ),
  )
}

export function createDocView(props: DocProps = {}): HoogleDocViewT {
  const {HoogleDocView}: {HoogleDocView: typeof HoogleDocViewT} = require('./hoogle-doc-view')
  return new HoogleDocView(props)
}

export function createWebView(props: WebProps = {}): HoogleWebViewT {
  const {HoogleWebView}: {HoogleWebView: typeof HoogleWebViewT} = require('./hoogle-web-view')
  return new HoogleWebView(props)
}

async function showDoc(ed: TextEditor, func: (sym: ISymbol) => void) {
  const token = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition())
  const {selectListView} = await import('./list-view')
  if (token) {
    const symbol = token.value
    const symbols = await hoogle.searchForSymbol(symbol)
    const item = await selectListView(symbols)
    if (item) {
      func(item)
    }
  }
}

async function reallyActivate(state: never) {
  if (hoogle) { return }
  const {Hoogle} = await import('./hoogle')
  const {openDoc, openWeb} = await import('./util')
  hoogle = new Hoogle()
  disposables.add(hoogle)

  disposables.add(atom.workspace.addOpener((uriToOpen: string, options: any) => {
    const m = uriToOpen.match(/^ide-haskell:\/\/hoogle\/(doc|web)\/(.*)$/)
    if (!(m && m[1])) {
      return undefined
    }
    switch (m[1]) {
      case 'doc':
        return createDocView()
      case 'web':
        return createWebView()
    }
  }))

  disposables.add(
    atom.commands.add('webview.ide-haskell-hoogle-web', {
      'ide-haskell-hoogle:web-go-back':
      ({ currentTarget }: IEventDesc) => (currentTarget as any).goBack(),
      'ide-haskell-hoogle:web-go-forward':
      ({ currentTarget }: IEventDesc) => (currentTarget as any).goForward(),
    }),
    atom.commands.add('atom-text-editor', {
      'ide-haskell-hoogle:show-doc-for-symbol': ({ currentTarget }: IEventDesc) => {
        showDoc(currentTarget.getModel(), openDoc)
      },
      'ide-haskell-hoogle:show-web-doc-for-symbol': ({ currentTarget }: IEventDesc) => {
        showDoc(currentTarget.getModel(), openWeb)
      },
    }),
  )
}

export function deactivate() {
  disposables.dispose()
}
