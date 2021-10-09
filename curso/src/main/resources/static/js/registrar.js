// Call the dataTables jQuery plugin
$(document).ready(function() {
    //on ready
});


function registrarUsuario(){

let datos = {};
datos.cedulaUsuario = document.getElementById('txtCedula').value;
datos.emailUsuario = document.getElementById('emlEmail').value;
datos.nombreUsuario = document.getElementById('txtNombre').value;
datos.password= document.getElementById('pwdPassword').value;
datos.usuario = document.getElementById('txtUsuario').value;

let repetirPassword = document.getElementById('pwdRepetirPassword').value;

if(repetirPassword != datos.password){
    alert('La contraseña no coincide');
    return;
}
const deleteData = async ( ) =>{
       const request = await fetch('/api/registrar' , {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(datos)
       });
      //const data = await request.json( );
    };

    if(deleteData( )){
        alert('Usuario creado con exito');
        document.getElementById('txtCedula').value = "";
        document.getElementById('emlEmail').value = "";
        document.getElementById('txtNombre').value = "";
        document.getElementById('pwdPassword').value = "";
        document.getElementById('txtUsuario').value = "";
        document.getElementById('pwdRepetirPassword').value = "";
    }else{
        alert('Usuario existente')
    }
}

