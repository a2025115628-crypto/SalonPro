package com.salonpro.rol.domain.exception;

public class RolNoEncontradoException extends RuntimeException {

    public RolNoEncontradoException(Long id) {
        super("No existe rol con id " + id);
    }
}