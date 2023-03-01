import { exportPuK, generate, importPuK, save } from './methods'

const RSA = {
  keys: {
    generate,
    publicKey: {
      export: exportPuK,
      import: importPuK,
      save
    }
  }
}

export default RSA
