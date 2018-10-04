var lines = () => {
    let drawing = document.getElementById("logo");

    let size = Math.min(drawing.width, drawing.height);

    let lines = size / 2;
    let lineWidth = 1;
    let lineWidthSpace = size / lines;
    
    drawing.width = size;
    drawing.height = size;
    let ctx = drawing.getContext("2d");
    let i = 0;
    
    let arr = new Uint8Array(lines);
    window.crypto.getRandomValues(arr);
    let tempArr = new Uint8Array(1);
    
    let maxHeight = (i) => {
        if (i < size / 2) i = i - 1;
        else i = i + lineWidth;
        let l = size / 2 - i;
        return 2 * Math.sqrt(size/2*size/2 - l*l);
    };
    ctx.fillStyle = "#fff";
    
    let loop = () => {
        window.crypto.getRandomValues(tempArr);
        arr.copyWithin(0, 1, lines);
        arr.set(tempArr, lines - 1);
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = "#fff";
        
        for(i = 0; i < size; i++){
            let j = arr[i] / 255 * size;
            let l = Math.min(maxHeight(i * lineWidthSpace), j);
            ctx.fillRect(i*size/lines, (size/2 - (l/2)), lineWidth, l);
        }
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.arc(size/2,size/2, size/2 - 1, 0, 2*Math.PI);
        ctx.lineWidth = 1;
        ctx.stroke();
        requestAnimationFrame(loop);   
    };
    loop();
}
lines();