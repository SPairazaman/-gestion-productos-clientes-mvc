
$(document).ready(function () {

    //  $('#createProductoButton').click(function () {
    //     $('#createProductoModal').modal('show');
    // });

    //$('#createProductoForm').validate({
    //    rules: {
    //        nombre: {
    //            required: true,
    //            minlength: 10,
    //            maxlength: 50
    //        },
    //        precio: {
    //            required: true,
    //            digits: true,
    //            number: true
    //        },
    //        cantidad: {
    //            required: true,
    //            digits: true,
    //            minlength: 2
    //        },
    //        stock: {
    //            required: true,
    //            digits: true,
    //            minlength: 2
    //        },
    //    },
    //    messages: {
    //        nombre: {
    //            required: "Por favor, ingrese nombre",
    //            minlength: "El nombre debe tener mínimo 20 caracteres.",
    //            maxlength: "El nombre debe tener maximo 50 caracteres."
    //        },
    //        precio: {
    //            required: "Por favor, ingrese precio.",
    //            digits: "El precio solo debe contener 2 dígitos.",
    //            minlength: "El precio debe tener minimo 2 caracteres.",
    //        },
    //        cantidad: {
    //            required: "Por favor, ingrese cantidad.",
    //            digits: "La cantidad solo debe contener 2 dígitos.",
    //            minlength: "La cantidad debe tener minimo 2 caracteres."
    //        },
    //        stock: {
    //            required: "Por favor, ingrese stock.",
    //            digits: "El stock .",
    //            minlength: "La cantidad debe tener minimo 2 caracteres."
    //        }

    //    },
    //    submitHandler: function (form) {
    //        form.submit();
    //        // Grabar();
    //      //     ListProductos();
    //});


        ListProductos();

          $('#createProductoButton').click(function () {
             $('#createProductoModal').modal('show');
         });

         $('#btnBuscar').click(function () {
             ListProductos();
          });

          $('#saveProductoButton').click(function () {
              Grabar();
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
                                                     <td>${producto.precio}</td>
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
