
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







// let counter = document.querySelector(".counter");


// let observer = new IntersectionObserver((entries)=>{

//     if(entries[0].isIntersecting){

//         startCounter();

//     }

// });


// observer.observe(counter);

// function startCounter(){

//     let count = 8000;
//     let target = 12482;

//     let interval = setInterval(()=>{

//         count += 500;

//         counter.innerHTML = count;


//         if(count >= target){

//             clearInterval(interval);

//         }

//     },5);

// }

// function startCounter(){

//     let current = 3000;
//     let target = 12482;

//     let interval = setInterval(()=>{

//     let step = (target - current) * 0.05;

//     current += step;

//     counter.innerHTML = Math.floor(current);


//     if(current >= target - 1){

//         counter.innerHTML = target;
//         clearInterval(interval);

//     }

// },10);

// }