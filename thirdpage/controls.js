$(document).ready(function() {
	var audioplayer = $('.audio-player'),
		audioElement = $('.audio-player audio')[0],
		play = $('.audio-player .play'),
        previous = $('.audio-player .previous'),
        next = $('.audio-player .next'),
		progress = $('.audio-player .progress')[0],
		volume = $('.audio-player .volume'),
        audios = $('.audio-player audio source'),
        currentAudioIndex = 0;

	function updateProgressBar() {
		var progressPercentage = audioElement.currentTime / audioElement.duration;

		progress.value = progressPercentage;

        if (progressPercentage == 1) {
            playNext();
        }
	}

	function playOrPause() {
		if (audioElement.paused) {
			audioElement.play();	
		} else {
			audioElement.pause();
		}
	}

	function updateVolume(event) {
		var xPosition = event.pageX - this.offsetLeft,
        	clickedValue = xPosition * this.max / this.offsetWidth;
    
    	clickedValue = (clickedValue > 1) ? 1 : clickedValue;
    	clickedValue = (clickedValue < 0) ? 0 : clickedValue;

    	volume[0].value = clickedValue;
    	audioElement.volume = clickedValue;
	}

    function playNext() {
        audioElement.pause();

        currentAudioIndex++;

        if (currentAudioIndex >= audios.length) {
            currentAudioIndex = 0;
        }

        audioElement.src = audios[currentAudioIndex].src;

        audioElement.play();
    }

    function playPrevious() {
        audioElement.pause();

        currentAudioIndex--;

        if (currentAudioIndex < 0) {
            currentAudioIndex = audios.length - 1;
        }

        console.log(currentAudioIndex);
        audioElement.src = audios[currentAudioIndex].src;

        audioElement.play();   
    }

	play.click(playOrPause);

    next.click(playNext);

    previous.click(playPrevious);

	volume.click(updateVolume);

	setInterval(updateProgressBar, 10);

});
