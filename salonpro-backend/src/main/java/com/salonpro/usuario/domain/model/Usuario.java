package com.salonpro.usuario.domain.model;

import java.time.LocalDateTime;

public class Usuario {

    private final Long id;
    private final Long rolId;
    private final String nombre;
    private final String apellido;
    private final String email;
    private final String passwordHash;
    private final String telefono;
    private final boolean activo;
    private final LocalDateTime fechaCreacion;

    public Usuario(
            Long id,
            Long rolId,
            String nombre,
            String apellido,
            String email,
            String passwordHash,
            String telefono,
            boolean activo,
            LocalDateTime fechaCreacion) {

        this.id = id;
        this.rolId = rolId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.passwordHash = passwordHash;
        this.telefono = telefono;
        this.activo = activo;
        this.fechaCreacion = fechaCreacion;
    }

    public Long getId() {
        return id;
    }

    public Long getRolId() {
        return rolId;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getTelefono() {
        return telefono;
    }

    public boolean isActivo() {
        return activo;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
}