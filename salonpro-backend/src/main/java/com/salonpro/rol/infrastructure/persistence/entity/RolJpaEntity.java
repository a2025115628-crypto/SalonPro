package com.salonpro.rol.infrastructure.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "rol")
public class RolJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rol_id")
    private Long id;

    @Column(name = "nombre_rol", nullable = false, unique = true)
    private String nombreRol;

    protected RolJpaEntity() {
    }

    public RolJpaEntity(Long id, String nombreRol) {
        this.id = id;
        this.nombreRol = nombreRol;
    }

    public Long getId() {
        return id;
    }

    public String getNombreRol() {
        return nombreRol;
    }
}
