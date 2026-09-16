package com.salonpro.usuario.domain.port.out;

import com.salonpro.usuario.domain.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepositoryPort {

    Usuario guardar(Usuario usuario);

    Optional<Usuario> buscarPorId(Long id);

    List<Usuario> listarTodos();

    List<Usuario> listarPorRolId(Long rolId);

    boolean existePorEmail(String email);
}