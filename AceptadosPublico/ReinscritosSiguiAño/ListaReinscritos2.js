console.log("hola");
//Inicializar la base de datos
var config = {
    apiKey: "AIzaSyBZDfZ0luh_1ZV5-wYLTgtIdPsDIckWA50",
    authDomain: "datos-alumnos-8e303.firebaseapp.com",
    databaseURL: "https://datos-alumnos-8e303-default-rtdb.firebaseio.com",
    projectId: "datos-alumnos-8e303",
    storageBucket: "datos-alumnos-8e303.appspot.com",
    messagingSenderId: "114024798394",
    appId: "1:114024798394:web:b46ef9a11da308f45e0a83",
    measurementId: "G-J69HR767JN"

    
};

// Initialize Firebase
firebase.initializeApp(config);

var database = firebase.database();

var referencia = database.ref("reinscripcion");

var reins = {};
var arr = [];
var reinscrito = "";

firebase.database().ref("reinscripcion").once('value').then(function (snapshot) {
    var data = snapshot.val();
    for (var k in data) {
        console.log(data[k].clave);
        

       if(data[k].grado == "2° Grado"){
           if(data[k].estatus == "Aceptado" ){
        reinscrito += ' <tr >';
        reinscrito += ' <td >';
        reinscrito += data[k].nombre + '</td>';

        reinscrito += '<td>';
        reinscrito += data[k].apellido + '</td>';

        reinscrito += '<td>';
        reinscrito += data[k].edad + '</td>';

        reinscrito += '<td>';
        reinscrito += data[k].grado + '</td>';
           }
       }
        
    }
    var table = document.getElementById("tabla").innerHTML = reinscrito;
});