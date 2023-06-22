if ('webkitSpeechRecognition' in window && 'speechSynthesis' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'es-ES';

    

    const synth = window.speechSynthesis;

    var voices = synth.getVoices();


    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const transcription = document.getElementById('transcription');
    const textInput = document.getElementById('text-input');
    const speakBtn = document.getElementById('speak-btn');

    recognition.onresult = function(event) {
        const result = event.results[event.resultIndex];
        const transcript = result[0].transcript;

        transcription.textContent = transcript;

        // Detener la transcripción cuando se haya terminado de hablar
        if (result.isFinal) {
            recognition.stop();

            // Repetir lo que se dijo usando la síntesis de voz
            speakText(transcript, enableRecognition);
              
    // Recorrer las voces y mostrar la información
    voices.forEach(function(voice, index) {
        console.log('Voz ' + (index + 1) + ':');
        console.log('  Nombre: ' + voice.name);
        console.log('  Idioma: ' + voice.lang);
        console.log('  URI de la voz: ' + voice.voiceURI);
        console.log('  Voz por defecto: ' + voice.default ? 'Sí' : 'No');
        console.log('  Voz local: ' + voice.localService ? 'Sí' : 'No');
        console.log('---');
      });
        }
    };

    recognition.onerror = function(event) {
        console.error('Error en el reconocimiento de voz: ' + event.error);
    };

    function enableRecognition() {
        startBtn.disabled = false;
    }

    function speakText(text, callback) {
        if (text !== '') {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-ES';

            utterance.onend = function() {
                if (typeof callback === 'function') {
                    callback();
                }
            };

            utterance.rate = 0.6

            synth.speak(utterance);
        }
    }

    startBtn.addEventListener('click', function() {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', function() {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });

    speakBtn.addEventListener('click', function() {
        speakText(textInput.value);
    });
} else {
    alert('Tu navegador no soporta la API de reconocimiento de voz o la API de síntesis de voz.');
}

