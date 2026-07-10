(function egyptSymbols(){
    let svg = document.getElementById("egypt-bg");
    let W = window.innerWidth;
    let H = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    let symbols = ["☥","𓅓","𓂀","𓆣","𓇼"];
    let anmations = ["dw-up", "up-dw"]
    let html = "";

    for(let i = 0; i < 20; i++){

        let x = Math.random() * W;
        let y = Math.random() * H;
        let size = Math.random() * 20 + 10;

        let symbol = symbols[Math.floor(Math.random()*symbols.length)];
        let anmation = anmations[Math.floor(Math.random()*anmations.length)]

        html += `
        <text x="${x}" y="${y}" font-size="${size}"fill="#C9A84C"opacity="0.3" style="animation: ${anmation} 10s ease infinite;">${symbol}</text>
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


// fetch("./DATA/Eras.json")
// .then(res=>res.json())
// .then(data=>{

// let buttons = document.querySelector(".eras-buttons");

// data.forEach((era, index)=>{

//     let btn = document.createElement("button");

//     if(index === 0){
//         btn.classList.add("active");
//       showEra(era);
//     }

//     btn.innerHTML = era.name;
    

//     btn.onclick = ()=>{

//         showEra(era);
        
//         document.querySelectorAll("button")
//        .forEach(btn=>btn.classList.remove("active"));

//         btn.classList.add("active");


//     };


//     buttons.appendChild(btn);

// });

// });

// function showEra(era){

// let content = document.querySelector(".era-content");


// content.innerHTML = `

// <h2>${era.name}</h2>

// <h3>
// ${era.start} - ${era.end} ق.م
// </h3>

// <p>
// ${era.description}
// </p>

// `;

// }


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