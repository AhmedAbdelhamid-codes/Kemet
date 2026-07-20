// ids from url
function getUrlId(){

    const params = new URLSearchParams(location.search);

    return params.get("id");

}

// ============up to top for body=========== //

let btn_up_body = document.getElementById("btn-up_body")

window.addEventListener("scroll",function(){
  
  window.scrollY > 200 && window.scrollY < 3500? btn_up_body.classList.add("show") : btn_up_body.classList.remove("show") 
  
})

if(btn_up_body){
btn_up_body.addEventListener("click",function(){
       
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
})
}

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
