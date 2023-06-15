const tf = require('@tensorflow/tfjs');

let modelo = null;

export const cargarModelo = async () => {
  if (!modelo) {
  
    console.log("Cargando modelo...");
    modelo = await tf.loadLayersModel("model1.json");
    console.log("Modelo cargado");
  }
  return modelo;
};