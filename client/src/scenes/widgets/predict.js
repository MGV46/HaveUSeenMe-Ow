import { cargarModelo } from './model';
const tf = require('@tensorflow/tfjs');

let modelo = null;
  
(async () => {
  try {
    console.log("Cargando modelo...");
   
    modelo = await tf.loadLayersModel("model.json");
    console.log("Modelo cargado");
  } catch (error) {
    console.log("Cargando modelo...");
    
    modelo = await cargarModelo();
     console.log("Modelo cargado");
  }
})();


  export function predecir(file) {
    console.log(file);
    const image = new Image(); // Using optional size for image
    image.src =`${file}`;
   //image.src = './preuba2.jpg';
    image.width="400px";
   image.height="400px";
console.log(image);
      if (modelo != null) {
        let otrocanvas = prepararImagen(image);
        let band=false;
        //Hacer la predicciÃ³n
        
        var ctx2 = otrocanvas.getContext("2d");
        var imgData = ctx2.getImageData(0,0, 100, 100);

        var arr = [];
        var arr100 = [];

        for (var p=0; p < imgData.data.length; p+= 4) {
          var rojo = imgData.data[p] / 255;
          var verde = imgData.data[p+1] / 255;
          var azul = imgData.data[p+2] / 255;

          var gris = (rojo+verde+azul)/3;

          arr100.push([gris]);
          if (arr100.length == 100) {
            arr.push(arr100);
            arr100 = [];
          }
        }

        arr = [arr];

        var tensor = tf.tensor4d(arr);
        var resultado = modelo.predict(tensor).dataSync();

        var respuesta;
        console.log(resultado[0]);
        let res=resultado[0];
        if (res <= .15 || res > .85) {
          respuesta = "Animal";
          band=true
        } else {
          respuesta = "NO";
          band=false
        }

        return band;

      }

     
    }


    function prepararImagen(imagen) {
      console.log(imagen)
      // Create a new canvas with the normalized image
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(imagen, 0, 0, 100, 100);
      console.log(canvas)
      return canvas;
    }