function ingreso() {
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    firebase.auth().signInWithEmailAndPassword(email, contrasena)
        .then(function () {
            /*verificar();*/
            alert("Sesión iniciada");
            location.href = "/Administrador/index.html";
        })
        .catch(function (error) {
            alert("Pongase en contacto con un administrador, para realizar su cuenta");
        });
    function observador() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Existe usuario activo")
                //aparece(user);
                var displayName = user.displayName;
                var email = user.email;
                console.log("************");
                console.log(user.emailVerified)
                console.log("************");
                // ...
            } else {
                contenido.innerHTML = `
                    `;
            }
        });
    }
    observador();
}