import { Tree } from '@nx/devkit';
import { ComponentGeneratorSchema } from './component-schema';

export async function componentGenerator(tree: Tree, options: ComponentGeneratorSchema) {
  console.log(options)
}

export default componentGenerator;
