(function egyptbobbls(){
    let svg = document.getElementById("egypt-bg");
    let W = window.innerWidth;
    let H = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    let html = "";

    for(let i = 0; i < 50; i++){

        let x = Math.random() * W;
        let y = Math.random() * H;
        let size = Math.random() * 0.2 + 1;
        let time = Math.random() * 5 + 10;

        html += `
        <circle cx="${x}" cy="${y}" r="${size}" fill="#C9A84C" opacity="0.3" style="animation: id  ${time}s ease infinite;"/>
         `;
    }

    svg.innerHTML = html;

})();

let navbar = document.getElementById("my-nav");

window.addEventListener("scroll", function(){

    if(window.scrollY > 100){
        navbar.classList.add("show")
    }else{
        navbar.classList.remove("show")
    }

})


Promise.all([
    getdata("./DATA/Eras.json"),
    getdata("./DATA/Dynasties.json")
])
.then(function ([erasData, DynastiesData]) {
    // console.log(erasData);
    // console.log(DynastiesData);

    let eraId = getUrlId();
    let era = erasData.find(function(item){
      return item.id == eraId;
     });

     let Dynasties = DynastiesData.filter(function(dynasty){
        return era.dynasties.includes(dynasty.id)
     })
     console.log(era)
     console.log(Dynasties)

    document.getElementById("linkEra").innerHTML = `
    <a href="./Dynasties.html?id=${era.id}" title="${era.name}" class="eras-link link-underline link-underline-opacity-0">${era.name}</a>
     `
    let content_hero = document.getElementById("inerr-content")
    let hero = document.querySelector(".hero-Dynasties");

    content_hero.innerHTML = `
         <ul class="top list-unstyled d-flex justify-content-start align-items-center gap-2">
          <li>مصر القديمة</li>
          <li class="dot mb-2">.</li>
          <li>الحقبة التاريخية</li>
        </ul>
        <h1 class="tittle">
          
        </h1>
        <div class="date d-flex gap-1 mb-3">
            <span> 𓊇</span>
            <span dir="ltr" >  ${era.endDate} – ${era.startDate}</span>
            <span>𓊆</span>
        </div>
        <h2 class="description">${era.description}</h2>
    `
 
   hero.style.backgroundImage = `
      linear-gradient(to bottom,rgba(0, 0, 0, 0.249) 30%,black),
      linear-gradient(to right,rgba(0, 0, 0, 0.249) 20%,rgba(0, 0, 0, 0.764)),
       url("${era.image}")
    `;

    let title =  document.querySelector(".tittle")
    let words = era.name.split(" ")
    
    if(words.length === 3 || words.length === 5){
        if(words[0] === "عصر" || words[0] === "العصر"){
          words.shift();
       }
    }

    if(words.length === 2){

       title.innerHTML = `
          ${words[0]} <br>
         <span class="ms-5">${words[1]}</span>
       `;
    }else{
    title.innerHTML = `
          ${words[0] + words[1] } <br>
         <span class="ms-5">${words[2]}</span>
       `;
    }

    // des
    
    let description_tittle = document.querySelector(".description-tittle")
    let row = document.querySelector(".row")

    description_tittle.innerHTML = `
        <span class="mb-2 descriptionshow">السياق التاريخي</span>
        <h2 class="tittle descriptionshow">${era.name}</h2>
        <p class="paragraph descriptionshow"> قرون صنعت فيها مصر الحضارة الأبدية.</p>
        `
  
    row.innerHTML=`
      <div class="col-lg-6 col-12 d-flex">
            <div class="imge descriptionshow p-3 rounded-5 position-relative">
                <img src="${era.imageDescription}" class="w-100 h-100 rounded-4" alt="">
            </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="description-content">
                    <div class="sec position-relative mb-5 descriptionshow">
                        <h3 class="description-tittle">${era.fullDescription[0].title}</h3>
                        <p class="description-paragraph">${era.fullDescription[0].text}</p>
                    </div>
                    <div class="sec position-relative mb-5 descriptionshow">
                        <h3 class="description-tittle">${era.fullDescription[1].title}</h3>
                        <p class="description-paragraph">${era.fullDescription[1].text}</p>
                    </div>
                    <div class="sec position-relative mb-5 descriptionshow">
                        <h3 class="description-tittle">${era.fullDescription[2].title}</h3>
                        <p class="description-paragraph">${era.fullDescription[2].text}</p>
                    </div>
                    <div class="descriptionshow">
                        <h3 class="description-tittle">${era.fullDescription[3].title}</h3>
                        <p class="description-paragraph">${era.fullDescription[3].text}</p>
                    </div>
                </div>
            </div>
    `

    let cards = document.getElementById("cards")
    let Dynasties_tittle = document.getElementById("Dynasties-tittle")

    Dynasties_tittle.innerHTML = `
      <span class="mb-2 timelineShow">التسلسل الملكي</span>
      <h2 class="tittle timelineShow">اسرات ${era.name}</h2>
      <p class="paragraph timelineShow">${era.dynasties.length} بيوت ملكية شكَّلت قرون من الحضارة.</p>
    `

    let cartona =""
     for(let i = 0; i < Dynasties.length; i++ ){
          
            if(i % 2 == 0){
                
             if(Dynasties[i].hasPage){
              cartona += `
              <div class="timeline-item right position-relative timelineShow ">
                <div class="data data-right position-absolute w-25 d-lg-flex d-none justify-content-start align-items-center gap-3">
              <div class="dott right-dott ${Dynasties[i].themeColor}"></div>
             </div>
              <div class="inner position-relative border-opacity-25">
                   <div class="card-content d-flex flex-column gap-0 justify-content-between align-items-start">
                     <div class="year position-relative w-100 h-100">
                         <span class="position-absolute top-0 end-0" dir="ltr">${Dynasties[i].startDate} - ${Dynasties[i].endDate}</span>
                     </div>
                     <span class="liten_num m-0 p-0">${Dynasties[i].number}</span>
                     <h2 class="mb-3">${Dynasties[i].name}</h2>
                        <ul class="mb-3 kings list-unstyled d-flex justify-content-center align-items-center gap-2 mb-2 flex-wrap">
                         <li class="king">${Dynasties[i].featuredKings[0]}</li>
                         <li class="king">${Dynasties[i].featuredKings[1]}</li>
                         <li class="king">${Dynasties[i].featuredKings[2]}</li>
                         <li class="kings-count">${Dynasties[i].kings.length} ملوك</li>
                        </ul>
                       <h3>${Dynasties[i].description}</h3>
                         <div class="footer w-100 d-flex justify-content-between align-items-center">
                           <a href="" class="link-underline link-underline-opacity-0 explore-btn justify-content-center d-flex gap-2 align-items-center ">
                           استكشف الاسرة
                            <i class="fa-solid fa-arrow-left icon"></i>
                           </a>
                            <span class="d-block capital">العاصمة ${Dynasties[i].Capital}</span>
                         </div>
                   </div>
             </div>
            </div>
          `
             }
            else{
                 cartona +=`
                  <div class="timeline-item right position-relative  timelineShow">
                <div class="data data-right position-absolute w-25 d-lg-flex d-none justify-content-start align-items-center gap-3">
                <div class="dott right-dott ${Dynasties[i].themeColor}"></div>
               </div>
             <div class="inner position-relative border-opacity-25">
                   <div class="card-content d-flex flex-column gap-0 justify-content-between align-items-start">
                     <div class="year position-relative w-100 h-100">
                         <span class="position-absolute top-0 end-0" dir="ltr">${Dynasties[i].startDate} - ${Dynasties[i].endDate}</span>
                     </div>
                     <span class="liten_num m-0 p-0">${Dynasties[i].number}</span>
                     <h2 class="mb-3">${Dynasties[i].name}</h2>
                       <h3>${Dynasties[i].description}</h3>
                        <p>ملاحظة <br>
                          ${Dynasties[i].note}
                        </p>
                       <div class="footer w-100 d-flex justify-content-between align-items-center flex-wrap gap-lg-0 gap-3">
                           <span class="nothig">⚠️ معلومات تاريخية محدودة</span>
                            <span class="d-block capital">العاصمة ${Dynasties[i].Capital}</span>
                         </div>
                   </div>
             </div>
            </div>
                 `
                }
                  
            }else{


               if(Dynasties[i].hasPage){

                 cartona += `
                  <div class="timeline-item left position-relative  timelineShow">
                  <div class="data data-left position-absolute w-25 d-lg-flex d-none justify-content-start align-items-center gap-3">
                   <div class="dott right-dott ${Dynasties[i].themeColor}"></div>
                 </div>
                  <div class="inner position-relative border-opacity-25">
                     <div class="card-content d-flex flex-column gap-0 justify-content-between align-items-start">
                     <div class="year position-relative w-100 h-100">
                         <span class="position-absolute top-0 end-0" dir="ltr">${Dynasties[i].startDate} - ${Dynasties[i].endDate}</span>
                     </div>
                     <span class="liten_num m-0 p-0">${Dynasties[i].number}</span>
                     <h2 class="mb-3">${Dynasties[i].name}</h2>
                        <ul class="mb-3 kings list-unstyled d-flex justify-content-center align-items-center gap-2 mb-2 flex-wrap">
                         <li class="king">${Dynasties[i].featuredKings[0]}</li>
                         <li class="king">${Dynasties[i].featuredKings[1]}</li>
                         <li class="king">${Dynasties[i].featuredKings[2]}</li>
                         <li class="kings-count">${Dynasties[i].kings.length} ملوك</li>
                        </ul>
                       <h3>${Dynasties[i].description}</h3>
                         <div class="footer w-100 d-flex justify-content-between align-items-center">
                           <a href="" class="link-underline link-underline-opacity-0 explore-btn justify-content-center d-flex gap-2 align-items-center ">
                           استكشف الاسرة
                            <i class="fa-solid fa-arrow-left icon"></i>
                           </a>
                            <span class="d-block capital">العاصمة ${Dynasties[i].Capital}</span>
                         </div>
                     </div>
                  </div>
                </div>
          `
                }
                else{
                    cartona += `
             <div class="timeline-item left position-relative timelineShow">
                <div class="data data-left position-absolute w-25 d-lg-flex d-none justify-content-start align-items-center gap-3">
                  <div class="dott right-dott ${Dynasties[i].themeColor}"></div>
                </div>
             <div class="inner position-relative border-opacity-25">
                   <div class="card-content d-flex flex-column gap-0 justify-content-between align-items-start">
                     <div class="year position-relative w-100 h-100">
                         <span class="position-absolute top-0 end-0" dir="ltr">${Dynasties[i].startDate} - ${Dynasties[i].endDate}</span>
                     </div>
                     <span class="liten_num m-0 p-0">${Dynasties[i].number}</span>
                     <h2 class="mb-3">${Dynasties[i].name}</h2>
                       <h3>${Dynasties[i].description}</h3>
                        <p>ملاحظة <br>
                          ${Dynasties[i].note}
                        </p>
                       <div class="footer w-100 d-flex justify-content-between align-items-center flex-wrap gap-lg-0 gap-3">
                           <span class="nothig">⚠️ معلومات تاريخية محدودة</span>
                            <span class="d-block capital">العاصمة ${Dynasties[i].Capital}</span>
                         </div>
                   </div>
             </div>
            </div>
                    `
                }
            }
        } 

        cards.innerHTML= cartona
  
       let descriptions = document.querySelectorAll(".descriptionshow")
       let timelines = document.querySelectorAll(".timelineShow")
       let items = document.querySelectorAll(".AntiquitiesShow")

    let observer = new IntersectionObserver(function(entries){

         entries.forEach(function(entry){
            if(entry.isIntersecting){

              if(entry.target.classList.contains("descriptionshow")){
                let index = Array.from(descriptions).indexOf(entry.target)
                entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`
              }

              if(entry.target.classList.contains("timelineShow")){
                 let index = Array.from(timelines).indexOf(entry.target)
                entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`
              }


              if(entry.target.classList.contains("AntiquitiesShow")){
                 let index = Array.from(timelines).indexOf(entry.target)
                entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`
              }
            }
         })
    });



    descriptions.forEach(function(description){
        observer.observe(description)
    })

    timelines.forEach(function(timeline){
      observer.observe(timeline)
    })

    items.forEach(function(item){
      observer.observe(item)
    })
});



