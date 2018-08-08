import { Howl } from 'howler';

const lightPressSfx = new Howl({
  preload: true,
  src: 'assets/sfx/button.mp3',
});

export const playPress = () => {
  lightPressSfx.play();
};

const jumpSfx = new Howl({
  preload: true,
  src: 'assets/sfx/jump.mp3',
  volume: 0.1,
});

export const playJump = () => {
  jumpSfx.play();
};

const completeSfx = new Howl({
  src: 'assets/sfx/complete.mp3',
});

completeSfx.on('end', () => {
  backgroundMusic.mute(false);  
});

completeSfx.on('play', () => {
  backgroundMusic.mute(true);  
});

const backgroundMusic = new Howl({
  loop: true,
  preload: true,
  src: 'assets/music/music.mp3',
  volume: 0.2,
});

export const playBGM = () => {
  backgroundMusic.play();
}

export const pauseBGM = () => {
  backgroundMusic.pause();
}

export const playComplete = () => {
  completeSfx.play();
}