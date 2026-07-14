let x = new XMLHttpRequest();
let btn = document.getElementById("btn")

x.open("GET","./DATA/Eras.json")

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
                       <p class="m-0" dir="ltr">${eras[i].startDate} – ${eras[i].endDate}</p>
                    </div>
                    <h3>${eras[i].description}</h3>
                    <div class="eras-dtails d-flex justify-content-between align-items-center flex-wrap gap-sm-0 gap-3">
                        <div class="period-stats d-flex justify-content-center align-items-center gap-3 ">
                          <h4>${eras[i].dynasties.length} اسرة حاكمة</h4>
                          <h4>${eras[i].kings} ملوك</h4>
                        </div>
                        <a href="./Dynasties.html?id=${eras[i].id}" class="link-underline link-underline-opacity-0 explore-btn text-center d-flex gap-2 align-items-center ">
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
                       <p class="m-0" dir="ltr">${eras[i].startDate} - ${eras[i].endDate}</p>
                    </div>
                    <h3>${eras[i].description}</h3>
                    <div class="eras-dtails d-flex justify-content-between align-items-center flex-wrap gap-sm-0 gap-3">
                        <div class="period-stats d-flex justify-content-center align-items-center gap-3">
                          <h4>${eras[i].dynasties.length} اسرة حاكمة</h4>
                          <h4>${eras[i].kings} ملوك</h4>
                        </div>
                        <a href="./Dynasties.html?id=${eras[i].id}" class="link-underline link-underline-opacity-0 explore-btn text-center d-flex gap-2 align-items-center">
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