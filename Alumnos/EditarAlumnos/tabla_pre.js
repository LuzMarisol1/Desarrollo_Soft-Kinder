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

var referencia = database.ref("preinscripcion");

var pre = {};
var arr = [];
var preinscrito = "";

firebase.database().ref("preinscripcion").once('value').then(function (snapshot) {
    var data = snapshot.val();
    for (var k in data) {
        console.log(data[k].clave);
        preinscrito += ' <tr >';

        preinscrito += ' <td >';
        preinscrito += data[k].clave + '</td>';

        
        preinscrito += ' <td >';
        preinscrito += data[k].nombre + '</td>';

        preinscrito += '<td>';
        preinscrito += data[k].apellido + '</td>';

        preinscrito += '<td>';
        preinscrito += data[k].edad + '</td>';

        preinscrito += '<td> ';
        preinscrito += data[k].direccion + '</td>';

        preinscrito += ' <td >';
        preinscrito += data[k].telefono + '</td>';

        preinscrito += ' <td >';
        preinscrito += data[k].curp+ '</td>';

        preinscrito += ' <td >';
        preinscrito += data[k].fecha + '</td>';

        preinscrito += ' <td >';
        preinscrito += data[k].tutor + '</td>';

    }
    var table = document.getElementById("tabla").innerHTML = preinscrito;
});