import { lmFfmpeg } from './lm-ffmpeg';

describe('lmFfmpeg', () => {
  it('should work', () => {
    expect(lmFfmpeg()).toEqual('lm-ffmpeg');
  });
});
