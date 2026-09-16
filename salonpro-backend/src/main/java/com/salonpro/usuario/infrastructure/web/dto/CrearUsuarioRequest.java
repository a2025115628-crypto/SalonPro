package com.salonpro.usuario.infrastructure.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CrearUsuarioRequest(

        @NotNull
        Long rolId,

        @NotBlank
        String nombre,

        @NotBlank
        String apellido,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String passwordHash,

        String telefono
) {
}