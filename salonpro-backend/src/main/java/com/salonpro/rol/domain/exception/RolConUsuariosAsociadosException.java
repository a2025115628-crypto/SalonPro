package com.salonpro.rol.domain.exception;

public class RolConUsuariosAsociadosException extends RuntimeException {
    public RolConUsuariosAsociadosException(Long id) {
        super("No se puede eliminar el rol " + id + " porque tiene usuarios asociados");
    }
}