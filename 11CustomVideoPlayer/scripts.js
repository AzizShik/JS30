const player = document.querySelector('.player'),
  video = player.querySelector('.viewer'),
  progress = document.querySelector('.progress'),
  proggressBar = document.querySelector('.progress__filled'),
  toggle = player.querySelector('.toggle'),
  skipButtons = player.querySelectorAll('[data-skip]'),
  ranges = player.querySelectorAll('.player__slider'),
  speedValueElem = document.querySelector('.player__speed-value'),
  volumeValueElem = document.querySelector('.player__volume-value');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = video.paused ? '►' : '| |';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function hundleRangeUpdate() {
  video[this.name] = this.value;

  let speedValue = parseFloat(ranges[1].value);
  let volumeValue = Math.floor(parseFloat(ranges[0].value) * 100);

  speedValueElem.textContent = `${speedValue}x`;
  volumeValueElem.textContent = `${volumeValue}%`;

}


function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  proggressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', hundleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', hundleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);