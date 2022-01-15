import { readJson, ensureDir, outputFile, readFile } from 'fs-extra'

class FileService {
  async readJson<T>(path: string, fileName: string): Promise<[T, boolean]> {
    try {
      const result = await readJson(`${path}/${fileName}.json`)

      return [result as T, true]
    } catch {
      return [{} as T, false]
    }
  }

  async readFile(path: string, fileName: string): Promise<[string, boolean]> {
    try {
      const result = await readFile(`${path}/${fileName}`)

      return [result.toString(), true]
    } catch (error) {
      console.log(error)

      return ['', false]
    }
  }

  async createDir(path: string, dirName: string): Promise<[string, boolean]> {
    try {
      await ensureDir(`${path}/${dirName}`)
      return [dirName, true]
    } catch {
      return [dirName, false]
    }
  }

  async createFile(
    path: string,
    fileName: string,
    content: string | Buffer | Uint8Array
  ): Promise<boolean> {
    try {
      await outputFile(`${path}/${fileName}`, content)
      return true
    } catch {
      return false
    }
  }
}

export default new FileService()
