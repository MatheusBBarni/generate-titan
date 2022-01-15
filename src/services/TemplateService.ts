import path from 'path'
import Mustache from 'mustache'

import {
  NEXTJS_PAGE_FILE_NAME,
  REACT_COMPONENT_DIR,
  REACT_INDEX_FILE,
  REACT_STYLES_FILE
} from '../config/constants'
import FileService from './FileService'

export type GenerateTemplateParam = {
  params: unknown
  fileName: string
  extension: string
  basePath: string
}

class TemplateService {
  private readonly BASE_PATH: string = path.resolve(__dirname, '..')

  async generateNextjsPage({
    params,
    fileName,
    extension,
    basePath
  }: GenerateTemplateParam): Promise<boolean> {
    const [content, readFile] = await FileService.readFile(
      `${this.BASE_PATH}/templates`,
      NEXTJS_PAGE_FILE_NAME
    )

    if (!readFile) return readFile

    const output = Mustache.render(content, params)

    const createdFile = await FileService.createFile(
      basePath,
      `${fileName}.${extension}x`,
      output
    )

    return createdFile
  }

  async generateReactComponent({
    params,
    fileName,
    extension,
    basePath
  }: GenerateTemplateParam): Promise<boolean> {
    const [dirName, createdDir] = await FileService.createDir(
      basePath,
      fileName
    )

    if (!createdDir) return false

    const [indexContent, readIndexFile] = await FileService.readFile(
      `${this.BASE_PATH}/templates/${REACT_COMPONENT_DIR}`,
      REACT_INDEX_FILE
    )
    const [stylesContent, readStylesFile] = await FileService.readFile(
      `${this.BASE_PATH}/templates/${REACT_COMPONENT_DIR}`,
      REACT_STYLES_FILE
    )

    if (!readIndexFile || !readStylesFile) return false

    const outputIndex = Mustache.render(indexContent, params)
    const outputStyles = Mustache.render(stylesContent, params)

    const createdIndexFile = await FileService.createFile(
      `${basePath}/${dirName}`,
      `index.${extension}x`,
      outputIndex
    )

    if (!createdIndexFile) return false

    const createdStylesFile = await FileService.createFile(
      `${basePath}/${dirName}`,
      `styles.${extension}`,
      outputStyles
    )

    if (!createdStylesFile) return false

    return true
  }
}

export default new TemplateService()
