let bglines = () => {
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
    let size = w;
    let lines = size / 2;
    let lineWidth = 1;
    
    drawing.width = w;
    drawing.height = h;
    let ctx = drawing.getContext("2d");
    let i = 0;
    
    let arr = new Uint8Array(lines);
    window.crypto.getRandomValues(arr);
    let tempArr = new Uint8Array(1);
    
    ctx.fillStyle = "#000";
    
    let bgloop = () => {
        window.crypto.getRandomValues(tempArr);
        arr.copyWithin(0, 1, lines);
        arr.set(tempArr, lines - 1);
        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = "#000";

        for(i = 0; i < size; i++){
            let l = arr[i] / 255 * h;
            ctx.fillRect(i*size/lines, (h/2 - (l/2)), lineWidth, l);
        }
        requestAnimationFrame(bgloop);   
    };
    bgloop();
}
bglines();


