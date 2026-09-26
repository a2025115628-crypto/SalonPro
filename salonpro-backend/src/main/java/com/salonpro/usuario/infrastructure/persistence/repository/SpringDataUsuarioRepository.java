package com.salonpro.usuario.infrastructure.persistence.repository;

import com.salonpro.usuario.infrastructure.persistence.entity.UsuarioJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpringDataUsuarioRepository
        extends JpaRepository<UsuarioJpaEntity, Long> {

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    List<UsuarioJpaEntity> findByRol_Id(Long rolId);
}