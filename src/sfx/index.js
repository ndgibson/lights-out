import { Howl } from 'howler';

export const lightPressSfx = new Howl({
  preload: true,
  src: 'assets/sfx/button.mp3',
});

export const backgroundMusic = new Howl({
  loop: true,
  preload: true,
  src: 'assets/music/music.mp3',
});