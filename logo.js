let shaker = () => {
    let images = document.getElementsByTagName("path");
    Array.prototype.forEach.call(images, i => {
        i.setAttribute("fill", "#f1f1f1");
    });

    let loop = () => {
        requestAnimationFrame(loop);
        Array.prototype.forEach.call(images, i => {
            var num1 = Math.floor(Math.random() * 2) -1, num2 = Math.floor(Math.random() * 3) - 1;
            i.setAttribute("transform", `translate(${num1},${num2})`);
        });
    }
    loop();
}
shaker();