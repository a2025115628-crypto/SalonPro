package com.salonpro.rol.infrastructure.persistence.repository;

import com.salonpro.rol.infrastructure.persistence.entity.RolJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringDataRolRepository
        extends JpaRepository<RolJpaEntity, Long> {

    boolean existsByNombreRol(String nombreRol);

    boolean existsByNombreRolAndIdNot(String nombreRol, Long id);
}