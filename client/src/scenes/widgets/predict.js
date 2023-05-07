const tf = require('@tensorflow/tfjs');

var modelo = null;

  (async() => {
    console.log("Cargando modelo...");
    modelo = await tf.loadLayersModel("model.json");
     console.log("Modelo cargado");
   })();

  export function predecir(file) {
    
      if (modelo != null) {
        let otrocanvas = prepararImagen(file);
        let band=false;
        //Hacer la predicciÃ³n
        console.log(otrocanvas);
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
        if (resultado <= .15 || respuesta > .85) {
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
      console.log(imagen);
    const image = new Image(); // Using optional size for image

image.src = `${imagen.name}`;

image.id="img";
var canvas = document.getElementById("img");
console.log(image);
console.log(canvas);
    //var canvas = document.getElementById("img");
      // Create a new canvas with the normalized image
      let canvas1 = document.createElement('canvas');
      let ctx = canvas1.getContext('2d');
      canvas1.width = 100;
      canvas1.height = 100;
      ctx.drawImage(image, 0, 0, 100, 100);

      return canvas1;
    }