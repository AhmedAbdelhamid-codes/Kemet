// ============up to top for body=========== //
let btn_up_body = document.getElementById("btn-up_body")

window.addEventListener("scroll",function(){
  
  window.scrollY > 200 && window.scrollY < 3500? btn_up_body.classList.add("show") : btn_up_body.classList.remove("show") 
  
})

if(btn_up_body){
btn_up_body.addEventListener("click",function(){
       
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
})
}


(function egyptSymbols(){
    let svg = document.getElementById("egypt-bg");
    let W = window.innerWidth;
    let H = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    let symbols = ["☥","𓅓","𓂀","𓆣","𓇼"];
    let html = "";

    for(let i = 0; i < 50; i++){

        let x = Math.random() * W;
        let y = Math.random() * H;
        let size = Math.random() * 1 + 0.1;
        let time = Math.random()* 20 + 10

        // let symbol = symbols[Math.floor(Math.random()*symbols.length)];
        // <text x="${x}" y="${y}" font-size="${size}"fill="#C9A84C"opacity="0.3" style="animation: id ${time}s ease infinite;">${symbol}</text>
        html += `
        <circle cx="${x}" cy="${y}" r="${size}" fill="#C9A84C" opacity="0.3" style="animation: id ${time}s ease infinite;"/>
        `;
    }

    svg.innerHTML = html;

})();

//main page




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



//eras page

let x = new XMLHttpRequest();
let btn = document.getElementById("btn")

x.open("GET","../DATA/Eras.json")

x.send();

x.addEventListener("load",function(){

    if(x.status >= 200 && x.status < 300){
        console.log(JSON.parse(x.response))

        let eras = JSON.parse(x.response)
        let cards = document.getElementById("cards")
        let cartona = ""

        for(let i = 0; i < eras.length; i++ ){
          
            if(i % 2 == 0){
                  cartona += `
            <div class="timeline-item right position-relative ">
            <div class="data data-right position-absolute w-25 d-lg-flex d-none justify-content-start align-items-center gap-3">
              <div class="dott right-dott ${eras[i].colorEra}"></div>
               <div class="year w-50">
                ${eras[i].startDate}
              </div>
            </div>
            <div class="inner">
                  <div class="card-content p-4 d-flex flex-column gap-2 justify-content-between">
                    <div class="card-dtails d-flex justify-content-between align-items-center flex-wrap gap-sm-0 gap-3">
                      <h2 class="m-0">${eras[i].name}</h2>
                       <p class="m-0">${eras[i].startDate} ${eras[i].endDate}</p>
                    </div>
                    <h3>${eras[i].description}</h3>
                    <div class="eras-dtails d-flex justify-content-between align-items-center flex-wrap gap-sm-0 gap-3">
                        <div class="period-stats d-flex justify-content-center align-items-center gap-3 ">
                          <h4>${eras[i].dynasties.length} اسرة حاكمة</h4>
                          <h4>${eras[i].kings} ملوك</h4>
                        </div>
                        <a href="" class="link-underline link-underline-opacity-0 explore-btn text-center d-flex gap-2 align-items-center ">
                          استكشف الأسرات
                           <i class="fa-solid fa-arrow-left icon"></i>
                        </a>
                    </div>
                  </div>
            </div>
             
        </div>
            
          `
            }else{
                 cartona += `
                     <div class="timeline-item left position-relative ">
            <div class="data data-left position-absolute w-25 d-lg-flex d-none justify-content-end align-items-center gap-3 ">
               <div class="year text-end w-50">
                ${eras[i].startDate}
              </div>
              <div class="dott right-dott  ${eras[i].colorEra}"></div>
            </div>
            <div class="inner">
                  <div class="card-content p-4 d-flex flex-column gap-2 justify-content-between">
                    <div class="card-dtails d-flex justify-content-between align-items-center flex-wrap gap-sm-0 gap-3">
                      <h2 class="m-0">${eras[i].name}</h2>
                       <p class="m-0">${eras[i].startDate} - ${eras[i].endDate}</p>
                    </div>
                    <h3>${eras[i].description}</h3>
                    <div class="eras-dtails d-flex justify-content-between align-items-center flex-wrap gap-sm-0 gap-3">
                        <div class="period-stats d-flex justify-content-center align-items-center gap-3">
                          <h4>${eras[i].dynasties.length} اسرة حاكمة</h4>
                          <h4>${eras[i].kings} ملوك</h4>
                        </div>
                        <a href="" class="link-underline link-underline-opacity-0 explore-btn text-center d-flex gap-2 align-items-center">
                          استكشف الأسرات
                           <i class="fa-solid fa-arrow-left icon"></i>
                        </a>
                    </div>
                  </div>
            </div>
             
        </div>
          
          `
            }

         
            
        } 

        if(cards){
           cards.innerHTML= cartona;
        } 

       
    }

    let items = document.querySelectorAll(".timeline-item")

let observer2 = new IntersectionObserver(function(entries){

      console.log(entries)
    
        entries.forEach(function(entry){

        if(entry.isIntersecting){
           
            entry.target.classList.add("show")
            
        }

    });
   

});



items.forEach(function(card){
    observer2.observe(card)
});

 let timeline_items = document.querySelectorAll(".timeline-item")

 timeline_items.forEach(function(item){
    item.addEventListener("click",function(){
   
        let cruuntItem = item
        timeline_items.forEach(function(item){
            if(item !== cruuntItem){
                item.classList.remove("active")
            }
        })

        this.classList.toggle("active")
    })
 })

//  scroll
  

 const timeline = document.querySelector(".inners-period");

 if(timeline){
   const fill = document.querySelector(".progress-fill");

const eye = document.querySelector(".progress-eye");

window.addEventListener("scroll",()=>{

    const rect = timeline.getBoundingClientRect();

    const total = timeline.offsetHeight;

    let progress = (window.innerHeight - rect.top) / total;

    progress = Math.max(0,Math.min(progress,1));

    fill.style.width = `${progress*100}%`;

    eye.style.left = `${progress*100}%`;

});
 }

})





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