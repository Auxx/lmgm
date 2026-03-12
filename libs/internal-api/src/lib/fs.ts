export interface FileInfo {
  id: string;
  name: string;
  path: string;
  ext: string;
  isDirectory: boolean;
}

export const supportedFileExtensions: string[] = [
  'jpg',
  'jpeg',
  'png',
  'webp',
  'avif'
];
