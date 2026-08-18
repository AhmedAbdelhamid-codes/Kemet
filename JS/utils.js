// ids from url
function getUrlId(){
    return new URLSearchParams(location.search)
}

// ============up to top for body=========== //

let btn_up_body = document.getElementById("btn-up_body")

window.addEventListener("scroll",function(){
  
  window.scrollY > 200? btn_up_body.classList.add("show") : btn_up_body.classList.remove("show") 
  
})

btn_up_body.addEventListener("click",function(){
       
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
})


// get file json

function getdata (url){

    return new Promise(function(resolve){

        let x = new XMLHttpRequest()

        x.open("GET", url);

        x.send();

        x.addEventListener("load",function(){
            let data = JSON.parse(x.response)
            resolve(data)
        })

    })
}

// function getdata(url){

//     return new Promise(function(resolve, reject){

//         let x = new XMLHttpRequest();

//         x.open("GET", url);

//         x.send();

//         x.addEventListener("load",function(){

//             console.log(x.status);
//             console.log(x.response);

//             let data = JSON.parse(x.response);
//             resolve(data);

//         });

//     });
// }


document.addEventListener("DOMContentLoaded",function(){

let portfolioBtn = document.getElementById("portfolioBtn");
let dynastiesBtn = document.getElementById("dynastiesBtn");

let portfolioMsg = document.getElementById("portfolioMsg");
let dynastiesMsg = document.getElementById("dynastiesMsg");

let closePortfolioMsg = document.getElementById("closePortfolioMsg");
let closedynastiesMsg = document.getElementById("closedynastiesMsg");


portfolioBtn.addEventListener("click",function(){
 portfolioMsg.classList.add("showMsg")
})

closePortfolioMsg.addEventListener("click",function(){
 portfolioMsg.classList.remove("showMsg")
})

dynastiesBtn.addEventListener("click",function(){
 dynastiesMsg.classList.add("showMsg")
})

closedynastiesMsg.addEventListener("click",function(){
 dynastiesMsg.classList.remove("showMsg")
})
})

