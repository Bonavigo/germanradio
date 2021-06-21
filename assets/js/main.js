const AUDIO = {
	player: null,
	volume_down: null,
	button_play_pause: null,
	volume_up: null,
	startup() {
		var loader = document.querySelector('#loader');
		var player = document.querySelector('#player');

		loader.classList.add('display-none');
		player.classList.remove('display-none');

		this.volume_down = document.querySelector('#volume_down');
		this.button_play_pause = document.querySelector('#button_play_pause');
		this.volume_up = document.querySelector('#volume_up');

		this.button_play_pause.setAttribute('onclick', `AUDIO.play_music()`);
		this.volume_up.setAttribute('onclick', `AUDIO.volume('up')`);
		this.volume_down.setAttribute('onclick', `AUDIO.volume('down')`);

		var music = document.querySelectorAll('[data-music]');

		for (var i = music.length - 1; i >= 0; i--) {
			music[i].setAttribute('onclick', 'AUDIO.start_music(this.dataset.music)');
		}

		this.player = document.querySelector('.audio_player');
		this.player.volume = 0.3;
		this.player.setAttribute('onended', 'pause_music()');
	},
	start_music(music) {
		this.player.src = `assets/audio/${music}`;
		this.player.dataset.without = 'false';
		AUDIO.play_music();
	},
	play_music() {
		if (this.player.dataset.without != 'true') {
			this.player.play();
			this.button_play_pause.setAttribute('onclick', `AUDIO.pause_music()`);
			this.button_play_pause.firstChild.classList.remove('fa-play');
			this.button_play_pause.firstChild.classList.add('fa-pause');
		}
	},
	pause_music() {
		this.player.pause();
		this.button_play_pause.setAttribute('onclick', `AUDIO.play_music()`);
		this.button_play_pause.firstChild.classList.remove('fa-pause');
		this.button_play_pause.firstChild.classList.add('fa-play');
	},
	volume(to) {
		if (to == 'up') {
			this.player.volume += 0.1;
		} else {
			this.player.volume -= 0.1;
		}
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	AUDIO.startup();
});