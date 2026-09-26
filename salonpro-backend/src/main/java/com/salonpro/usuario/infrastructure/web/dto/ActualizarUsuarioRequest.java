package com.salonpro.usuario.infrastructure.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ActualizarUsuarioRequest(
        @NotNull
        Long rolId,

        @NotBlank
        String nombre,

        @NotBlank
        String apellido,

        @NotBlank
        @Email
        String email,

        String telefono
) {}