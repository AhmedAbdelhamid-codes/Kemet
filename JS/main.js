
(function egyptSymbols(){
    let svg = document.getElementById("egypt-bg");
    let W = window.innerWidth;
    let H = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    let symbols = ["☥","𓅓","𓂀","𓆣","𓇼"];
    let animations = ["dw-up" ,"up-dw"];

    let html = "";

    for(let i = 0; i < 20; i++){

        let x = Math.random() * W;
        let y = Math.random() * H;
        let size = Math.random() * 5 + 10;
        let symbol = symbols[Math.floor(Math.random()*symbols.length)];
        let animation = animations[Math.floor(Math.random() * animations.length)]

        html += `
        <text x="${x}" y="${y}" font-size="${size}" fill="#C9A84C" opacity="0.3" style="animation: ${animation}  6s ease infinite;">${symbol}</text>
         `;
    }

    svg.innerHTML = html;

})();

// ============================================//

document.addEventListener('DOMContentLoaded', () => {
  initKemetStats();
});

async function initKemetStats() {
  const statsSection = document.getElementById('kemet-stats');
  if (!statsSection) return;

  await populateStatsData();

  setupStatsObserver(statsSection);
}

async function populateStatsData() {
  try {
    
    let kingsData = await getdata("./DATA/kings.json");
    let erasData = await getdata("./DATA/Eras.json");
    let dynastiesData = await getdata("./DATA/Dynasties.json");

    setTarget('stat-eras', erasData.length);
    setTarget('stat-dynasties', dynastiesData.length);
    setTarget('stat-kings', kingsData.length);
    setTarget('stat-date', 5000);

  } catch (error) {
    console.error('Kemet Stats: حدث خطأ أثناء جلب البيانات', error);
  }
}

function setTarget(elementId, count) {

  let el = document.getElementById(elementId);

  if (el) {
    el.setAttribute('data-target', count);
  }
}

function setupStatsObserver(targetSection) {
  let hasAnimated = false;

  let observer = new IntersectionObserver(function(entries, obs){

    entries.forEach(entry => {

      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        

        let statNumbers = targetSection.querySelectorAll('.kemet-number');
        
        statNumbers.forEach(function(numElement){
            animateCounter(numElement, 2000)

        }); 

        obs.unobserve(entry.target);
      }
    });

  },{
    threshold: 0.25
  });

  observer.observe(targetSection);
}

function animateCounter(element, duration = 2000) {

  let target = parseInt(element.getAttribute('data-target'), 10) || 0;
  let startTime = performance.now();

  function update(currentTime) {

    let elapsed = currentTime - startTime;
    let progress = Math.min(elapsed / duration, 1);

    let easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    let currentValue = Math.floor(easeProgress * target);

    element.textContent = currentValue 

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target
    }
  }

  requestAnimationFrame(update);
}

// ============================================//

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

let antiquitiesBtn = document.getElementById("antiquitiesBtn");

let antiquitiesMsg = document.getElementById("antiquitiesMsg");

let closeAntiquitiesMsg = document.getElementById("closeAntiquitiesMsg");

antiquitiesBtn.addEventListener("click",function(){
 antiquitiesMsg.classList.add("showMsg")
})

closeAntiquitiesMsg.addEventListener("click",function(){
 antiquitiesMsg.classList.remove("showMsg")
})



