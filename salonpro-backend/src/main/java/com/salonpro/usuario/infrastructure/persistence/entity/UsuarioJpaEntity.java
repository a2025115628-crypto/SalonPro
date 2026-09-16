package com.salonpro.usuario.infrastructure.persistence.entity;

import com.salonpro.rol.infrastructure.persistence.entity.RolJpaEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
public class UsuarioJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "rol_id", nullable = false)
    private RolJpaEntity rol;

    @Column(name = "nombre", nullable = false, length = 80)
    private String nombre;

    @Column(name = "apellido", nullable = false, length = 80)
    private String apellido;

    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "telefono", length = 30)
    private String telefono;

    @Column(name = "activo", nullable = false)
    private boolean activo;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    protected UsuarioJpaEntity() {
    }

    public UsuarioJpaEntity(
            Long id,
            RolJpaEntity rol,
            String nombre,
            String apellido,
            String email,
            String passwordHash,
            String telefono,
            boolean activo,
            LocalDateTime fechaCreacion) {

        this.id = id;
        this.rol = rol;
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

    public RolJpaEntity getRol() {
        return rol;
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