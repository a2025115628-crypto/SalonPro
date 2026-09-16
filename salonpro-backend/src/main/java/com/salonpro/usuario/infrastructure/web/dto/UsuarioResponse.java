package com.salonpro.usuario.infrastructure.web.dto;

import java.time.LocalDateTime;

public record UsuarioResponse(

        Long id,
        Long rolId,
        String nombre,
        String apellido,
        String email,
        String telefono,
        boolean activo,
        LocalDateTime fechaCreacion
) {
}