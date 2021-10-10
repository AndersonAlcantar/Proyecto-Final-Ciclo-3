package com.tiendagenerica.curso.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuarios")
@ToString @EqualsAndHashCode
public class Usuarios {
    @Id @Getter @Setter @Column(name = "cedula_usuario")
    private Long cedulaUsuario;
    @Getter @Setter @Column(name = "email_usuario")
    private String emailUsuario;
    @Getter @Setter @Column(name = "nombre_usuario")
    private String nombreUsuario;
    @Getter @Setter @Column(name = "password")
    private String password;
    @Getter @Setter @Column(name = "usuario")
    private String usuario;
}

