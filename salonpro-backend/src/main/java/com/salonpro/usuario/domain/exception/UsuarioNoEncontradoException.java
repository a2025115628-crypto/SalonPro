package com.salonpro.usuario.domain.exception;

public class UsuarioNoEncontradoException extends RuntimeException {

    public UsuarioNoEncontradoException(Long id) {
        super("No existe usuario con id " + id);
    }
}