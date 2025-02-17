
$(document).ready(function () {

    ListProductos();

    $('#createProductoButton').click(function () {
        $('#createProductoModal').modal('show');
    });

    $('#btnBuscar').click(function () {
        ListProductos();
    });

    $('#saveProductoButton').click(function () {

        $.validator.addMethod("decimalComa", function (value, element) {
            return this.optional(element) || /^-?\d+([,\.]\d+)?$/.test(value);
        }, "Ingrese un valor decima");

        $.validator.addMethod("precioValido", function (value, element) {
            let precio = parseFloat(value.replace(",", "."));
            return !isNaN(precio) && precio > 0;
        }, "Ingrese un precio válido mayor a 0");

        $('#createProductoForm').validate({
            rules: {
                txtNombre: {
                    required: true,
                    minlength: 3
                },
                txtPrecio: {
                    required: true,
                    decimalComa: true,
                    precioValido:true
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
                    decimalComa: "Ingrese un número válido (Ej: 10,50 o 10.50)",
                    precioValido: "El precio debe ser un número mayor a 0 (Ej: 10,50 o 10.50)"
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
            Limpiar();
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
                                                     <td><button class="eliminar-btn  btn-danger btn-sm rounded-0" data-id="${producto.productoID}">Eliminar</button></td>
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


    function Grabar() {
              $.ajax({
                 type: "POST",
                  url: "/Productos/Create",
                  data: {
                      Nombre: $("#txtNombre").val(),
                      Precio: $("#txtPrecio").val().replace(".", ","),
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

    function Limpiar(){
        Nombre: $("#txtNombre").val("");
        Precio: Number($("#txtPrecio").val(""));
        Stock: $("#txtStock").val("");
    }

});
