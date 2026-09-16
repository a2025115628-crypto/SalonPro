package com.salonpro.usuario.infrastructure.persistence.mapper;

import com.salonpro.usuario.domain.model.Usuario;
import com.salonpro.usuario.infrastructure.persistence.entity.UsuarioJpaEntity;

public final class UsuarioPersistenceMapper {

    private UsuarioPersistenceMapper() {
    }

    public static Usuario toDomain(UsuarioJpaEntity entity) {
        return new Usuario(
                entity.getId(),
                entity.getRol().getId(),
                entity.getNombre(),
                entity.getApellido(),
                entity.getEmail(),
                entity.getPasswordHash(),
                entity.getTelefono(),
                entity.isActivo(),
                entity.getFechaCreacion()
        );
    }
}