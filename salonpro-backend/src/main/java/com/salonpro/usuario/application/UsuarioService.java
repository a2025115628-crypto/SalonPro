package com.salonpro.usuario.application;

import com.salonpro.rol.domain.exception.RolNoEncontradoException;
import com.salonpro.rol.domain.port.in.ConsultarRolUseCase;
import com.salonpro.usuario.domain.exception.EmailDuplicadoException;
import com.salonpro.usuario.domain.exception.UsuarioNoEncontradoException;
import com.salonpro.usuario.domain.model.Usuario;
import com.salonpro.usuario.domain.port.in.ActualizarUsuarioUseCase;
import com.salonpro.usuario.domain.port.in.ConsultarUsuarioUseCase;
import com.salonpro.usuario.domain.port.in.EliminarUsuarioUseCase;
import com.salonpro.usuario.domain.port.in.RegistrarUsuarioUseCase;
import com.salonpro.usuario.domain.port.out.UsuarioRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements RegistrarUsuarioUseCase, ConsultarUsuarioUseCase,
        ActualizarUsuarioUseCase, EliminarUsuarioUseCase {

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
                .orElseThrow(() -> new RolNoEncontradoException(usuario.getRolId()));

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

    @Override
    public Usuario actualizar(Long id, Long rolId, String nombre, String apellido, String email, String telefono) {

        Usuario existente = repositoryPort.buscarPorId(id)
                .orElseThrow(() -> new UsuarioNoEncontradoException(id));

        consultarRolUseCase.buscarPorId(rolId)
                .orElseThrow(() -> new RolNoEncontradoException(rolId));

        if (repositoryPort.existePorEmailYOtroId(email, id)) {
            throw new EmailDuplicadoException(email);
        }

        Usuario actualizado = new Usuario(
                id,
                rolId,
                nombre,
                apellido,
                email,
                existente.getPasswordHash(),
                telefono,
                existente.isActivo(),
                existente.getFechaCreacion()
        );

        return repositoryPort.guardar(actualizado);
    }

    @Override
    public void eliminar(Long id) {
        repositoryPort.buscarPorId(id)
                .orElseThrow(() -> new UsuarioNoEncontradoException(id));
        repositoryPort.eliminar(id);
    }
}