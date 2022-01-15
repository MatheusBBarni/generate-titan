#!/usr/bin/env node

import colors from 'colors'
import prompts from 'prompts'
import Mustache from 'mustache'

import baseConfigFile from './config/baseConfigFile'
import { BaseConfigFile, TemplateType } from './models'
import FileService from './services/FileService'
import { NEXTJS_PAGE_FILE_NAME } from './config/constants'

// JSON.stringify(x, undefined, 4)

async function main(): Promise<void> {
  const [content, readJson] = await FileService.readJson<BaseConfigFile>(
    '.',
    'gtitan'
  )

  if (!readJson) {
    console.log(colors.red('Config file not found!'))
    console.log(colors.blue('Generating config file.'))
    await FileService.createFile(
      '.',
      'gtitan.json',
      JSON.stringify(baseConfigFile, undefined, 4)
    )
    console.log(colors.green('Generated gtitan.json!'))
    console.log(colors.green('Please, rerun the command.'))
    return
  }

  const { base_path, expect_param, nextjs, typescript } = content
  const extension = typescript ? 'tsx' : 'jsx'

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
    const [content, readFile] = await FileService.readFile(
      `${__dirname}/templates`,
      NEXTJS_PAGE_FILE_NAME
    )

    if (!readFile) {
      console.log(colors.red("Couldn't read the template."))
      console.log(colors.red('Check if the CLI have the right permissions!'))
      return
    }
    const output = Mustache.render(content, { name })

    const createdFile = await FileService.createFile(
      base_path,
      `${name}.${extension}`,
      output
    )

    if (!createdFile) {
      console.log(colors.red("Couldn't create the Nextjs Page."))
      console.log(colors.red('Check if the CLI have the right permissions!'))
      return
    }

    console.log(colors.green('Created the Nextjs Page.'))
  }
}

main()
