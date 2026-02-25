import { generateFiles, joinPathFragments, names, Tree } from '@nx/devkit';
import { featurePath } from '../../lib/path-helper/path-helper';
import { FeatureGeneratorSchema } from './feature-schema';

export async function featureGenerator(tree: Tree, options: FeatureGeneratorSchema) {
  const path = featurePath(tree, options.project, options.name);

  if (tree.exists(path) && !tree.isFile(path)) {
    console.log(`Feature "${options.name}" already exists.`);
    return;
  }

  const { fileName } = names(options.name);

  generateFiles(
    tree,
    joinPathFragments(__dirname, 'files'),
    path,
    { fileName }
  );
}

export default featureGenerator;
