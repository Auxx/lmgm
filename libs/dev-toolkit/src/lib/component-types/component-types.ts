export type ComponentType = 'component' | 'page';

export const defaultComponentPrefix = 'app';

const componentFolder: Record<ComponentType, string> = {
  component: 'components',
  page: 'pages'
};

const componentSuffix: Record<ComponentType, string> = {
  component: 'component',
  page: 'page'
};

const componentClassSuffix: Record<ComponentType, string> = {
  component: 'Component',
  page: 'Page'
};

export function getComponentFolder(type: ComponentType) {
  return componentFolder[type];
}

export function getComponentSuffix(type: ComponentType) {
  return componentSuffix[type];
}

export function getComponentClassSuffix(type: ComponentType) {
  return componentClassSuffix[type];
}
