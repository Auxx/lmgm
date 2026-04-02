import { CodecId } from '../types/codecs';

export type ResizeFit = 'contain' | 'cover' | 'fill';

export interface ResizeOptions {
  width: number;
  height: number;
  fileName: string;
  format: CodecId;
  quality: number;
  fit: ResizeFit;
}

export const fitFlags: Record<ResizeFit, string> = Object.freeze({
  contain: 'force_original_aspect_ratio=decrease',
  cover: 'force_original_aspect_ratio=increase',
  fill: 'force_original_aspect_ratio=disable'
});
