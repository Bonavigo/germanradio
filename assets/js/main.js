const AUDIO = {
	player: document.querySelector('.audio_player'),
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

		this.button_play_pause.setAttribute('onclick', `AUDIO.play_pause()`);
		this.volume_up.setAttribute('onclick', `AUDIO.volume('up')`);
		this.volume_down.setAttribute('onclick', `AUDIO.volume('down')`);

		var music = document.querySelectorAll('[data-music]');

		for (var i = music.length - 1; i >= 0; i--) {
			music[i].setAttribute('onclick', 'AUDIO.start_music(this.dataset.music)');
		}

		this.player.volume = 0.3;
		this.player.setAttribute('onended', 'play_pause()');
	},
	start_music(music) {
		AUDIO.play_pause();
		this.player.src = `assets/audio/${music}`;
		this.player.dataset.without = 'false';
		AUDIO.play_pause();
	},
	play_pause() {
		if (this.player.dataset.without != 'true') {
			if (this.player.dataset.status == 'paused') {
				this.player.play();
				this.button_play_pause.setAttribute('onclick', `AUDIO.play_pause()`);
				this.button_play_pause.firstChild.classList.remove('fa-play');
				this.button_play_pause.firstChild.classList.add('fa-pause');
				this.player.dataset.status = 'playing';
			} else {
				this.player.pause();
				this.button_play_pause.setAttribute('onclick', `AUDIO.play_pause()`);
				this.button_play_pause.firstChild.classList.remove('fa-pause');
				this.button_play_pause.firstChild.classList.add('fa-play');
				this.player.dataset.status = 'paused';
			}
		}
	},
	volume(to) {
		if (to == 'up') {
			try {
				this.player.volume += 0.1;
			}
			catch (e) {
				console.log(e.message);
			}
		} else {
			try {
				this.player.volume -= 0.1;
			}
			catch (e) {
				console.log(e.message);
			}
		}
	}
}

const KEYS_INTERPRETER = {
	interpret(event) {
		if (event.keyCode == '32') {
			AUDIO.play_pause();
		} else if (event.keyCode == '38') {
			AUDIO.volume('up');
		} else if (event.keyCode == '40') {
			AUDIO.volume('down');
		}
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	AUDIO.startup();
});

document.addEventListener("keydown", function(event) {
	KEYS_INTERPRETER.interpret(event);
});