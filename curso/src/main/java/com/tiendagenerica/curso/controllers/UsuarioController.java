package com.tiendagenerica.curso.controllers;

import com.tiendagenerica.curso.dao.UsuarioDAO;
import com.tiendagenerica.curso.models.Usuarios;
import com.tiendagenerica.curso.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDAO usuarioDAO;

    @Autowired
    private JWTUtil jwtUtil;

    //Listar Usuarios
    @RequestMapping(value = "/api/usuarios", method = RequestMethod.GET)
    public List<Usuarios> getUsuarios(@RequestHeader(value = "Authorization") String token){
        if(!validarToken(token)) {return null;}
        return usuarioDAO.getUsuarios();
    }

    //Validar Token
    private boolean validarToken(String token) {
        String cedulaUsuario = jwtUtil.getKey(token);
        return cedulaUsuario != null;
    }

    //Buscar Usuario
    @RequestMapping(value = "/api/consultar", method = RequestMethod.GET)
    public @ResponseBody Usuarios getUsuario(@RequestParam(name = "cedula") Long cedulaUsuario){
        Usuarios usuario = usuarioDAO.consultar(cedulaUsuario);
        return usuario;
    }

    //Registrar usuario
    @RequestMapping(value = "/api/registrar", method = RequestMethod.POST)
    public @ResponseBody void registrar(@RequestBody Usuarios usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);
        usuarioDAO.registar(usuario);
    }

    @RequestMapping(value = "usuario456")
    public Usuarios editar(){
        Usuarios usuarios = new Usuarios();
        usuarios.setEmailUsuario("Andres");
        usuarios.setNombreUsuario("Colmenares");
        usuarios.setPassword("andrescolmenares@hotmail.com");
        usuarios.setUsuario("4024191");
        return usuarios;
    }

    //Eliminar usuario
    @RequestMapping(value = "/api/eliminar", method = RequestMethod.DELETE)
    public @ResponseBody void eliminar(@RequestHeader(value = "Authorization") String token,
                                       @RequestParam(name = "cedula") Long cedulaUsuario){
        if(!validarToken(token)) {return;}
        usuarioDAO.eliminar(cedulaUsuario);
    }

}
