$(document).ready(function(){

    //alert("entro");

    $("#btnIngresar").click(function(){

        var url = "/auth/login";
        var parametros = {
            email: $("#floatingInputCorreo").val(),
            password: $("#floatingInputPassword").val()
        }

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
            var msj = ` <div class="alert alert-success" role="alert">
                                <strong>¡Usuario registrado exitosamente!<strong>
                            </div>  `;

            $("#respuesta").html(msj)
            */
            setTimeout(function(){
                location.href ='index.html';
            },3000);

        }).fail(function (msg) {

            var msj = ` <div class="alert alert-danger" role="alert">
                            <strong>¡Ocurrio un error al validar usuario!<strong>
                        </div>  `;

            $("#respuesta").html(msj)

        }).always(function (msg) {
            console.log('ALWAYS');
        });

        /*
        $.post(url,parametros,function(){

        });
        */
    });

});