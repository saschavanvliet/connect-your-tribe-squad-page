document.addEventListener('DOMContentLoaded', function () { 
    const svgElement = document.querySelector('.notfixed');

    window.addEventListener('scroll', function () {
        // Als het scrollen naar beneden is gegaan, verwijder dan de 'notfixed' klasse en voeg 'fixed' toe
        if (window.scrollY > 0) {
            svgElement.classList.remove('notfixed');
            svgElement.classList.add('visible');
        } else {
            // Als er niet is gescrold (terug naar boven), voeg dan 'notfixed' toe en verwijder 'fixed'
            svgElement.classList.remove('visible');
            svgElement.classList.add('notfixed');
        }
    });
});

  //Menu komt tevoorschijn!
    let dropdownButton = document.getElementById('dropdownButton')
    dropdownButton.addEventListener('click', menu)
    function menu() {
      dropdownMenu.classList.toggle('active');
    };
    function myFunction() {
      var element = document.getElementById("myDIV");
      element.classList.toggle("mystyle");
   }
  
    
