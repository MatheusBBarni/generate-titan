import { readJson, ensureDir, outputFile, readFile } from 'fs-extra'

import baseConfigFile from '../config/baseConfigFile'
import { CONFIG_FILE_NAME } from '../config/constants'

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
    } catch (error) {
      console.log(error)

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
    } catch (error) {
      console.log(error)

      return false
    }
  }

  toJson(object: unknown) {
    return JSON.stringify(object, undefined, 4)
  }

  async generateConfigFile() {
    await this.createFile(
      '.',
      `${CONFIG_FILE_NAME}.json`,
      this.toJson(baseConfigFile)
    )
  }
}

export default new FileService()
