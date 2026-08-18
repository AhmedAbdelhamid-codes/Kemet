document.addEventListener('DOMContentLoaded', function(){
  
    let observer = new IntersectionObserver(function(entries) {
    
        entries.forEach(function(entry) {
     
            if (entry.isIntersecting) {
      
                entry.target.classList.add('show');
       
                observer.unobserve(entry.target);
      
            }
    
        });
  
    },{ threshold: 0.12 });
  
    document.querySelectorAll('.reveal').forEach(function(element, index){
  
        element.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
   
          observer.observe(element);
  
        });
});


