let doc = document;
drawing = document.getElementById("logo");
drawing.width = 100;
drawing.height = 100;
ctx = drawing.getContext("2d");
let i = 0;

let arr = new Uint8Array(25);
window.crypto.getRandomValues(arr);

let maxHeight = (i) => {
    if(i < 12) i = 25 - i;
    return 5 * Math.sqrt(25*25 - i*i);
};

let loop = () => {
    let tempArr = new Uint8Array(1);
    window.crypto.getRandomValues(tempArr);
    arr.copyWithin(0,1,25);
    arr.set(tempArr,24);
    ctx.clearRect(0, 0, 100, 100);
    ctx.fillStyle = "#fff";
    
    for(i = 0; i < 25; i++){
        let j = arr[i] / 255 * 100;
        let l = Math.min(maxHeight(i), j);
        ctx.fillRect(i*4 - 1, (50 - (l/2)), 2, l);
    }
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.arc(50,50,49,0,2*Math.PI);
    ctx.lineWidth = 1;
    ctx.stroke();
    requestAnimationFrame(loop);   
};
loop();