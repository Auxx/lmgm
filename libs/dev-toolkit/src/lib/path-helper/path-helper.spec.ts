import { addProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from 'nx/src/generators/testing-utils/create-tree-with-empty-workspace';
import { componentPath, featurePath, pagePath, projectPath, projectSrcPath } from './path-helper';

describe('Path Helper', () => {
  let tree: Tree;

  const appName = 'my-app';
  const libName = 'my-lib';

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    addProjectConfiguration(
      tree,
      appName,
      {
        projectType: 'application',
        root: `apps/${appName}`,
        sourceRoot: `apps/${appName}/src`
      },
      true
    );

    addProjectConfiguration(
      tree,
      libName,
      {
        projectType: 'application',
        root: `libs/${libName}`,
        sourceRoot: `libs/${libName}/src`
      },
      true
    );
  });

  describe('projectPath', () => {
    it.each`
    projectName | expectedPath
    ${appName}  | ${`apps/${appName}`}
    ${libName}  | ${`libs/${libName}`}
    `('should return path to project $projectName', ({ projectName, expectedPath }) => {
      expect(projectPath(tree, projectName)).toBe(expectedPath);
    });
  });

  describe('projectSrcPath', () => {
    it.each`
    projectName | expectedPath
    ${appName}  | ${`apps/${appName}/src`}
    ${libName}  | ${`libs/${libName}/src`}
    `('should return path to project source $projectName', ({ projectName, expectedPath }) => {
      expect(projectSrcPath(tree, projectName)).toBe(expectedPath);
    });
  });

  describe('featurePath', () => {
    it.each`
    projectName | featureName  | expectedPath
    ${appName}  | ${'app'}     | ${`apps/${appName}/src/app`}
    ${appName}  | ${'welcome'} | ${`apps/${appName}/src/welcome`}
    ${appName}  | ${'auth'}    | ${`apps/${appName}/src/auth`}
    ${libName}  | ${'layouts'} | ${`libs/${libName}/src/layouts`}
    ${libName}  | ${'dialogs'} | ${`libs/${libName}/src/dialogs`}
    `(
      'should return path to feature $featureName inside project $projectName',
      ({ projectName, featureName, expectedPath }) => {
        expect(featurePath(tree, projectName, featureName)).toBe(expectedPath);
      }
    );
  });

  describe('pagePath', () => {
    it.each`
    projectName | featureName  | pageName             | expectedPath
    ${appName}  | ${'welcome'} | ${'dashboard'}       | ${`apps/${appName}/src/welcome/pages/dashboard`}
    ${appName}  | ${'auth'}    | ${'login'}           | ${`apps/${appName}/src/auth/pages/login`}
    ${appName}  | ${'auth'}    | ${'forgot-password'} | ${`apps/${appName}/src/auth/pages/forgot-password`}
    `('should return path to page $pageName', ({ projectName, featureName, pageName, expectedPath }) => {
      expect(pagePath(tree, projectName, featureName, pageName)).toBe(expectedPath);
    });
  });

  describe('componentPath', () => {
    it.each`
    projectName | featureName  | componentName  | expectedPath
    ${appName}  | ${'welcome'} | ${'user-info'} | ${`apps/${appName}/src/welcome/components/user-info`}
    ${appName}  | ${'auth'}    | ${'reset'}     | ${`apps/${appName}/src/auth/components/reset`}
    ${appName}  | ${'auth'}    | ${'back'}      | ${`apps/${appName}/src/auth/components/back`}
    `('should return path to component $componentName', ({ projectName, featureName, componentName, expectedPath }) => {
      expect(componentPath(tree, projectName, featureName, componentName)).toBe(expectedPath);
    });
  });
});
