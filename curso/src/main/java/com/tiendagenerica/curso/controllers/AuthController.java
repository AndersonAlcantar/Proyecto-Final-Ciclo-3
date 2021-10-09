package com.tiendagenerica.curso.controllers;

import com.tiendagenerica.curso.dao.UsuarioDAO;
import com.tiendagenerica.curso.models.Usuarios;
import com.tiendagenerica.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDAO usuarioDAO;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public @ResponseBody
    String login(@RequestBody Usuarios usuario) {

        Usuarios usuarioLogeado = usuarioDAO.obtenerUsuarioPorCredenciales(usuario);
        if (usuarioLogeado != null){

            String tokenJWT = jwtUtil.create(String.valueOf(usuarioLogeado.getCedulaUsuario()), String.valueOf(usuario.getUsuario()));

            return tokenJWT;
        }
            return "Failed";

    }
}
