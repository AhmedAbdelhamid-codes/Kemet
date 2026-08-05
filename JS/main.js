
(function egyptSymbols(){
    let svg = document.getElementById("egypt-bg");
    let W = window.innerWidth;
    let H = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    let symbols = ["☥","𓅓","𓂀","𓆣","𓇼"];
    let animations = ["dw-up" ,"up-dw"];

    let html = "";

    for(let i = 0; i < 20; i++){

        let x = Math.random() * W;
        let y = Math.random() * H;
        let size = Math.random() * 5 + 10;
        let symbol = symbols[Math.floor(Math.random()*symbols.length)];
        let animation = animations[Math.floor(Math.random() * animations.length)]

        html += `
        <text x="${x}" y="${y}" font-size="${size}" fill="#C9A84C" opacity="0.3" style="animation: ${animation}  6s ease infinite;">${symbol}</text>
         `;
    }

    svg.innerHTML = html;

})();

let cards = document.querySelectorAll(".card-animation")

let observer = new IntersectionObserver(function(entries){

      console.log(entries)
    
        entries.forEach(function(entry){

        if(entry.isIntersecting){

            let index = Array.from(cards).indexOf(entry.target);

            entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`;
        }

    });
   

});

cards.forEach(function(card , index){
    observer.observe(card)
});
