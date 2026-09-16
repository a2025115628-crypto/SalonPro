package com.salonpro.usuario.domain.port.in;

import com.salonpro.usuario.domain.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface ConsultarUsuarioUseCase {

    Optional<Usuario> buscarPorId(Long id);

    List<Usuario> listar();

    List<Usuario> listarPorRol(Long rolId);
}