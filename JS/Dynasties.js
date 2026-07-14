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


getdata("./DATA/Eras.json")
.then(function(data){
    console.log(data)
    let eraId = getUrlId();
    let era = data.find(function(item){
      return item.id == eraId;
     });
     console.log(era)

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
        <span class="mb-1 show">السياق التاريخي</span>
        <h2 class="tittle mb-3 show">${era.name}</h2>
        <p class="paragraph show"> قرون صنعت فيها مصر الحضارة الأبدية.</p>
        <span class="decorative-line show">—— 𓆸 𓇳 𓆸 ——</span>
        `
  
    row.innerHTML=`
      <div class="col-6">
            <div class="imge show p-3 rounded-5 position-relative" style="width: 500px; height: 300px;">
                <img src="${era.imageDescription}" class="w-100 h-100 rounded-4" alt="">
            </div>
            </div>
            <div class="col-6">
                <div class="description-content">
                    <div class="sec position-relative mb-5 show">
                        <h3 class="description-tittle">${era.fullDescription[0].title}</h3>
                        <p class="description-paragraph">${era.fullDescription[0].text}</p>
                    </div>
                    <div class="sec position-relative mb-5 show">
                        <h3 class="description-tittle">${era.fullDescription[1].title}</h3>
                        <p class="description-paragraph">${era.fullDescription[1].text}</p>
                    </div>
                    <div class="sec position-relative mb-5 show">
                        <h3 class="description-tittle">${era.fullDescription[2].title}</h3>
                        <p class="description-paragraph">${era.fullDescription[2].text}</p>
                    </div>
                    <div class="show">
                        <h3 class="description-tittle">${era.fullDescription[3].title}</h3>
                        <p class="description-paragraph">${era.fullDescription[3].text}</p>
                    </div>
                </div>
            </div>
    `
  
    let descriptions = document.querySelectorAll(".show")
  
    
    let observer = new IntersectionObserver(function(entries){

         entries.forEach(function(entry){
            if(entry.isIntersecting){
                
                let index = Array.from(descriptions).indexOf(entry.target)
                entry.target.style.animation = `fadeUp 0.5s ${(index + 1) * 0.1}s ease both`
            }
         })
    });


    descriptions.forEach(function(description){
        observer.observe(description)
    })

    

})

