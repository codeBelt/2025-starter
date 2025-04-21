export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('Create Component Only', {
    prompts: [{type: 'input', name: 'name', message: 'Enter Component Name'}],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{camelCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/Component.tsx.hbs',
      },
    ],
  });

  plop.setGenerator('Create Component and Supporting Files ', {
    prompts: [{type: 'input', name: 'name', message: 'Enter Component Name'}],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{camelCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{camelCase name}}/{{pascalCase name}}.utils.ts',
        templateFile: 'templates/emptyFile.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{camelCase name}}/{{pascalCase name}}.types.ts',
        templateFile: 'templates/emptyFile.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{camelCase name}}/{{pascalCase name}}.constants.ts',
        templateFile: 'templates/emptyFile.ts.hbs',
      },
    ],
  });

  plop.setGenerator('Create Util', {
    description: 'Generates a utility file/folder and places it in the "utils" directory',
    prompts: [{type: 'input', name: 'name', message: 'Enter Utility Name'}],
    actions: [
      {
        type: 'add',
        path: 'src/utils/{{camelCase name}}/{{camelCase name}}.ts',
        templateFile: 'templates/emptyFile.ts.hbs',
      },
    ],
  });
}
