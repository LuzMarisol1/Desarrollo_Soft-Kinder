window.onload = inicializar;

var nombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
var edad = document.getElementById('edad');
var direccion = document.getElementById('direccion');
var boleta = document.getElementById('boleta');
var grado = document.getElementById('grado');
var enviarData = document.getElementById('btnRegistrar');


var dataBD = firebase.database().ref('reinscripcion').push();
enviarData.addEventListener('click', reinscripcion);

var storageRef;

function reinscripcion() {
    if (nombre.value != "" && apellido.value != "" && edad.value != "" && direccion.value != "" && boleta.value != "") {
        dataBD.set({
            clave: dataBD.getKey(),
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value,
            direccion: direccion.value,
            grado: grado.value,
            boleta: boleta.files[0].name,
        })
        alert("Registrado correctamente");
        location.href="/education/index.html";
    } else {
        alert("Error: Algunos campos se encuentran vacios");
    }
}

function inicializar() {
    boleta = document.getElementById("boleta");
    storageRef = firebase.storage().ref();
    boleta.addEventListener("change", subirImagenFirebase, false);
}

function subirImagenFirebase() {
    var imagenASubir = boleta.files[0];

    var uploadTaks = storageRef.child('Boletas/' + imagenASubir.name).put(imagenASubir);
}
console.log("cargado correctamente");


function setClave(clave) {
    console.log(clave);
    document.getElementById("clave").value;
}
