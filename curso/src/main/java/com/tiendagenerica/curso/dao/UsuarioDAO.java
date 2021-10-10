package com.tiendagenerica.curso.dao;

import com.tiendagenerica.curso.models.Usuarios;

import java.util.List;

public interface UsuarioDAO {

     List<Usuarios> getUsuarios();

     void eliminar(Long cedulaUsuario);

     Usuarios consultar(Long cedulaUsuario);

     void registar(Usuarios usuario);

     Usuarios obtenerUsuarioPorCredenciales(Usuarios usuario);

     void editar(Usuarios usuario);
}
