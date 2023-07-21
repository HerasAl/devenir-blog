

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    var waveform = document.getElementById('waveform');
    waveform.classList.add('uk-box-shadow-small');

    function animateWaveform() {
      requestAnimationFrame(animateWaveform);

      analyser.getByteTimeDomainData(dataArray);

      var amplitudeSum = dataArray.reduce(function(a, b) { return a + b; });
      var averageAmplitude = amplitudeSum / bufferLength;

      var waveHeight = averageAmplitude / 128 * 100;
      waveform.style.height = waveHeight + 'px';
    }

    animateWaveform();
  })
  .catch(function(error) {
    console.log('Se produjo un error al acceder al micrófono:', error);
  });


