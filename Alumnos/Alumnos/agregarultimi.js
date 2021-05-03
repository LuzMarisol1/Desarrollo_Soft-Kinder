$(document).ready(function () {
    const config = {
        apiKey: "AIzaSyBZDfZ0luh_1ZV5-wYLTgtIdPsDIckWA50",
        authDomain: "datos-alumnos-8e303.firebaseapp.com",
        databaseURL: "https://datos-alumnos-8e303-default-rtdb.firebaseio.com",
        projectId: "datos-alumnos-8e303",
        storageBucket: "datos-alumnos-8e303.appspot.com",
    };
    firebase.initializeApp(config); //inicializamos firebase

    var filaEliminada; //para capturara la fila eliminada
    var filaEditada; //para capturara la fila editada o actualizada

    //creamos constantes para los iconos editar y borrar    
    const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
    const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

    var db = firebase.database();
    var coleccionProductos = db.ref().child("preinscripcion");

    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var table = $('#tablaPreinscripcion').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        pageLength: 5,
        lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        data: dataSet,
        columnDefs: [
            {
                targets: [0],
                visible: false, //ocultamos la columna de ID que es la [0]                        
            },
            {
                targets: -1,
                defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" + iconoBorrar + "</button></div></div>"
            }
        ]

    });

    coleccionProductos.on("child_added", datos => {
        dataSet = [datos.key, datos.child("nombre").val(), datos.child("apellido").val(), datos.child("edad").val(), datos.child("estatus").val()];
        table.rows.add([dataSet]).draw();
    });
    coleccionProductos.on('child_changed', datos => {
        dataSet = [datos.key, datos.child("nombre").val(), datos.child("apellido").val(), datos.child("edad").val(), datos.child("estatus").val()];
        table.row(filaEditada).data(dataSet).draw();
    });
    coleccionProductos.on("child_removed", function () {
        table.row(filaEliminada.parents('tr')).remove().draw();
    });

    $('form').submit(function (e) {
        e.preventDefault();
         /*let clave = $.trim($('#clave').getKey());*/
        let id = $.trim($('#id').val());
        let nombre = $.trim($('#nombre').val());
        let apellido = $.trim($('#apellido').val());
        let edad = $.trim($('#edad').val());
        let estatus = $.trim($('#estatus').val());
        let idFirebase = id;
        var productos = coleccionProductos.push();
        if (idFirebase == '') {
            idFirebase = productos.key;
        };
        //agregamos la extracción de la
        data = { clave: productos.getKey(), nombre: nombre, apellido: apellido, edad: edad, estatus: estatus };
        actualizacionData = {};
        actualizacionData[`/${idFirebase}`] = data;
        coleccionProductos.update(actualizacionData);
        id = '';
        $("form").trigger("reset");
        $('#modal1').modal('hide');
    });

    //Botones
    $('#btnNuevo').click(function () {
        $('#id').val('');
        $('#nombre').val('');
        $('#apellido').val('');
        $('#edad').val('');
        $('#estatus').val('');
        $("form").trigger("reset");
        $('#modalAltaEdicion').modal('show');
    });

    $("#tablaPreinscripcion").on("click", ".btnEditar", function () {
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#tablaPreinscripcion').dataTable().fnGetData($(this).closest('tr'));
        let id = fila[0];
        console.log(id);
        let nombre = $(this).closest('tr').find('td:eq(0)').text();
        let apellido = $(this).closest('tr').find('td:eq(1)').text();
        let edad = parseInt($(this).closest('tr').find('td:eq(2)').text());
        let estatus = ($(this).closest('tr').find('td:eq(3)').text());
        $('#id').val(id);
        $('#nombre').val(nombre);
        $('#apellido').val(apellido);
        $('#edad').val(edad);
        $('#estatus').val(estatus);
        $('#modalAltaEdicion').modal('show');
    });
    //para eliminar
    $("#tablaPreinscripcion").on("click", ".btnBorrar", function () {
        filaEliminada = $(this);
        Swal.fire({
            title: '¿Deseas eliminar la información sleccionada?',
            text: "¡Está operación no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar'
        }).then((result) => {
            if (result.value) {
                let fila = $('#tablaPreinscripcion').dataTable().fnGetData($(this).closest('tr'));
                let id = fila[0];
                db.ref(`preinscripcion/${id}`).remove()
                Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success')
            }
        })
    });

});