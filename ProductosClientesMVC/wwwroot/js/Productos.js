
$(document).ready(function () {

    ListProductos();

    $('#createProductoButton').click(function () {
        $('#createProductoModal').modal('show');
    });

    $('#btnBuscar').click(function () {
        ListProductos();
    });

    $('#saveProductoButton').click(function () {
        console.log("validando...");
        $('#createProductoForm').validate({
            rules: {
                txtNombre: {
                    required: true,
                    minlength: 3
                },
                txtPrecio: {
                    required: true,
                    number: true,
                    min: 0.01
                },
                txtStock: {
                    required: true,
                    number: true,
                    min: 1
                },
            },
            messages: {
                txtNombre: {
                    required: "Por favor, ingrese nombre",
                    minlength: "El nombre debe tener al menos 3 caracteres."
                },
                txtPrecio: {
                    required: "Por favor, ingrese precio.",
                    number: "Ingrese un valor numérico",
                    min: "El precio debe ser mayor que 0"
                 },
                txtStock: {
                    required: "Por favor, ingrese stock.",
                    number: "Ingrese un valor numérico",
                    min: "El stock debe ser mayor que 0"
                }

            }
         }); 

        var form = $("#createProductoForm");
        form.validate();
        if (form.valid()) {
            Grabar();
        }

     });

         $("#tablaProductos").on("click", ".eliminar-btn", function () {
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

         function ListProductos(){

              var filtro=$('#txtfiltro').val();
             $.ajax({
                 type: "GET",
                 url: "/Productos/Get?filtro="+filtro,
                 success: function (result) {

                     console.log(JSON.stringify(result));

                     if(result.success){

                        $("#tablaProductos").empty();
                        $.each(result.productos, function (index, producto) {

                            $("#tablaProductos").append(`
                                             <tr id="producto-${producto.productoID}">
                                                     <td>${producto.productoID}</td>
                                                     <td>${producto.nombre}</td>
                                                     <td>S/.${producto.precio.toFixed(2)}</td>
                                                     <td>${producto.stock}</td>
                                                     <td><button class="eliminar-btn btn btn-primary" data-id="${producto.productoID}">Eliminar</button></td>
                                             </tr>
                             `);

                          });
                     }else{
                         Swal.fire({
                         title: "Mensaje",
                         text: result.message,
                         icon: result.icon
                         });
                     }
                 },
                 error: function (error) {
                     console.log(error);
                 }
             });

         }


         function Grabar(){

              $.ajax({
                 type: "POST",
                 url: "/Productos/Create",
                 data: {
                     Nombre: $("#txtNombre").val(),
                     Precio: $("#txtPrecio").val(),
                     Stock: $("#txtStock").val()
                 },
                 success: function (response) {
                     console.log(response);
                         Swal.fire({
                         title: "Mensaje",
                         text: response.message,
                         icon: response.icon
                     });

                     $('#createProductoModal').modal('hide');
                     ListProductos();

                 },
                 error: function () {
                     alert('Hubo un error al enviar los datos.');
                 }
             });
         }

    function Eliminar(productoId) {
        $.ajax({
            url: "/Productos/Delete",
            type: "POST",
            data: { id: productoId },
            success: function (response) {
                if (response.success) {
                    $("#producto-" + productoId).remove(); // Eliminar fila de la tabla
                }
                    Swal.fire({
                        title: "Mensaje",
                        text: result.message,
                        icon: result.icon
                    });
            },
            error: function (xhr, status, error) {
                alert("Ocurrió un error al eliminar el producto.");
                console.error(xhr.responseText);
            }
        });
    }


});
