export default function (plop) {
  plop.setGenerator('Create Component Only ', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter Component Name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{camelCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/Component.tsx.hbs',
      },
    ],
  });
}
