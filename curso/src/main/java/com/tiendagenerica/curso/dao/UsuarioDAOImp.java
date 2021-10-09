package com.tiendagenerica.curso.dao;

import com.tiendagenerica.curso.models.Usuarios;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


@Repository
@Transactional
public class UsuarioDAOImp implements UsuarioDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Usuarios> getUsuarios() {
        String query = "FROM Usuarios";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long cedulaUsuario) {
        Usuarios usuario = entityManager.find(Usuarios.class, cedulaUsuario);
        entityManager.remove(usuario);
    }

    public Usuarios consultar(Long cedulaUsuario) {
        Usuarios usuario = entityManager.find(Usuarios.class, cedulaUsuario);
        return usuario;
    }

    @Override
    public void registar(Usuarios usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuarios obtenerUsuarioPorCredenciales(Usuarios usuario) {
        String query = "FROM Usuarios WHERE  usuario = :usuario";
        List<Usuarios> resultado = entityManager.createQuery(query)
                .setParameter("usuario", usuario.getUsuario())
                .getResultList();

        if (resultado.isEmpty()) {
            return null;
        }

        String passwordHashed = resultado.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getPassword())) {
            return resultado.get(0);
        }

        return null;
    }
}
