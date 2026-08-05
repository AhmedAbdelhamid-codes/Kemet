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
    getdata("./DATA/Dynasties.json")
])
.then(function ([erasData, DynastiesData]){

    let params = getUrlId();

    console.log(params)

    let dynastyId = params.get("dynasty-id")

    let Dynasty = DynastiesData.find(function(Dynasty){
       return Dynasty.id == dynastyId
   })

    let era = erasData.find(function(era){
        return era.id == Dynasty.eraId
    })
   
    console.log(Dynasty)

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
    
let counter = document.querySelector(".counter");

let observer = new IntersectionObserver(function(entries){

    if(entries[0].isIntersecting){

        startCounter();

    }

});

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