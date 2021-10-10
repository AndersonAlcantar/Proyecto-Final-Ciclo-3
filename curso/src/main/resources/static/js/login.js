// Call the dataTables jQuery plugin
$(document).ready(function() {
    //on ready
});


function iniciarSesion(){

let datos = {};
datos.password= document.getElementById('pwdPassword').value;
datos.usuario = document.getElementById('txtUsuario').value;

const authData = async ( ) =>{
       const request = await fetch('/api/login' , {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(datos)
       });
      const response = await request.text();
      if(response != 'Failed'){
            localStorage.token = response;
            localStorage.usuario = datos.usuario;
            window.location.href = 'usuarios.html';
      }else{
          alert('Credenciales incorrectas, intente nuevamente');
      }
    };

    authData( );
}

