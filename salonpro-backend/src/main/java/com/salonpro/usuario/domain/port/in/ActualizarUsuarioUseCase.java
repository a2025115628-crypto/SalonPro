package com.salonpro.usuario.domain.port.in;

import com.salonpro.usuario.domain.model.Usuario;

public interface ActualizarUsuarioUseCase {
    Usuario actualizar(Long id, Long rolId, String nombre, String apellido, String email, String telefono);
}