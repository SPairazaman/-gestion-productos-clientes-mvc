$(document).ready(function () {

    ListClientes();

    $('#createClienteButton').click(function () {
        //Si quiero mostrar sin usar la vista parcial
        $('#createClienteModal').modal('show');
    });

    $('#btnBuscar').click(function () {
        ListClientes();
    });

    $('#saveClienteButton').click(function () {
        Grabar();
    });


    $("#tablaClientes").on("click", ".eliminar-btn", function () {
        var id = $(this).data("id");

        Swal.fire({
            title: "Desea eliminar este registro?",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                Eliminar(id);
                Swal.fire("Registro eliminado", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Cancelado", "", "info");
            }
        });
    });

    function ListClientes() {

        var filtro = $('#txtfiltro').val();
        $.ajax({
            type: "GET",
            url: "/Clientes/Get?filtro=" + filtro,
            success: function (result) {

                console.log(result);
                if (result.success) {

                    $("#tablaClientes").empty();
                    $.each(result.clientes, function (index, cliente) {

                        $("#tablaClientes").append(`
                                             <tr id="cliente-${cliente.clienteID}">
                                                    <td>${cliente.clienteID}</td>
                                                    <td>${cliente.nombre}</td>
                                                    <td>${cliente.correo}</td>
                                                    <td>${cliente.telefono}</td>
                                                  <td><button class="eliminar-btn btn btn-primary" data-id="${cliente.clienteID}">Eliminar</button></td>
                                             </tr>
                             `);
                    });
                } else
                {
                        Swal.fire({
                        title: "Mensaje",
                        text: result.message,
                        icon: result.icon
                        });
                    }


            },
            error: function () {
                alert('Hubo un error al listar los Clientes.');
            }
        });

    }


    function Grabar() {

        $.ajax({
            type: "POST",
            url: "/Clientes/Create",
            data: {
                Nombre: $("#txtNombre").val(),
                Correo: $("#txtCorreo").val(),
                Telefono: $("#txtTelefono").val()
            },
            success: function (response) {
                Swal.fire({
                title: "Mensaje",
                text: response.message,
                icon: response.icon
                });
                $('#createClienteModal').modal('hide');
                ListClientes();

            },
            error: function () {
                alert('Hubo un error al enviar los datos.');
            }
        });
     }


        function Eliminar(clienteId) {

            $.ajax({
                url: "/Clientes/Delete",
                type: "POST",
                data: { id: clienteId },
                success: function (response) {
                    if (response.success) {
                        $("#cliente-" + clienteId).remove(); // Eliminar fila de la tabla
                    }

                    Swal.fire({
                        title: "Mensaje",
                        text: result.message,
                        icon: result.icon
                    });

                },
                error: function (xhr, status, error) {
                    alert("Ocurrió un error al eliminar el cliente.");
                    console.error(xhr.responseText);
                }
            });
        }



});