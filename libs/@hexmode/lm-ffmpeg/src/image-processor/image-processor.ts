import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { FfmpegResponseLine, ImageInfo, PixelFormatId } from '../types';
import { CodecId, knownCodecs } from '../types/codecs';
import { fitFlags, ResizeFit, ResizeOptions } from './image-processor.types';

const prefix = /^( {2})*/g;

const inputLine = 'Input #0';

const streamLine = 'Stream ';

const formatParser =
  /^([A-Za-z0-9-_()/ ]+), ([a-z0-9]+)\(([a-z]+), ([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)\)/;

export class ImageProcessor {
  private readonly execFileAsync = promisify(execFile);

  constructor(private readonly fileName: string, private readonly ffmpeg = 'ffmpeg') {
  }

  readonly info = async (): Promise<ImageInfo> => {
    const result = await this.exec(
      ...this.withInput(),
      '-f',
      'null',
      '-'
    );

    const tree = this.makeTree(result.stderr);
    const input = tree.find(line => line.value.startsWith(inputLine));

    if (input === undefined) {
      throw new TypeError(`Could not parse the image - Input information is missing.`);
    }

    const stream = input.children.find(line => line.value.startsWith(streamLine));

    if (stream === undefined) {
      throw new TypeError(`Could not parse the image - Stream information is missing.`);
    }

    const split = stream.value.split(': ');

    if (split.length < 3) {
      throw new TypeError(`Could not parse the image - Stream is malformed (${stream}).`);
    }

    const parsed = split[2].match(formatParser);

    if (parsed === null || parsed.length < 7) {
      throw new TypeError(`Could not parse the image - Format data is incorrect.`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ _, imageFormat, pixelFormat, colorRange, colorSpace, colorPrimaries, colorTransfer ] = parsed;

    const info: ImageInfo = {
      imageFormat,
      pixelFormat,
      colorRange,
      colorSpace,
      colorPrimaries,
      colorTransfer
    };

    return info;
  };

  readonly resize = async (options: ResizeOptions): Promise<boolean> => {
    await this.exec(
      ...this.withInput(),
      ...this.withOverwrite(),
      ...this.withScale(options.width, options.height, options.fit),
      ...this.encodeAs(options.format),
      ...this.withQuality(options.format, options.quality),
      ...this.withOutput(options.fileName)
    );

    return true;
  };

  private readonly makeTree = (buffer: string): FfmpegResponseLine[] => {
    const lines = buffer.split('\n');
    const tree: FfmpegResponseLine[] = [];

    let path: FfmpegResponseLine[] = [];

    for (const line of lines) {
      const match = line.match(prefix);

      if (match === null || match.length === 0) {
        continue;
      }

      const level = Math.floor(match[0].length / 2);
      const item: FfmpegResponseLine = { value: line.trim(), children: [] };

      if (path.length === 0) {
        tree.push(item);
        path.push(item);
        continue;
      }

      if (level > 0) {
        if (path.length < level) {
          continue;
        }

        if (path.length > level) {
          path = path.slice(0, level);
        }

        const parent = path[level - 1];
        parent.children.push(item);
        path.push(item);
        continue;
      }

      tree.push(item);
      path = [ item ];
    }

    return tree;
  };

  private readonly exec = async (...args: string[]): Promise<{
    stdout: string;
    stderr: string;
  }> => {
    console.log(`${this.ffmpeg} ${args.join(' ')}`);
    return this.execFileAsync(this.ffmpeg, args);
  };

  private readonly withOverwrite = (): string[] => [ '-y' ];

  private readonly withInput = (): string[] => [ '-i', `${this.fileName}` ];

  private readonly withScale = (width: number, height: number, fit: ResizeFit): string[] => [
    '-vf',
    `scale=${width}:${height}:${fitFlags[fit]}:flags=lanczos:param0=3`
  ];

  private readonly withPixelFormat = (pixelFormat: PixelFormatId): string[] => [ '-pix_fmt', pixelFormat ];

  private readonly encodeAs = (codecId: CodecId): string[] => {
    const codec = knownCodecs[codecId];
    return codec.library !== undefined ? [ '-c:v', codec.library ] : [];
  };

  readonly withQuality = (codecId: CodecId, quality: number): string[] => {
    const q = Math.max(0, Math.min(1, quality));

    switch (codecId) {
      case 'avif':
        return [ '-crf', (63 - Math.floor(q * 63)).toString() ];

      case 'jpg':
        return [ '-qmin', '1', '-q:v', (31 - Math.floor(q * 30)).toString() ];
    }

    return [];
  };

  private readonly withOutput = (fileName: string): string[] => [ '-still-picture', '1', fileName ];
}
