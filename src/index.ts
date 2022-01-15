#!/usr/bin/env node

import colors from 'colors'
import prompts from 'prompts'

import FileService from './services/FileService'
import TemplateService from './services/TemplateService'
import { BaseConfigFile, TemplateType } from './models'
import { CONFIG_FILE_NAME } from './config/constants'

async function main(): Promise<void> {
  const [content, haveConfigFile] = await FileService.readJson<BaseConfigFile>(
    '.',
    CONFIG_FILE_NAME
  )

  if (!haveConfigFile) {
    console.log(colors.red('Config file not found!'))
    console.log(colors.blue('Generating config file...'))

    await FileService.generateConfigFile()

    console.log(colors.green('Generated gtitan.json!'))
    console.log(colors.green('Please, rerun the command...'))
    return
  }

  const { base_path, expect_param, nextjs, typescript } = content
  const extension = typescript ? 'ts' : 'js'

  const questions: prompts.PromptObject<string>[] = []

  if (nextjs) {
    questions.push({
      type: 'select',
      name: 'type',
      message: 'Pick a template type',
      choices: [
        {
          title: 'React component',
          description: 'Create a folder with index.tsx and style.ts',
          value: TemplateType.REACT_COMPONENT
        },
        {
          title: 'NextJS Page',
          description: 'Create a file in NextJS',
          value: TemplateType.NEXTJS_PAGE
        }
      ],
      initial: 0
    })
  }

  if (expect_param) {
    questions.push({
      type: 'text',
      name: 'name',
      message: `Name of the component${nextjs ? '/page' : ''}`
    })
  }

  const response = await prompts(questions)

  const name = !response.name ? 'index' : response.name

  if (response.type === TemplateType.NEXTJS_PAGE) {
    const createdTemplate = await TemplateService.generateNextjsPage({
      extension,
      params: { name },
      fileName: name,
      basePath: base_path
    })

    if (!createdTemplate) {
      console.log(colors.red("Couldn't create the Nextjs Page."))
      console.log(colors.red('Check if the CLI have the right permissions!'))
      return
    }

    console.log(colors.green('Created Nextjs Page.'))
  }

  if (response.type === TemplateType.REACT_COMPONENT || !response.type) {
    const createdTemplate = await TemplateService.generateReactComponent({
      extension,
      params: { name },
      fileName: name,
      basePath: base_path
    })

    if (!createdTemplate) {
      console.log(colors.red("Couldn't create the React component dir."))
      console.log(colors.red('Check if the CLI have the right permissions!'))
      return
    }

    console.log(colors.green('Created React component dir.'))
  }
}

main()
