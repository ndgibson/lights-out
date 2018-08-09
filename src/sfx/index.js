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

const errorSfx = new Howl({
  src: 'assets/sfx/error.mp3',
});

export const playError = () => {
  errorSfx.play();
};

const completeSfx = new Howl({
  src: 'assets/sfx/complete.mp3',
  volume: 0.5,
});

completeSfx.on('end', () => {
  backgroundMusic.mute(false);  
});

completeSfx.on('play', () => {
  backgroundMusic.mute(true);
  backgroundMusic2.mute(true);
  backgroundMusic3.mute(true);
  backgroundMusic4.mute(true);
});

const backgroundMusic = new Howl({
  preload: true,
  src: 'assets/music/music.mp3',
  volume: 0.2,
});

backgroundMusic.on('end', () => {
  backgroundMusic2.play();  
});

const backgroundMusic2 = new Howl({
  preload: true,
  src: 'assets/music/music2.mp3',
  volume: 0.2,
});

backgroundMusic2.on('end', () => {
  backgroundMusic3.play();  
});

const backgroundMusic3 = new Howl({
  preload: true,
  src: 'assets/music/music3.mp3',
  volume: 0.2,
});

backgroundMusic3.on('end', () => {
  backgroundMusic4.play();  
});

const backgroundMusic4 = new Howl({
  preload: true,
  src: 'assets/music/music4.mp3',
  volume: 0.2,
});

backgroundMusic4.on('end', () => {
  backgroundMusic.play();
});

completeSfx.on('end', () => {
  backgroundMusic.mute(false);
  backgroundMusic2.mute(false);
  backgroundMusic3.mute(false);
  backgroundMusic4.mute(false);
});

export const playBGM = () => {
  const bgms = [
    backgroundMusic,
    backgroundMusic2,
    backgroundMusic3,
    backgroundMusic4
  ];
  bgms[(Math.floor(Math.random()*4))].play();
}

export const pauseBGM = () => {
  backgroundMusic.stop();
  backgroundMusic2.stop();
  backgroundMusic3.stop();
  backgroundMusic4.stop();
}

export const playComplete = () => {
  completeSfx.play();
}