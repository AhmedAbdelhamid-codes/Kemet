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

getdata("./DATA/kings.json")
.then(function(kingsaData){

    let kings_cards = document.getElementById("cards")

     let cards = ""
     for(let i = 0; i < kingsaData.length; i++){
        
        if(kingsaData[i].featured) {
             cards+= `
              <div class="col item">
                <div class="card">
                <img src="${kingsaData[i].image}" class="card-img-top" alt="${kingsaData[i].name}">
                <div class="card-body d-flex flex-column">
               <div class="dtails d-flex justify-content-between align-items-center flex-wrap">
                 <span>${i + 1}</span>
                 <span>${kingsaData[i].startDate - kingsaData[i].endDate} عام</span>
              </div>
              <h5 class="card-title mb-2 d-flex justify-content-start align-items-center gap-1">${kingsaData[i].name} 
                <i class="fa-solid fa-star star"></i>
              </h5>
            <h6 class="card-subtitle mb-3 ">${kingsaData[i].title}</h6>
            <h6 class="card-history mb-4 ">${kingsaData[i].startDate} – ${kingsaData[i].endDate} BCE</h6>
            <p class="card-text">${kingsaData[i].Description[0]}</p>
             <a href="./king.html?king-id=${kingsaData[i].id}" class="explore-btn d-flex justify-content-center align-items-center gap-2">استكشف الملك 
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
      <img src="${kingsaData[i].image}" class="card-img-top" alt="${kingsaData[i].name}">
      <div class="card-body d-flex flex-column">
        <div class="dtails d-flex justify-content-between align-items-center flex-wrap">
            <span>${i+1}</span>
            <span>${kingsaData[i].startDate - kingsaData[i].endDate} عام</span>
        </div>
        <h5 class="card-title mb-2">${kingsaData[i].name}</h5>
        <h6 class="card-subtitle mb-3">${kingsaData[i].title}</h6>
        <h6 class="card-history mb-4 ">${kingsaData[i].startDate} – ${kingsaData[i].endDate} BCE</h6>
        <p class="card-text">${kingsaData[i].Overview}</p>
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


//===========anmation==============//

let items = document.querySelectorAll(".item")


let observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            if (entry.target.classList.contains("item")) {

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

        }

    });

});

items.forEach(function(item) {
    observer.observe(item);
});


})