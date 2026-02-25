export type ComponentType = 'component' | 'page';

const componentFolder: Record<ComponentType, string> = {
  component: 'components',
  page: 'pages'
};

const componentSuffix: Record<ComponentType, string> = {
  component: 'component',
  page: 'page'
};

export function getComponentFolder(type: ComponentType) {
  return componentFolder[type];
}

export function getComponentSuffix(type: ComponentType) {
  return componentSuffix[type];
}
