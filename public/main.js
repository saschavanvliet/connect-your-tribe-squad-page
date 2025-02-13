document.addEventListener('click', function(event) {
    const hartje = document.createElement('div');
    hartje.classList.add('hartje');
    hartje.innerHTML = '❤️';
  
    hartje.style.left = `${event.clientX}px`;
    hartje.style.top = `${event.clientY}px`;
  
    document.body.appendChild(hartje);
  
    setTimeout(() => {
      hartje.remove();
    }, 1000);
  });