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
    getdata("./DATA/kings.json"),
    getdata("./DATA/Dynasties.json"),
    getdata("./DATA/Eras.json")
])
.then(function([kingsaData, DynastiesData, erasData]){

    let params = getUrlId();

    let kingId = params.get("king-id")
    
   let king = kingsaData.find(function(king){
       return king.id === kingId
   })

   let Dynasty = DynastiesData.find(function(Dynasty){
      return  Dynasty.id === king.dynasty
   })

   let era = erasData.find(function(era){
        return era.id === Dynasty.eraId
    })

   console.log(king)
   console.log(Dynasty)
   console.log(era)

    //===========heder===========//

    document.getElementById("eraLink").innerHTML= `
     <a href="./Dynasties.html?era-id=${era.id}" title="${era.name}" class="era-link link-underline link-underline-opacity-0">${era.name}</a>
    `
    document.getElementById("dynastyLink").innerHTML =`
     <a href="./Dynasty.html?dynasty-id=${Dynasty.id}" title="${Dynasty.name}" class="dynasty-link link-underline link-underline-opacity-0">${Dynasty.name}</a>
    `
    document.getElementById("kingLing").innerHTML =`
     <a href="./king.html?king-id=${king.id}" title="${king.name}" class="king-link active-page link-underline link-underline-opacity-0">${king.name}</a>
    `

    document.getElementById("title").innerHTML = `
      الملك ${king.name} | KEMET
    `
    //============hero================//

    document.getElementById("horo-row").innerHTML=`
        <div class="col-lg-4 col-12">
          <div class="imge z-2 d-flex pt-5">
            <img class="w-100 h-100" src="${king.image}"  alt="${king.name}">
           </div>
        </div>
       <div class="col-lg-6 col-12">
        <div class="detailsKing">
          <span class="dynastyName position-relative d-inline-block ps-5">
             ${Dynasty.name}
          </span>
          <h1 class="kingName mb-3">
             ${king.name}
          </h1>
          <h2 class="kingCoronationName mb-4">
                ${king.CoronationAR}  |  ${king.CoronationEN}
          </h2>
          <p class="overview position-relative ps-3">
              ${king.Overview}
          </p>
          <ul class="d-flex justify-content-start align-items-center gap-3 flex-wrap list-unstyled">
            <li class="date">
              فترة الحكم <span class="bold">${king.startDate} – ${king.endDate} ق.م </span>
            </li>
            <li class="years">
              مدة الحكم <span class="bold">${king.startDate - king.endDate} عامًا</span>
            </li>
            <li class="BurialSite">
               مكان الدفن <span class="bold">${king.BurialSite}</span>
            </li>
            <li>
               <a href="./Dynasty.html?dynasty-id=${Dynasty.id}" class="dynastyLink link-underline link-underline-opacity-0 explore-btn justify-content-center d-flex gap-1 align-items-center "> ${Dynasty.name} 
                <i class="fa-solid fa-arrow-right-from-bracket icon"></i>
               </a>
            </li>
          </ul>
        </div>
      </div>
    `
    
     //============ description King sec ================//

     document.getElementById("descriptionInner").innerHTML= `
            <h3 class="mb-4">${king.Description[0]}</h3>
            <h3 class="mb-4">${king.Description[1]}</h3>
            <h3 class="mb-4">${king.Description[2]}</h3>
     `

      //============ achievement King sec ================//

      let cards = document.getElementById("achievementsCards")
      let cartona = "";

      for(let i = 0; i < king.Achievements.length; i++){
         cartona +=`
       <div class="col anmationAchievement">
         <div class="card">
             <h3 class="achievementTitle mb-3">${king.Achievements[i].title}</h3>
             <p class="achievementDescription">${king.Achievements[i].description}</p>
         </div>
       </div>
      `
      }

    cards.innerHTML = cartona;

//========btns sec for king page==========//

let indexOfCrruntKing = kingsaData.indexOf(king);

let nextKingIndex = indexOfCrruntKing + 1;
let previousKingIndex = indexOfCrruntKing - 1;

let NextKing = kingsaData[nextKingIndex];
let PreviousKing = kingsaData[previousKingIndex];


let next_btn = document.getElementById("next-btn");
let toDynasty_btn = document.getElementById("toDynasty-btn");
let pre_btn = document.getElementById("pre-btn");

while (true) {
    if (NextKing) {

        if (NextKing.featured) {

            next_btn.innerHTML = `
                <span class="arrow">
                    <i class="fa-solid fa-circle-right"></i>
                </span>
                <div class="name">
                    <span class="d-inline-block mb-2">الملك التالي</span>
                    <h2 class="mb-2">${NextKing.name}</h2>
                    <p class="m-0">الملك ${NextKing.CoronationAR}</p>
                </div>
            `;

            break;

        } else {

            nextKingIndex++;
            NextKing = kingsaData[nextKingIndex];

        }

    } else {

        next_btn.disabled = true;
        next_btn.innerHTML = `
                <span class="arrow">
                    <i class="fa-solid fa-hourglass"></i>
                </span>
                <div class="name">
                    <span class="d-inline-block mb-2">لا يوجد ملك تالي</span>
                    <h2 class="mb-2">هذا اخر ملك مضافة حتي الان</h2>
                    <p class="m-0">تابعوا KEMET لكل جديد</p>
                </div>
            `;
        break;

    }
}

while (true) {
    if (PreviousKing) {

        if (PreviousKing.featured) {

            pre_btn.innerHTML = `
                <div class="name">
                    <span class="d-inline-block mb-2">الملك السابق</span>
                    <h2 class="mb-2">${PreviousKing.name}</h2>
                    <p class="m-0">الملك ${PreviousKing.CoronationAR}</p>
                </div>
                 <span class="arrow">
                    <i class="fa-solid fa-circle-left"></i>
                </span>
            `;

            break;

        } else {

            previousKingIndex--;
            PreviousKing = kingsaData[previousKingIndex];

        }

    } else {

        pre_btn.disabled = true;
         pre_btn.innerHTML = `
                <div class="name">
                    <span class="d-inline-block mb-2">لا نعرف هل يوجد ملك قبل هذا ام لا</span>
                    <h2 class="mb-2">هذا اول ملك تم التعرف عليه الي الان</h2>
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

 location.href = `./king.html?king-id=${NextKing.id}`;

})

toDynasty_btn.addEventListener("click",function(){

 location.href = `./Dynasty.html?dynasty-id=${Dynasty.id}`;

})

pre_btn.addEventListener("click",function(){

 location.href = `./king.html?king-id=${PreviousKing.id}`;

})


//==============anmation================//

let anmationDescriptions = document.querySelectorAll(".anmationDescription");
let anmationAchievements = document.querySelectorAll(".anmationAchievement");


let observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){
     if(entry.isIntersecting){

        if(entry.target.classList.contains("anmationDescription")){
            let index = Array.from(anmationDescriptions).indexOf(entry.target)
            entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`
        }
        
        if(entry.target.classList.contains("anmationAchievement")){
            let index = Array.from(anmationAchievements).indexOf(entry.target)
            entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`
        }

      }

    })
    
});

anmationDescriptions.forEach(function(anmationDescription){
    observer.observe(anmationDescription)
})

anmationAchievements.forEach(function(anmationAchievement){
  observer.observe(anmationAchievement)
})


})