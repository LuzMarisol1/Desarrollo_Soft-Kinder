var nombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
var edad = document.getElementById('edad');
var direccion = document.getElementById('direccion');
var telefono = document.getElementById('telefono')
var curp = document.getElementById('curp');
var fecha = document.getElementById('fecha');
var tutor = document.getElementById('tutor');
var enviarData = document.getElementById('btnRegistrar');

var dataBD = firebase.database().ref('preinscripcion').push();
enviarData.addEventListener('click', preinscripcion);

function preinscripcion() {
    var formulario = document.getElementById('formulario');
    console.log(formulario.checkValidity());

    if(formulario.checkValidity() != false){
        dataBD.set({
            clave: dataBD.getKey(),
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value,
            direccion: direccion.value,
            telefono: telefono.value,
            curp: curp.value,
            fecha: fecha.value,
            tutor: tutor.value,
        });
        alert("Registrado correctamente");
        location.href="/education/index.html"
        }else{
        alert("El formulario no esta correctamente llenado");
    }
    
}
