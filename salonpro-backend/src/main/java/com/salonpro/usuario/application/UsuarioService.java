package com.salonpro.usuario.application;

import com.salonpro.rol.domain.port.in.ConsultarRolUseCase;
import com.salonpro.usuario.domain.exception.EmailDuplicadoException;
import com.salonpro.usuario.domain.model.Usuario;
import com.salonpro.usuario.domain.port.in.ConsultarUsuarioUseCase;
import com.salonpro.usuario.domain.port.in.RegistrarUsuarioUseCase;
import com.salonpro.usuario.domain.port.out.UsuarioRepositoryPort;
import org.springframework.stereotype.Service;
import com.salonpro.rol.domain.exception.RolNoEncontradoException;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService
        implements RegistrarUsuarioUseCase, ConsultarUsuarioUseCase {

    private final UsuarioRepositoryPort repositoryPort;
    private final ConsultarRolUseCase consultarRolUseCase;

    public UsuarioService(
            UsuarioRepositoryPort repositoryPort,
            ConsultarRolUseCase consultarRolUseCase) {

        this.repositoryPort = repositoryPort;
        this.consultarRolUseCase = consultarRolUseCase;
    }

    @Override
    public Usuario registrar(Usuario usuario) {

        consultarRolUseCase.buscarPorId(usuario.getRolId())
                .orElseThrow(() ->
                        new RolNoEncontradoException(usuario.getRolId()));

        if (repositoryPort.existePorEmail(usuario.getEmail())) {
            throw new EmailDuplicadoException(usuario.getEmail());
        }

        return repositoryPort.guardar(usuario);
    }

    @Override
    public Optional<Usuario> buscarPorId(Long id) {
        return repositoryPort.buscarPorId(id);
    }

    @Override
    public List<Usuario> listar() {
        return repositoryPort.listarTodos();
    }

    @Override
    public List<Usuario> listarPorRol(Long rolId) {
        return repositoryPort.listarPorRolId(rolId);
    }
}