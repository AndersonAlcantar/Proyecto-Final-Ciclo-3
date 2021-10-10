// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuario();
  $('#usuarios').DataTable();
  mostrarUsuario();
});

function mostrarUsuario(){
    document.getElementById('eml-usuario').outerHTML = localStorage.usuario + "&nbsp;&nbsp;";
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
         let botonEditar = '<a href="javascript:ventanaEditar()" class="btn btn-success btn-circle btn-sm"><i class="fas fa-check"></i></a>'
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

function ventanaEditar(){
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;
//"width=120,height=300,scrollbars=NO"
    window.open('/ventana/','editar.html', "width=120,height=300,scrollbars=NO");
}