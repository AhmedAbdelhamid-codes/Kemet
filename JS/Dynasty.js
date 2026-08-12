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

Promise.all([ 
    getdata("./DATA/Eras.json"),
    getdata("./DATA/Dynasties.json"),
    getdata("./DATA/kings.json")
])
.then(function ([erasData, DynastiesData, kingsaData]){

    let params = getUrlId();

    console.log(params)

    let dynastyId = params.get("dynasty-id")

    let Dynasty = DynastiesData.find(function(Dynasty){
       return Dynasty.id == dynastyId
   })

    let era = erasData.find(function(era){
        return era.id == Dynasty.eraId
    })

    let kings = kingsaData.filter(function(king){
        return Dynasty.kings.includes(king.id)
    })
   
    console.log(Dynasty)
    console.log(kings)

    document.getElementById("linkEra").innerHTML= `
     <a href="./Dynasties.html?era-id=${era.id}" title="${era.name}" class="eras-link link-underline link-underline-opacity-0">${era.name}</a>
    `
    document.getElementById("linkDynasty").innerHTML =`
     <a href="./Dynasty.js?dynasty-id=${Dynasty.id}" title="${Dynasty.name}" class="eras-link link-underline link-underline-opacity-0">${Dynasty.name}</a>
    `
  
    let hero_content = document.querySelector(".hero-content");
    let details = document.querySelector(".details-row");
    let description = document.querySelector(".description-row") ;

    hero_content.innerHTML = `
      <h4>${era.name}</h4>
      <span>الاسرة ${Dynasty.number}</span>
      <h1>${Dynasty.name}</h1>
      <ul class="list-unstyled d-flex justify-content-center align-items-center gap-4 flex-wrap">
        <li dir="ltr">${Dynasty.startDate} BC - ${Dynasty.endDate} BC</li>
        <li>.</li>
        <li>${Dynasty.Capital}</li>
        <li>.</li>
        <li> ${Dynasty.kings.length} من الملوك المعروفين  </li>
      </ul>
    `

    details.innerHTML =`
     <div class="col-lg-2 col-md-3 col-4">
        <div class="FOUNDED space">
            <h3 class="tittle fs-5">بدأت</h3>
            <p class="paragraph counter">${Dynasty.startDate - Dynasty.endDate}</p>
        </div>
    </div>
    <div class="col-lg-2 col-md-3 col-4">
        <div class="DURATION space">
            <h3 class="tittle fs-5">الفترة</h3>
            <p class="paragraph">${Dynasty.startDate - Dynasty.endDate}~ من السنين</p>
        </div>
    </div>
    <div class="col-lg-2 col-md-3 col-4">
        <div class="CAPITAL space">
            <h3 class="tittle fs-5">العاصمة</h3>
            <p class="paragraph">${Dynasty.Capital}</p>
        </div>
    </div>
    <div class="col-lg-2 col-md-3 col-4">
        <div class="RULERS">
            <h3 class="tittle fs-5">الملوك</h3>
            <p class="paragraph">${Dynasty.kings.length} من الملوك</p>
        </div>
    </div>
    `

    description.innerHTML = `
     <div class="col-lg-5 col-12">
           <h2 class="description-tittle mb-4">${Dynasty.title}</h2>
           <div class="description-Dynasty d-flex justify-content-center gap-4 flex-column">
            <p class="m-0">${Dynasty.description_page[0]}</p>
            <p class="m-0">${Dynasty.description_page[1]}</p>
            <p class="m-0">${Dynasty.description_page[2]}</p>
           </div>
        </div>
        <div class="col-lg-4 col-12">
            <h2 class="Achievements-tittle mb-4">أبرز انجازات الاسرة</h2>
            <div class="Achievements d-flex flex-column gap-2">
                <div class="Achievement position-relative">
                   <h3>${Dynasty.majorAchievements[0].tittle}</h3>
                   <p>${Dynasty.majorAchievements[0].paragraph}</p>
                </div>
                <div class="Achievement position-relative">
                   <h3>${Dynasty.majorAchievements[1].tittle}</h3>
                   <p>${Dynasty.majorAchievements[1].paragraph}</p>
                </div>
                <div class="Achievement position-relative">
                   <h3>${Dynasty.majorAchievements[2].tittle}</h3>
                   <p>${Dynasty.majorAchievements[2].paragraph}</p>
                </div>
                <div class="Achievement position-relative">
                   <h3>${Dynasty.majorAchievements[3].tittle}</h3>
                   <p>${Dynasty.majorAchievements[3].paragraph}</p>
                </div>
                <div class="Achievement position-relative">
                   <h3>${Dynasty.majorAchievements[4].tittle}</h3>
                   <p>${Dynasty.majorAchievements[4].paragraph}</p>
                </div>
            </div>
        </div>
    `

    let kings_cards = document.getElementById("cards")

     let cards = ""
     for(let i = 0; i < kings.length; i++){
        
        if(kings[i].featured) {
             cards+= `
              <div class="col item">
                <div class="card">
                <img src="${kings[i].image}" class="card-img-top" alt="${kings[i].name}">
                <div class="card-body d-flex flex-column">
               <div class="dtails d-flex justify-content-between align-items-center flex-wrap">
                 <span>0${i + 1}</span>
                 <span>${kings[i].startDate - kings[i].endDate} عام</span>
              </div>
              <h5 class="card-title mb-2 d-flex justify-content-start align-items-center gap-1">${kings[i].name} 
                <i class="fa-solid fa-star star"></i>
              </h5>
            <h6 class="card-subtitle mb-3 ">${kings[i].title}</h6>
            <h6 class="card-history mb-4 ">${kings[i].startDate} – ${kings[i].endDate} BCE</h6>
            <p class="card-text">${kings[i].Description[0]}</p>
             <a href="" class="explore-btn d-flex justify-content-center align-items-center gap-2">استكشف الملك 
              <i class="fa-solid fa-arrow-left icon"></i>
             </a>
           </div>
         </div>
       </div>
             `
        }else{
            cards+= `
                   <div class="col item">
    <div class="card">
      <img src="${kings[i].image}" class="card-img-top" alt="${kings[i].name}">
      <div class="card-body d-flex flex-column">
        <div class="dtails d-flex justify-content-between align-items-center flex-wrap">
            <span>0${i+1}</span>
            <span>${kings[i].startDate - kings[i].endDate} عام</span>
        </div>
        <h5 class="card-title mb-2">${kings[i].name}</h5>
        <h6 class="card-subtitle mb-3">${kings[i].title}</h6>
        <h6 class="card-history mb-4 ">${kings[i].startDate} – ${kings[i].endDate} BCE</h6>
        <p class="card-text">${kings[i].Overview}</p>
        <span href="" class="note d-flex justify-content-center align-items-center gap-2">
          ⚠️ معلومات تاريخية محدودة 
        </span>
      </div>
    </div>
  </div>
            `
        }
     }

    kings_cards.innerHTML = cards



    

let counter = document.querySelector(".counter");
let items = document.querySelectorAll(".item")


let observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){
     if(entry.isIntersecting){

        startCounter();

        if(entry.target.classList.contains("item")){
            let index = Array.from(items).indexOf(entry.target)
            entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`
        }

      }

    })
    
});

items.forEach(function(item){
    observer.observe(item)
})

observer.observe(counter);



function startCounter(){

    let current = `${Dynasty.startDate - Dynasty.endDate}`;
    let target = `${Dynasty.startDate}`;

    let interval = setInterval(function(){

    let step = (target - current) * 0.05;

    current += step;

    counter.innerHTML = ` ${Math.floor(current)} BCE`;


    if(current >= target - 1){

        counter.innerHTML =  `${Math.floor(target)} BCE`;
        clearInterval(interval);

    }

},10);
}


});