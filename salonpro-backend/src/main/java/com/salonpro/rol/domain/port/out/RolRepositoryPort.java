package com.salonpro.rol.domain.port.out;

import com.salonpro.rol.domain.model.Rol;

import java.util.List;
import java.util.Optional;

public interface RolRepositoryPort {

    Rol guardar(Rol rol);

    Optional<Rol> buscarPorId(Long id);

    List<Rol> listarTodos();

    boolean existePorNombreRol(String nombreRol);

    boolean existePorNombreRolYOtroId(String nombreRol, Long id);

    void eliminar(Long id);
}