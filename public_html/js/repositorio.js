$(document).ready(function(){

    muestraTodosUsuarios();

    
        $("#btnAgregarUsuario").click(function(){
            
            //alert("entro");
            
            var url = "/usuarios";
            var parametros = {
                nombre: $("#inputNombre").val(),
                apellido: $("#inputApellido").val(),
                telefono: $("#inputTelefono").val(),
                email: $("#inputCorreo").val(),
                edad: $("#inputEdad").val(),
            };
            
            
            $.post(url,parametros,function(data){

                var msj = ` <div class="alert alert-success" role="alert">
                                <strong>` + data + `<strong>
                            </div>  `;
                
                $("#respuestaModal").html(msj)

                $("#inputNombre").empty()
                $("#inputApellido").empty()
                $("#inputTelefono").empty()
                $("#inputCorreo").empty()
                $("#inputEdad").empty()

                setTimeout(function(){

                        alert(entro);

                        $("#modalAgregarUsuario").modal("hide");
                        muestraTodosUsuarios();
                    },3000);
            });
        });
    
    //----------------------------------------------

        $("#btnBuscarUsr").click(function(){

            var parametro = $("#inputBuscar").val();
            var url = "/usuarios/" + parametro;
            
            //alert(parametro);

            $.get(url,function(data){
                $("#respuesta").html(data)
            });

        });

});


    function eliminarUsuario(id){

        alert("entro");

        var url = "/usuarios/" + id;
        //var parametros ={
        //};

        $.ajax({
            type: 'DELETE',
            url: url,
            //contentType: 'application/json',
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            
            headers: {'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhiZjFkNzNiNWQ1NDcwNTliYzlkNjUiLCJlbWFpbCI6ImdkemliQGxpdmUuY29tLm14IiwiaWF0IjoxNjg2ODkzMDk4LCJleHAiOjE2ODY4OTQ4OTh9.3JfcBbVI5a345_2GZk0DPkLXKSGAl48FCVJharnwR_Y'},
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            //data: JSON.stringify(parametros),
            //data: parametros,    
        }).done(function(data) {
            
            console.log('SUCCESS');

            var msj = ` <div class="alert alert-success" role="alert">
                                <strong>¡Usuario eliminado exitosamente!<strong>
                            </div>  `;

            $("#respuestaModalE").html(msj)

        }).fail(function (msg) {

            var msj = ` <div class="alert alert-danger" role="alert">
                            <strong>¡Ocurrio un error al eliminar usuario!<strong>
                        </div>  `;

            $("#respuestaModalE").html(msj)

        }).always(function (msg) {
            console.log('ALWAYS');
        });

    }

//------------------------------------------

    function modificarUsuario(id){

        //alert(id);

        var url = "/usuarios/" + id;
        var parametros = {
            nombre: $("#inputNombre").val(),
            apellido: $("#inputApellido").val(),
            telefono: $("#inputTelefono").val(),
            email: $("#inputCorreo").val(),
            edad: $("#inputEdad").val(),
        };

        $.ajax({
            type: 'PUT',
            url: url,
            //contentType: 'application/json',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            //data: JSON.stringify(parametros),
            data: parametros,    
        }).done(function(data) {
            
            console.log('SUCCESS');

            var msj = ` <div class="alert alert-success" role="alert">
                                <strong>¡Usuario actualizado exitosamente!<strong>
                            </div>  `;

            $("#respuestaModalA").html(msj)

        }).fail(function (msg) {

            var msj = ` <div class="alert alert-danger" role="alert">
                            <strong>¡Ocurrio un error al actualizar!<strong>
                        </div>  `;

            $("#respuestaModalA").html(msj)

        }).always(function (msg) {
            console.log('ALWAYS');
        });

    }

//------------------------------------------
/*
    function modificarUsuario(id){

        alert(id);

    }
*/
//-------------------------------------------

    function muestraTodosUsuarios(){        

        $.get("/usuarios",function(data){

            //alert(data[0].nombre);
            console.log(data[0]._id);

            $("#respuesta").html(data)

        });

    }


