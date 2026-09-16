package com.salonpro.rol.infrastructure.persistence.mapper;

import com.salonpro.rol.domain.model.Rol;
import com.salonpro.rol.infrastructure.persistence.entity.RolJpaEntity;

public final class RolPersistenceMapper {

    private RolPersistenceMapper() {}

    public static RolJpaEntity toEntity(Rol domain) {
        return new RolJpaEntity(
                domain.getId(),
                domain.getNombreRol()
        );
    }

    public static Rol toDomain(RolJpaEntity entity) {
        return new Rol(
                entity.getId(),
                entity.getNombreRol()
        );
    }
}