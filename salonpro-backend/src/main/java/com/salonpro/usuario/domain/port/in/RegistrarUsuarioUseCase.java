package com.salonpro.usuario.domain.port.in;

import com.salonpro.usuario.domain.model.Usuario;

public interface RegistrarUsuarioUseCase {

    Usuario registrar(Usuario usuario);
}