package com.salonpro.rol.domain.port.in;

import com.salonpro.rol.domain.model.Rol;

import java.util.List;
import java.util.Optional;

public interface ConsultarRolUseCase {

    Optional<Rol> buscarPorId(Long id);

    List<Rol> listar();
}