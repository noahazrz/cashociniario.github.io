let myDictionary = {};

// 1. Cargar el JSON con una validación extra
fetch('./dictionary.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON. ¿Estás usando Live Server?");
    }
    return response.json();
  })
  .then(data => {
    myDictionary = data;
    console.log("¡Diccionario cargado!", myDictionary);

fetch('./dictionary.json')
  .then(response => response.json())
  .then(data => {
    myDictionary = data;
    console.log("¡Diccionario cargado!");

    const datalist = document.getElementById('sugerencias');
    const palabras = Object.keys(myDictionary);

    palabras.forEach(palabra => {
      const opcion = document.createElement('option');
      opcion.value = palabra;
      datalist.appendChild(opcion);
    });
  }) // <--- Solo un cierre para el .then
  .catch(err => console.error("Error cargando el JSON:", err)); // Es bueno tener el catch por si acaso

const searchInput = document.getElementById('wordSearch');

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    // .trim() elimina espacios accidentales al principio o final
    const word = searchInput.value.toLowerCase().trim();
    
    // Verificamos si el diccionario aún está vacío
    if (Object.keys(myDictionary).length === 0) {
      alert("El diccionario aún se está cargando, espera un segundo.");
      return;
    }

    if (myDictionary[word]) {
      document.getElementById('display-word').innerText = word.toUpperCase();
      document.getElementById('display-meaning').innerText = myDictionary[word];
    } else {
      document.getElementById('display-word').innerText = "No encachontrado";
      document.getElementById('display-meaning').innerText = "Esa cachlabra no está en el cachociniario";
    }
  }
});
  }
  )