// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuario();
  $('#usuarios').DataTable();
  mostrarUsuario();
});

function mostrarUsuario(){
    document.getElementById('eml-usuario').outerHTML = localStorage.usuario + "&nbsp;&nbsp;";
}


function mostrarCedula(){
    document.getElementById('txtCedula').value = localStorage.cedula;
}


function eliminarUsuario(id){

if(confirm('¿Desea eliminar este usuario?')){
    const deleteData = async ( ) =>{
       const response = await fetch("api/eliminar?cedula=" + id, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': localStorage.token
           },
       });
      const data = await response.json( );
      console.log(data);
    };
    deleteData( );
    if(!alert('Usuario eliminado con exito!')){window.location.reload();}
}

}

function cargarUsuario(){

    const deleteData = async ( ) =>{
       const response = await fetch("api/usuarios" , {
           method: 'GET',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': localStorage.token
           },
       });
      const usuarios = await response.json( );
      var listaHTML = '';
      for (let usuario of usuarios){
         let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.cedulaUsuario + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
         let botonEditar = '<a href="javascript:ventanaEditar('+ usuario.cedulaUsuario +')" class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></a>'
         let usuarioHTML = '<tr><td>'
         + usuario.cedulaUsuario+'</td><td>'
         + usuario.emailUsuario+'</td><td>'
         + usuario.nombreUsuario+'</td><td>'
         + usuario.usuario+'</td><td>'
         + botonEliminar+'&nbsp;&nbsp;'+botonEditar+'</td></tr>'
         listaHTML += usuarioHTML;
      }
      document.querySelector("#usuarios tbody").outerHTML = listaHTML;
    };
    deleteData( );
}

function ventanaEditar(id){
localStorage.cedula = id;
function popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}

popupWindow('ventanas/editar.html', 'test', window, 800, 600);
}


function editarUsuario(){

let datos = {}
datos.cedulaUsuario = localStorage.cedula;
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
       const response = await fetch("/api/editar" , {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(datos)
       });
      //const usuarios = await response.json( );
      }
         if(deleteData()){
            alert('Usuario actualizado con exito');
            window.opener.location.reload();
            window.close();
         }else{
            alert('Intentalo nuevamente')
         }
}