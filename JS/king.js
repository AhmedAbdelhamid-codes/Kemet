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
    //============hero================//

    

})