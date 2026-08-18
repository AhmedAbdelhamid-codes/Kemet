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

    let highPriests = kingsaData.filter(function(king){
        return Dynasty.highPriests.includes(king.id)
    })

    console.log(Dynasty)
    console.log(kings)
    console.log(highPriests)

    //===========heder===========//

    document.getElementById("eraLink").innerHTML= `
     <a href="./Dynasties.html?era-id=${era.id}" title="${era.name}" class="era-link link-underline link-underline-opacity-0">${era.name}</a>
    `
    document.getElementById("dynastyLink").innerHTML =`
     <a href="./Dynasty.js?dynasty-id=${Dynasty.id}" title="${Dynasty.name}" class="dynasty-link active-page link-underline link-underline-opacity-0">${Dynasty.name}</a>
    `
   
    document.getElementById("title").innerHTML =`
      ${Dynasty.name} | KEMET
    `

    //=============hero=============//
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
            <p class="paragraph">${Dynasty.startDate}</p>
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
    
    let kings_header = document.getElementById("header").innerHTML = `
       <h2 class="title item d-flex justify-content-start align-items-center gap-2">
       <i class="fa-solid fa-crown crown"></i>
       ملوك هذه الاسرة
       </h2>
       <h3 class="sub-title item">
        ${kings.length}  فرعوناً على امتداد نحو ${Dynasty.startDate - Dynasty.endDate}~ من السنين
       </h3>
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
             <a href="./king.html?king-id=${kings[i].id}" class="explore-btn d-flex justify-content-center align-items-center gap-2">استكشف الملك 
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
  
    // =============================//
    
    let highPriests_container = document.getElementById("highPriests-container");
    let HP_cards = "";


    if(Dynasty.highPriests.length > 0){
     document.getElementById("highPriests").classList.add("py-5")
     document.getElementById("kings-sec").classList.add("show")

     highPriests_container.innerHTML = `
       <div class="highPriests-header HP mt-4 mb-5 d-flex justify-content-between align-items-center gap-2 flex-md-nowrap flex-wrap" id="header">
          <div class="dtails">
            <h2 class="title">حكام الجنوب الحقيقيون</h2>
            <p class="description">في ظل ضعف رمسيس الحادي عشر ومن جاء بعده من فراعنة تانيس، أمسك هؤلاء الكهنة بزمام السلطة في مصر العليا — يجمعون بين العباءة الدينية وسلطة الدولة في شخص واحد. مرّر الماوس على الاسم لتظهر تفاصيل كل كاهن.</p>
           </div>
          <div class="note">
            <h2 class="title-note mb-2">ملاحظة تاريخية</h2>
           <p class="description-note">لم يكن لقب "كاهن أعظم لآمون" مجرد رتبة دينية في هذه الحقبة — كان يعني السيطرة التامة على الاقتصاد والجيش وإدارة مصر العليا كلها.</p>
          </div>
        </div>

        <div id="highPriests-cards" class="highPriests-cards row row-cols-lg-6 row-cols-md-4 row-cols-sm-2 row-cols-2 g-4">
        
        </div>
     `

     let highPriests_cards = document.getElementById("highPriests-cards")
     
     for (let i = 0; i < highPriests.length; i++) {
         HP_cards+= `
         <div class="col HP position-relative">
            <div class="card-name">
               <div class="title d-flex justify-content-center align-items-center gap-2">
                <span class="number-Of_King">0${i + 1}</span>
                <span class="king-Name">${highPriests[i].name}</span>
               </div>
            </div>
            <div class="card-hov position-absolute flex-column gap-2">
             <div class="dtails d-flex justify-content-between align-items-center">
                <span class="number">0${i + 1}</span>
                <div class="dtails-of_king">
                    <span class="date mb-2">${highPriests[i].startDate} – ${highPriests[i].endDate} BCE</span>
                    <h2 class="king-name mb-3">${highPriests[i].name}</h2>
                    <h3 class="tittle mb-2">الكاهن الاعظم لامون</h3>
                </div>
             </div>
             <div class="achev">
                <h2 class="achev-tittle">الانجازات الابرز</h2>
                <p class="achev-description m-0">${highPriests[i].highlight}</p>
             </div>
             <p class="description">${highPriests[i].description}</p>
            </div>
       </div>
      `
            
     } 
      highPriests_cards.innerHTML = HP_cards
    }


//========btns sec for Dynasty page==========//


let indexOfCrruntDynasty = DynastiesData.indexOf(Dynasty)
let PreviousDynasty = DynastiesData[indexOfCrruntDynasty - 1];
let NextDynasty = DynastiesData[indexOfCrruntDynasty + 1];


let next_btn = document.getElementById("next-btn");
let toEra_btn = document.getElementById("toEra-btn");
let pre_btn = document.getElementById("pre-btn");

while (true) {
    if (NextDynasty) {

        if (NextDynasty.hasPage) {

            next_btn.innerHTML = `
                <span class="arrow">
                    <i class="fa-solid fa-circle-right"></i>
                </span>
                <div class="name">
                    <span class="d-inline-block mb-2">الاسرة التالية</span>
                    <h2 class="mb-2">${NextDynasty.name}</h2>
                    <p class="m-0">الاسرة ${NextDynasty.number}</p>
                </div>
            `;

            break;

        } else {

            indexOfCrruntDynasty++;
            NextDynasty = DynastiesData[indexOfCrruntDynasty + 1];

        }

    } else {

        next_btn.disabled = true;
        next_btn.innerHTML = `
                <span class="arrow">
                    <i class="fa-solid fa-hourglass"></i>
                </span>
                <div class="name">
                    <span class="d-inline-block mb-2">لا توجد اسرة التالية</span>
                    <h2 class="mb-2">هذه اخر اسرة مضافة حتي الان</h2>
                    <p class="m-0">تابعوا KEMET لكل جديد</p>
                </div>
            `;
        break;

    }
}

while (true) {
    if (PreviousDynasty) {

        if (PreviousDynasty.hasPage) {

            pre_btn.innerHTML = `
                <div class="name">
                    <span class="d-inline-block mb-2">الاسرة السابقة</span>
                    <h2 class="mb-2">${PreviousDynasty.name}</h2>
                    <p class="m-0">الاسرة ${PreviousDynasty.number}</p>
                </div>
                 <span class="arrow">
                    <i class="fa-solid fa-circle-left"></i>
                </span>
            `;

            break;

        } else {

            indexOfCrruntDynasty--;
            PreviousDynasty = DynastiesData[indexOfCrruntDynasty - 1];

        }

    } else {

        pre_btn.disabled = true;
         pre_btn.innerHTML = `
                <div class="name">
                    <span class="d-inline-block mb-2">لا توجد اسرة قبل هذه</span>
                    <h2 class="mb-2">هذه اول اسرة في التاريخ</h2>
                    <p class="m-0">تابعوا KEMET لكل جديد</p>
                </div>
                <span class="arrow">
                    <i class="fa-solid fa-hourglass"></i>
                </span>
            `;
        break;

    }
}


next_btn.addEventListener("click",function(){

 location.href = `./Dynasty.html?dynasty-id=${NextDynasty.id}`;

})

toEra_btn.addEventListener("click",function(){

 location.href = `./Dynasties.html?era-id=${era.id}`;

})

pre_btn.addEventListener("click",function(){

 location.href = `./Dynasty.html?dynasty-id=${PreviousDynasty.id}`;

})

//===========anmation==============//

let items = document.querySelectorAll(".item")
let HPs = document.querySelectorAll(".HP")

let observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){
     if(entry.isIntersecting){

        if(entry.target.classList.contains("item")){
                
             let index = Array.from(items).indexOf(entry.target);
                let columns;
                if (window.innerWidth >= 992) {
                    columns = 4;
                } else if (window.innerWidth >= 768) {
                    columns = 3;
                } else if (window.innerWidth >= 576) {
                    columns = 2;
                } else {
                    columns = 1;
                }
                let indexInRow = index % columns;
                entry.target.style.animation =
                `fadeUp 0.5s ${indexInRow * 0.05}s ease both`;
        }
        
        if(entry.target.classList.contains("HP")){
            let index = Array.from(HPs).indexOf(entry.target)
            entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`
        }

      }

    })
    
});

items.forEach(function(item){
    observer.observe(item)
})

HPs.forEach(function(HP){
  observer.observe(HP)
})


// function startCounter(){

//     let current = `${Dynasty.startDate - Dynasty.endDate}`;
//     let target = `${Dynasty.startDate}`;

//     let interval = setInterval(function(){

//     let step = (target - current) * 0.05;

//     current += step;

//     counter.innerHTML = ` ${Math.floor(current)} BCE`;


//     if(current >= target - 1){

//         counter.innerHTML =  `${Math.floor(target)} BCE`;
//         clearInterval(interval);

//     }

// },10);
// }


});