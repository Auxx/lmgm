import { joinPathFragments, readProjectConfiguration, Tree } from '@nx/devkit';

export function projectPath(tree: Tree, projectName: string): string {
  return readProjectConfiguration(tree, projectName).root;
}

export function projectSrcPath(tree: Tree, projectName: string): string {
  const result = readProjectConfiguration(tree, projectName).sourceRoot;

  if (result === undefined) {
    throw new Error(`No source folder for "${projectName}"`);
  }

  return result;
}

export function featurePath(tree: Tree, projectName: string, featureName: string): string {
  return joinPathFragments(projectSrcPath(tree, projectName), featureName);
}

export function pagePath(tree: Tree, projectName: string, featureName: string, pageName: string): string {
  return joinPathFragments(featurePath(tree, projectName, featureName), 'pages', pageName);
}

export function componentPath(tree: Tree, projectName: string, featureName: string, componentName: string): string {
  return joinPathFragments(featurePath(tree, projectName, featureName), 'components', componentName);
}
