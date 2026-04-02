export interface FfmpegResponseLine {
  value: string;
  children: FfmpegResponseLine[];
}

export interface ImageInfo {
  imageFormat: string;
  pixelFormat: string;
  colorRange: string;
  colorSpace: string;
  colorPrimaries: string;
  colorTransfer: string;
}
