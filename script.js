document.addEventListener('DOMContentLoaded', () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const notes = {
        'C': 261.63, // Do
        'D': 293.66, // Re
        'E': 329.63, // Mi
        'F': 349.23, // Fa
        'G': 392.00  // Sol
    };

    function playNote(frequency) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'triangle'; // triangle sounds a bit more like an organ than sine
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1.5);
    }

    const keys = document.querySelectorAll('.teclab');
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const note = key.getAttribute('data-nota');
            if (notes[note]) {
                playNote(notes[note]);
            }
        });
    });
});
