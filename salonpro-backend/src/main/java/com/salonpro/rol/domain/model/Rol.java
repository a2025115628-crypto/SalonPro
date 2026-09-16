package com.salonpro.rol.domain.model;

public class Rol {

    private final Long id;
    private final String nombreRol;

    public Rol(Long id, String nombreRol) {
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
