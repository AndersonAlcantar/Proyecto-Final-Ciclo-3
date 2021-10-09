// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuario();
  $('#usuarios').DataTable();
  mostrarUsuario();
});

function mostrarUsuario(){
    document.getElementById('eml-usuario').outerHTML = localStorage.usuario + "&nbsp;&nbsp;";
}

/*async function cargarUsuario(){

request = new XMLHttpRequest();
request.open('GET', 'api/usuarios', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400){
    // Success!
    var usuarios = JSON.parse(request.responseText);
    var listaHTML = '';
    for (let usuario of usuarios){
       let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.cedulaUsuario + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
       let usuarioHTML = '<tr><td>'
       + usuario.cedulaUsuario+'</td><td>'
       + usuario.emailUsuario+'</td><td>'
       + usuario.nombreUsuario+'</td><td>'
       + usuario.usuario+'</td><td>'+botonEliminar+'</td></tr>'
       listaHTML += usuarioHTML;
    }
    document.querySelector("#usuarios tbody").outerHTML = listaHTML;
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
}*/

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
         let usuarioHTML = '<tr><td>'
         + usuario.cedulaUsuario+'</td><td>'
         + usuario.emailUsuario+'</td><td>'
         + usuario.nombreUsuario+'</td><td>'
         + usuario.usuario+'</td><td>'+botonEliminar+'</td></tr>'
         listaHTML += usuarioHTML;
      }
      document.querySelector("#usuarios tbody").outerHTML = listaHTML;
    };
    deleteData( );

}

