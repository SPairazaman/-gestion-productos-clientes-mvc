
$(document).ready(function () {

      $('#createProductoButton').click(function () {
         $('#createProductoModal').modal('show');
     });

    $('#createProductoForm').validate({
        rules: {
            nombre: {
                required: true,
                minlength: 10,
                maxlength: 50
            },
            precio: {
                required: true,
                digits: true,
                number: true
            },
            cantidad: {
                required: true,
                digits: true,
                minlength: 2
            },
            stock: {
                required: true,
                digits: true,
                minlength: 2
            },
        },
        messages: {
            nombre: {
                required: "Por favor, ingrese nombre",
                minlength: "El nombre debe tener mínimo 20 caracteres.",
                maxlength: "El nombre debe tener maximo 50 caracteres."
            },
            precio: {
                required: "Por favor, ingrese precio.",
                digits: "El precio solo debe contener 2 dígitos.",
                minlength: "El precio debe tener minimo 2 caracteres.",
            },
            cantidad: {
                required: "Por favor, ingrese cantidad.",
                digits: "La cantidad solo debe contener 2 dígitos.",
                minlength: "La cantidad debe tener minimo 2 caracteres."
            },
            stock: {
                required: "Por favor, ingrese stock.",
                digits: "El stock .",
                minlength: "La cantidad debe tener minimo 2 caracteres."
            }

        },
        submitHandler: function (form) {
            form.submit();
            // Grabar();
        }
    });

});
