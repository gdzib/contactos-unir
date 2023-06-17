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

        
        //var token = getToken($("#floatingInputCorreo").val(),$("#floatingInputPassword").val());

        //************** */
        
        var token = null;

        var url = "/auth/login";
        var parametros = {
            email: $("#floatingInputCorreo").val(),
            password: $("#floatingInputPassword").val()
        }

        //console.log(parametros)

        $.ajax({
            type: 'POST',
            url: url,
            //contentType: 'application/json',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            //data: JSON.stringify(parametros),
            data: parametros,    
        }).done(function(data) {
            
            console.log('SUCCESS');
            console.log(data.token);
            
            token = data.token
           //return data;

        }).fail(function (msg) {

            return null;

        }).always(function (msg) {
            console.log(msg)
            console.log(msg.token.toString())
            console.log('ALWAYS');

            token = msg.token
            //return msg;
        });
        


        //********************** */

        setTimeout(function(){

                console.log("respuesta A: " + token)

                if( !token ){
                    var msj = ` <div class="alert alert-danger" role="alert">
                                    <strong>¡Ocurrio un error al generar Token!<strong>
                                </div>  `;

                    $("#respuestaModalE").html(msj)

                    return false;
                }

                console.log("respuesta D: " + token)

                var url = "/usuarios/" + id;
                //var parametros ={
                //};

                $.ajax({
                    type: 'DELETE',
                    url: url,
                    //contentType: 'application/json',
                    //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    
                    headers: {'x-access-token': token},
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

        },5000);

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
            //console.log(data[0]._id);

            $("#respuesta").html(data)

        });

    }

//---------------------------------------------

    function getToken(email,password){

        var url = "/auth/login";
        var parametros = {
            email: email,
            password: password
        }

        //console.log(parametros)

        $.ajax({
            type: 'POST',
            url: url,
            //contentType: 'application/json',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            //data: JSON.stringify(parametros),
            data: parametros,    
        }).done(function(data) {
            
            console.log('SUCCESS');
            console.log(data.token);
            /*

            setTimeout(function(){
                location.href ='index.html';
            },3000);
            */
           return data.token
           //return data;

        }).fail(function (msg) {

            return null;

        }).always(function (msg) {
            console.log(msg)
            console.log(msg.token.toString())
            console.log('ALWAYS');

            return msg.token
            //return msg;
        });

    }


