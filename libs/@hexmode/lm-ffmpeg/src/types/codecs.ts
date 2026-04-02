export interface Codec {
  readonly id: string;
  readonly name: string;
  readonly ext: string;
  readonly library: string | undefined;
}

export const knownCodecs = Object.freeze(
  {
    avif: { id: 'avif', name: 'AVIF', ext: 'avif', library: 'libaom-av1' },
    jpg: { id: 'jpg', name: 'JPEG', ext: 'jpg', library: undefined },
    jxl: { id: 'jxl', name: 'JPEG XL', ext: 'jxl', library: 'libjxl' },
    png: { id: 'png', name: 'PNG', ext: 'png', library: undefined },
    webp: { id: 'webp', name: 'WebP', ext: 'webp', library: 'libwebp' }
  } satisfies Record<string, Codec>
);

export type CodecId = keyof typeof knownCodecs;
