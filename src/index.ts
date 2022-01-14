#!/usr/bin/env node

import colors from 'colors'
import prompts from 'prompts'
// import fs from 'fs-extra'

import { TemplateType } from './models/Template';


(async () => {
  console.log(colors.green('aaaa'))
  const response = await prompts({
    type: 'select',
    name: 'type',
    message: 'Pick a tempalte type',
    choices: [
      { title: 'React component', description: 'Create a folder with index.tsx and style.ts', value: TemplateType.REACT_COMPONENT },
      { title: 'NextJS Page', description: 'Create a file in NextJS', value: TemplateType.NEXTJS_PAGE },
    ],
    initial: 0
  });

  console.log(response.type === TemplateType.REACT_COMPONENT);
})();