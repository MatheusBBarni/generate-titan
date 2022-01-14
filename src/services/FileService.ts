import { readJson, ensureDir, outputFile } from 'fs-extra'

class FileService {
  async readJson<T>(path: string, fileName: string): Promise<[T, boolean]> {
    try {
      const result = await readJson(`${path}/${fileName}.json`)

      return [result as T, true]
    } catch (error) {
      console.log(error)
      return [{} as T, false]
    }
  }

  async createDir(path: string, dirName: string): Promise<[string, boolean]> {
    try {
      await ensureDir(`${path}/${dirName}`)
      return [dirName, true]
    } catch (error) {
      console.log(error)
      return [dirName, false]
    }
  }

  async createFile(path: string, fileName: string, content: string | Buffer | Uint8Array): Promise<boolean> {
    try {
      await outputFile(`${path}/${fileName}`, content)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default new FileService()