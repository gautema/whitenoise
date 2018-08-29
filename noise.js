let noise = () => {
    let colors = [255,160,120,80,40,20,0,0];
    
    let drawing = document.getElementById("bg");
    let h = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    let w = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    );
    
    let blocksize = Math.floor(h / 2);
    let tilesize = Math.floor(blocksize / 8);
    
    let tiles_w = Math.floor(w / tilesize);
    let tiles_h = Math.floor(h / tilesize);
    
    drawing.width = w;
    drawing.height = h;
    
    let context = drawing.getContext("2d");
    context.beginPath();
    context.rect(0, 0, w, h);
    context.fillStyle = 'black';
    context.fill();
    let offBlockCanvas = document.createElement("canvas");
    let offBlockContext = offBlockCanvas.getContext("2d");
    offBlockCanvas.width = blocksize;
    offBlockCanvas.height = blocksize;
    
    imageData = offBlockContext.getImageData(0, 0, blocksize, blocksize);
    let imagedata = imageData.data;
    
    for (i = 0; i < blocksize * blocksize * 4; i += 4) {
        let pixelcolor = parseInt(Math.random() * 8)
        imagedata[i] = colors[pixelcolor];
        imagedata[i + 1] = colors[pixelcolor];
        imagedata[i + 2] = colors[pixelcolor];
        imagedata[i + 3] = 255;
    }
    
    offBlockContext.putImageData(imageData, 0, 0);
    
    let loopnoise = () => {
        requestAnimationFrame(loopnoise);
        for (let i = 0; i <= tiles_h; i++) {
            for (j = 0; j <= tiles_w; j++) {
                let next_x = Math.floor(Math.random() * (blocksize - tilesize))
                let next_y = Math.floor(Math.random() * (blocksize - tilesize))
                context.drawImage(offBlockCanvas, next_x, next_y, tilesize, tilesize, j * tilesize, i * tilesize, tilesize, tilesize);
            }
        }
    }
    loopnoise();
 }

noise();