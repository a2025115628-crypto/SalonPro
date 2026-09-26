package com.salonpro.rol.domain.port.in;

import com.salonpro.rol.domain.model.Rol;

public interface ActualizarRolUseCase {
    Rol actualizar(Long id, String nuevoNombreRol);
}