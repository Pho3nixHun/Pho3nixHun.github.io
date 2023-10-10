import { RandomKeyPipe } from './random-key.pipe';

describe('RandomKeyPipe', () => {
  it('create an instance', () => {
    const pipe = new RandomKeyPipe();
    expect(pipe).toBeTruthy();
  });
});
