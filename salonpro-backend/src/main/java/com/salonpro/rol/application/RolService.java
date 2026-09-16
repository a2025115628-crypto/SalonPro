package com.salonpro.rol.application;

import com.salonpro.rol.domain.model.Rol;
import com.salonpro.rol.domain.port.in.ConsultarRolUseCase;
import com.salonpro.rol.domain.port.in.RegistrarRolUseCase;
import com.salonpro.rol.domain.port.out.RolRepositoryPort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService implements RegistrarRolUseCase, ConsultarRolUseCase {

    private final RolRepositoryPort repositoryPort;

    public RolService(RolRepositoryPort repositoryPort) {
        this.repositoryPort = repositoryPort;
    }

    @Override
    public Rol registrar(Rol rol) {
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
}