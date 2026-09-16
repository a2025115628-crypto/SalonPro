package com.salonpro.rol.infrastructure.web.dto;

import jakarta.validation.constraints.NotBlank;

public record CrearRolRequest(
        @NotBlank(message = "El nombre del rol es obligatorio")
        String nombreRol
) {
}