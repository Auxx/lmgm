import { join } from 'node:path';
import { ImageProcessor } from './image-processor';

describe('ImageProcessor', () => {
  const imageLocation = join(__dirname, '..', '..', 'test-assets');

  describe('info', () => {
    it.each`
    fileName                      | imageFormat | pixelFormat      | colorRange | colorSpace     | colorPrimaries | colorTransfer
    ${'avif-hdr-p3-01.avif'}      | ${'av1'}    | ${'yuv444p10le'} | ${'pc'}    | ${'smpte170m'} | ${'smpte432'}  | ${'smpte2084'}
    ${'avif-hdr-rec2020-01.avif'} | ${'av1'}    | ${'yuv444p10le'} | ${'pc'}    | ${'bt2020nc'}  | ${'bt2020'}    | ${'smpte2084'}
    ${'avif-sdr-p3-01.avif'}      | ${'av1'}    | ${'yuv444p10le'} | ${'pc'}    | ${'smpte170m'} | ${'smpte432'}  | ${'iec61966-2-1'}
    ${'jpeg-hdr-p3-01.jpg'}       | ${'mjpeg'}  | ${'yuvj444p'}    | ${'pc'}    | ${'bt470bg'}   | ${'unknown'}   | ${'unknown'}
    ${'jpeg-sdr-p3-01.jpg'}       | ${'mjpeg'}  | ${'yuvj444p'}    | ${'pc'}    | ${'bt470bg'}   | ${'unknown'}   | ${'unknown'}
    ${'jpeg-sdr-srgb-01.jpg'}     | ${'mjpeg'}  | ${'yuvj444p'}    | ${'pc'}    | ${'bt470bg'}   | ${'unknown'}   | ${'unknown'}
    ${'jxl-hdr-p3-01.jxl'}        | ${'jpegxl'} | ${'rgb48le'}     | ${'pc'}    | ${'gbr'}       | ${'smpte432'}  | ${'smpte2084'}
    ${'jxl-sdr-srgb-01.jxl'}      | ${'jpegxl'} | ${'rgb24'}       | ${'pc'}    | ${'gbr'}       | ${'bt709'}     | ${'iec61966-2-1'}
    `(
      'should return image information for $fileName',
      async ({ fileName, imageFormat, pixelFormat, colorRange, colorSpace, colorPrimaries, colorTransfer }) => {
        const imageProcessor = new ImageProcessor(join(imageLocation, fileName));
        const result = await imageProcessor.info();

        expect(result.imageFormat).toContain(imageFormat);
        expect(result.pixelFormat).toBe(pixelFormat);
        expect(result.colorRange).toBe(colorRange);
        expect(result.colorSpace).toBe(colorSpace);
        expect(result.colorPrimaries).toBe(colorPrimaries);
        expect(result.colorTransfer).toBe(colorTransfer);
      }
    );
  });
});
