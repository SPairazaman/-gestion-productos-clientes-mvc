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

    function ListClientes() {

        var filtro = $('#txtfiltro').val();
        $.ajax({
            type: "GET",
            url: "/Clientes/Get?filtro=" + filtro,
            success: function (result) {

                console.log(result);
                if (result.success) {
                    var tableBody = $('table tbody');
                    tableBody.empty(); // Vaciar la tabla

                    $.each(result.clientes, function (index, cliente) {
                        var newRow = `
                                            <tr>
                                                    <td>${cliente.clienteID}</td>
                                                    <td>${cliente.nombre}</td>
                                                    <td>${cliente.correo}</td>
                                                    <td>${cliente.telefono}</td>
                                            </tr>`;
                        tableBody.append(newRow);
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

});