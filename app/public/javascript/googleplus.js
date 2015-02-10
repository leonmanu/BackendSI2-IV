(function(global){

  var prueba;

  'use strict';

  /**
  * Función de retorno al hacer login
  * @method signInCallback
  * @param {} auth Autentificación
  * @return
  */
  global.signInCallback = function( auth ){


    if (auth['code']) {
      // Esconde el botón de inicio de sesión al autentificar
      $('#signinButton').attr('style', 'display: none');

      var data = {
        'code': auth['code'],
        'state': global.clientStateToken
      };
      $.ajax({
        type: 'POST',
        url: '/google/auth',
        contentType: 'application/json; charset=utf-8',
        /**
        * Petición al servidor para autentificación
        * @method success
        * @param {} result Resultado de la llamada
        * @return
        */
        success: function(result) {
          // Escribe usuarios
          localStorage.setItem("result", result.ok);

          data = {
            'auth': auth,
            'state': global.clientStateToken,
            'idusuario':result.ok.id
          };

          $("#contenido").remove();

          $.post("/dashboard",data, function( data ) {
            $(".jumbotron").append(data);
          });

          $.post( "/menu",data, function( data ) {
            $(".jumbotron").append(data);
          });

        },
        processData: false,
        data: JSON.stringify(data),
      });




    } else if (auth['error']) {
      console.log('Hubo un error: ' + auth['error']);
    }

  }

})(this);
