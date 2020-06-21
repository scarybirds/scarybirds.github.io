


function load() {
	var playSound = function() {
		var snd = new Audio("src/scary-sound.mp3");
		snd.currentTime=0;
		snd.play();
	};

	var SOUND_INTERVAL = null;

	var scheduleSound = function(event) {
		clearInterval(SOUND_INTERVAL);
		var value = event.target.value;

		if (value === '0') {
			displayStartedTime()
			return;
		}

		var time = value * 1000;
		var hour = new Date().getHours();
		var minutes = new Date().getMinutes();

		displayStartedTime(hour, minutes)
		SOUND_INTERVAL = setInterval(playIfSafeTime(hour), time);
	}

	var displayStartedTime = function(hour, minutes) {
		if (hour === undefined) {
	    	return document.getElementById('timer').innerHTML = ''
		}

		minutes = minutes >= 10 ? minutes : '0' + minutes 
	    var string = 'Started at <strong>' + hour + ':' + minutes + '</strong>'
	    document.getElementById('timer').innerHTML = string
	}

	var playIfSafeTime = function(hour) {
		var enable = hour >= 7  && hour <= 21;

		return enable ? playSound() : null
	}

	var button = document.getElementById('actionButton');
	button.addEventListener('click', playSound, false);


	var timer = document.getElementById('timeControl');
	timer.addEventListener('change', scheduleSound, false);
}


document.addEventListener("DOMContentLoaded", load, false);
