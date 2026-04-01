```shell
ffprobe -v error -select_streams v:0 -show_entries stream -of default=noprint_wrappers=1 C:\Users\Aleks\Desktop\Cat\avif-rec2020-01.avif
```

| key                  | avif-rec2020-01.avif        | avif-rec2020-max-01.avif    |
| -------------------- | --------------------------- | --------------------------- |
| codec_name           | av1                         | av1                         |
| codec_long_name      | Alliance for Open Media AV1 | Alliance for Open Media AV1 |
| profile              | High                        | High                        |
| codec_type           | video                       | video                       |
| codec_tag_string     | [0][0][0][0]                | [0][0][0][0]                |
| codec_tag            | 0x0000                      | 0x0000                      |
| width                | 3245                        | 3245                        |
| height               | 2160                        | 2160                        |
| coded_width          | 3245                        | 3245                        |
| coded_height         | 2160                        | 2160                        |
| closed_captions      | 0                           | 0                           |
| film_grain           | 0                           | 0                           |
| has_b_frames         | 0                           | 0                           |
| sample_aspect_ratio  | 1:1                         | 1:1                         |
| display_aspect_ratio | 649:432                     | 649:432                     |
| pix_fmt              | yuv444p10le                 | yuv444p10le                 |
| level                | 4                           | 4                           |
| color_range          | pc                          | pc                          |
| color_space          | bt2020nc                    | bt2020nc                    |
| color_transfer       | smpte2084                   | bt709                       |
| color_primaries      | bt2020                      | bt2020                      |
| chroma_location      | unspecified                 | unspecified                 |
| field_order          | unknown                     | unknown                     |

```shell
ffmpeg -i C:\Users\Aleks\Desktop\Cat\avif-rec2020-01.avif -vf "scale=640:360:force_original_aspect_ratio=decrease:flags=lanczos:param0=3" -c:v libaom-av1 -still-picture 1 -pix_fmt yuv444p10le C:\Users\Aleks\Desktop\Cat\avif-rec2020-01-thumb-l.avif
```

```shell
ffmpeg -i C:\Users\Aleks\Desktop\Cat\jxl-rec2020-01.jxl -vf "scale=640:360:force_original_aspect_ratio=decrease:flags=lanczos:param0=3" -c:v libaom-av1 -still-picture 1 -pix_fmt yuv444p10le C:\Users\Aleks\Desktop\Cat\jxl-rec2020-01-thumb.avif
```

```shell
C:\soft\bin\x\ffmpeg -i C:\Users\Aleks\Desktop\Cat\jxl-rec2020-01.jxl -vf "scale=640:360:force_original_aspect_ratio=decrease:flags=lanczos:param0=3" -c:v libaom-av1 -still-picture 1 -pix_fmt yuv444p10le C:\Users\Aleks\Desktop\Cat\jxl-rec2020-01-thumb.avif
```

```shell
ffmpeg -i C:\Users\Aleks\Desktop\Cat\avif-rec2020-01.avif -f null -
```
