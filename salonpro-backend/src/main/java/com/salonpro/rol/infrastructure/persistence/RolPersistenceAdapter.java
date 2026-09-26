package com.salonpro.rol.infrastructure.persistence;

import com.salonpro.rol.domain.exception.RolConUsuariosAsociadosException;
import com.salonpro.rol.domain.model.Rol;
import com.salonpro.rol.domain.port.out.RolRepositoryPort;
import com.salonpro.rol.infrastructure.persistence.mapper.RolPersistenceMapper;
import com.salonpro.rol.infrastructure.persistence.repository.SpringDataRolRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class RolPersistenceAdapter implements RolRepositoryPort {

    private final SpringDataRolRepository repository;

    public RolPersistenceAdapter(SpringDataRolRepository repository) {
        this.repository = repository;
    }

    @Override
    public Rol guardar(Rol rol) {
        var entity = RolPersistenceMapper.toEntity(rol);
        var saved = repository.save(entity);
        return RolPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<Rol> buscarPorId(Long id) {
        return repository.findById(id)
                .map(RolPersistenceMapper::toDomain);
    }

    @Override
    public List<Rol> listarTodos() {
        return repository.findAll()
                .stream()
                .map(RolPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public boolean existePorNombreRol(String nombreRol) {
        return repository.existsByNombreRol(nombreRol);
    }

    @Override
    public boolean existePorNombreRolYOtroId(String nombreRol, Long id) {
        return repository.existsByNombreRolAndIdNot(nombreRol, id);
    }

    @Override
    public void eliminar(Long id) {
        try {
            repository.deleteById(id);
            repository.flush();
        } catch (DataIntegrityViolationException ex) {
            throw new RolConUsuariosAsociadosException(id);
        }
    }
}