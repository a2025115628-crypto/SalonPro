package com.salonpro.rol.domain.exception;

public class NombreRolDuplicadoException extends RuntimeException {
    public NombreRolDuplicadoException(String nombreRol) {
        super("Ya existe un rol con el nombre: " + nombreRol);
    }
}