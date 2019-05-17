import * as get from 'request-promise-native'
import * as CP from 'child_process'
import { autobind } from 'core-decorators'

interface ResponseItem {
  docs: string
  item: string
  module: {
    name: string
    url: string
  }
  package: {
    name: string
    url: string
  }
  type: string
  url: string
}

interface ResponseItem4 {
  docs: string
  location: string
  self: string
}

type HoogleResponse = ResponseItem[] | {
  results: ResponseItem4[]
}

export class Hoogle {
  private attempts: number
  private port?: number
  private process?: CP.ChildProcess
  private hoogleBaseUrl = 'http://hoogle.haskell.org/'

  constructor() {
    this.attempts = 0
    atom.config.observe('ide-haskell-hoogle.hoogleType', (val: string) => {
      if (val) {
        this.killProcess()
        this.hoogleBaseUrl = val
      } else {
        this.spawnProcess()
        this.hoogleBaseUrl = `http://localhost:${this.port}/`
      }
    })
  }

  public async searchForSymbol(symbol: string): Promise<ISymbol[]> {
    // tslint:disable-next-line:no-unsafe-any
    const res: HoogleResponse = await get({
      uri: `${this.hoogleBaseUrl}?&hoogle=${symbol}&mode=json`,
      json: true,
    })

    if (Array.isArray(res)) {
      return Array.from(this.parseResults(res))
    } else {
      return Array.from(this.parseResults4(res.results))
    }
  }

  public dispose() {
    this.killProcess()
  }

  private *parseResults(results: ResponseItem[]) {
    for (const r of results) {
      const div = document.createElement('div')
      div.innerHTML = r.item
      const sig = div.innerText
      yield {
        mod: r.module.name,
        signature: sig.replace('<0>', ''),
        href: r.url,
        doc: r.docs,
      }
    }
  }

  private *parseResults4(results: ResponseItem4[]) {
    for (const r of results) {
      yield {
        mod: '',
        signature: r.self,
        href: r.location,
        doc: r.docs,
      }
    }
  }

  @autobind
  private onProcessExit() {
    console.warn('ide-haskell-hoogle: hoogle has died. stderr:\n' + this.process.stderr.read())
    this.process.stderr.end()
    if (this.attempts > 10) {
      console.warn('ide-haskell-hoogle: hoogle has died 10 times. Will not try to restart.') // tslint:disable-line: no-console
    } else {
      this.attempts += 1
      console.warn('ide-haskell-hoogle: hoogle died -- will try to restart') // tslint:disable-line: no-console
      window.setTimeout(() => this.spawnProcess(), this.attempts * 300)
    }
  }

  private spawnProcess() {
    const projectPath = atom.project.rootDirectories && atom.project.rootDirectories[0].path
    if (!projectPath) {
      console.warn('ide-haskell-hoogle: no global project; not starting hoogle')
      return
    }
    console.log('ide-haskell-hoogle: starting hoogle for project "' + projectPath + '" at http://localhost:8080') // tslint:disable-line: no-console
    // Note: If we want hoogle to be accessible to the user, we should use a standard location.
    this.port = 8080 // Math.floor(Math.random() * (60000 - 10000) + 10000)
    this.process = CP.spawn(
      'stack',
      ['hoogle', '--no-setup', '--server', '--', '--local'],
      {
        stdio: ['ignore', 'ignore', 'pipe'],
        cwd: projectPath,
        detached: false,
      },
    )
    this.process.once('exit', this.onProcessExit) // tslint:disable-line: no-unbound-method
  }

  private killProcess() {
    if (this.process !== undefined) {
      console.warn('ide-haskell-hoogle: killing hoogle') // tslint:disable-line: no-console
      this.process.removeAllListeners('exit')
      // Note (James): When using `stack hoogle`, SIGTERM doesn't actually terminate the underlying hoogle...
      this.process.kill('SIGINT')
      this.process = undefined
    }
  }
}
