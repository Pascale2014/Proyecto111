
  Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

  camera = document.getElementById("camera");

Webcam.attach( '#camera' );

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/v_sl95BzE/model.json',modelLoaded);

  function modelLoaded() {
    console.log('¡Modelo cargado!');
  }
  
  //Crear la función check() para obtener la imágen capturada 
  function check()
  {
    //Guardar en una variable img la imágen capturada. Buscarla en el documento por el id. 
    img= document.getElementById('captured_image');
    //Pasar dentro de la funión classify la imagen que acabamos de guardar, y agregar 
    //la función gotResult para obtener el resultado de la comparación 
    classifier.classify(img, gotResult);
  }

//Crear la función gotResult con el parametro error y results. 
function gotResult(error, results) {
  //Si hay error imprimir en la consola error 
  if (error) {
    console.error(error);
  } // sino  imprimir los resultados 
    else{
    console.log(results);
    //Actualizar el campo que tiene el id con los resultados del objeto y llamar el indice 0 
    document.getElementById("result_object_name").innerHTML = results[0].label;
    //Agregar la función toFixed y obtener solo tres números despúes del decimal. 
    document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
  }
}