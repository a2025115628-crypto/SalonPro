package com.salonpro.usuario.infrastructure.persistence;

import com.salonpro.rol.infrastructure.persistence.entity.RolJpaEntity;
import com.salonpro.rol.infrastructure.persistence.repository.SpringDataRolRepository;
import com.salonpro.usuario.domain.model.Usuario;
import com.salonpro.usuario.domain.port.out.UsuarioRepositoryPort;
import com.salonpro.usuario.infrastructure.persistence.entity.UsuarioJpaEntity;
import com.salonpro.usuario.infrastructure.persistence.mapper.UsuarioPersistenceMapper;
import com.salonpro.usuario.infrastructure.persistence.repository.SpringDataUsuarioRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UsuarioPersistenceAdapter implements UsuarioRepositoryPort {

    private final SpringDataUsuarioRepository repository;
    private final SpringDataRolRepository rolRepository;

    public UsuarioPersistenceAdapter(
            SpringDataUsuarioRepository repository,
            SpringDataRolRepository rolRepository) {

        this.repository = repository;
        this.rolRepository = rolRepository;
    }

    @Override
    public Usuario guardar(Usuario usuario) {

        RolJpaEntity rol = rolRepository
                .findById(usuario.getRolId())
                .orElseThrow();

        UsuarioJpaEntity entity = new UsuarioJpaEntity(
                usuario.getId(),
                rol,
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail(),
                usuario.getPasswordHash(),
                usuario.getTelefono(),
                usuario.isActivo(),
                usuario.getFechaCreacion()
        );

        UsuarioJpaEntity saved = repository.save(entity);

        return UsuarioPersistenceMapper.toDomain(saved);
    }

    @Override
    public Optional<Usuario> buscarPorId(Long id) {
        return repository.findById(id)
                .map(UsuarioPersistenceMapper::toDomain);
    }

    @Override
    public List<Usuario> listarTodos() {
        return repository.findAll()
                .stream()
                .map(UsuarioPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public List<Usuario> listarPorRolId(Long rolId) {
        return repository.findByRol_Id(rolId)
                .stream()
                .map(UsuarioPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public boolean existePorEmail(String email) {
        return repository.existsByEmail(email);
    }
}