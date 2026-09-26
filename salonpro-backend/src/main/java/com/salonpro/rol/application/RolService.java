package com.salonpro.rol.application;

import com.salonpro.rol.domain.exception.NombreRolDuplicadoException;
import com.salonpro.rol.domain.exception.RolNoEncontradoException;
import com.salonpro.rol.domain.model.Rol;
import com.salonpro.rol.domain.port.in.ActualizarRolUseCase;
import com.salonpro.rol.domain.port.in.ConsultarRolUseCase;
import com.salonpro.rol.domain.port.in.EliminarRolUseCase;
import com.salonpro.rol.domain.port.in.RegistrarRolUseCase;
import com.salonpro.rol.domain.port.out.RolRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService implements RegistrarRolUseCase, ConsultarRolUseCase,
        ActualizarRolUseCase, EliminarRolUseCase {

    private final RolRepositoryPort repositoryPort;

    public RolService(RolRepositoryPort repositoryPort) {
        this.repositoryPort = repositoryPort;
    }

    @Override
    public Rol registrar(Rol rol) {
        if (repositoryPort.existePorNombreRol(rol.getNombreRol())) {
            throw new NombreRolDuplicadoException(rol.getNombreRol());
        }
        return repositoryPort.guardar(rol);
    }

    @Override
    public Optional<Rol> buscarPorId(Long id) {
        return repositoryPort.buscarPorId(id);
    }

    @Override
    public List<Rol> listar() {
        return repositoryPort.listarTodos();
    }

    @Override
    public Rol actualizar(Long id, String nuevoNombreRol) {
        repositoryPort.buscarPorId(id)
                .orElseThrow(() -> new RolNoEncontradoException(id));

        if (repositoryPort.existePorNombreRolYOtroId(nuevoNombreRol, id)) {
            throw new NombreRolDuplicadoException(nuevoNombreRol);
        }

        return repositoryPort.guardar(new Rol(id, nuevoNombreRol));
    }

    @Override
    public void eliminar(Long id) {
        repositoryPort.buscarPorId(id)
                .orElseThrow(() -> new RolNoEncontradoException(id));
        repositoryPort.eliminar(id);
    }
}