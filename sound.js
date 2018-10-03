let playSound = () =>  {
    var audioContext = new window.AudioContext();
    var bufferSize = 4096;
    var brownNoise = (function() {
        var lastOut = 0.0;
        var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
        node.onaudioprocess = function(e) {
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 0.5; 
            }
        }
        return node;
    })();
    
    brownNoise.connect(audioContext.destination);
}