package com.salonpro.usuario.infrastructure.web;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.salonpro.usuario.domain.exception.UsuarioNoEncontradoException;
import com.salonpro.usuario.domain.model.Usuario;
import com.salonpro.usuario.domain.port.in.ConsultarUsuarioUseCase;
import com.salonpro.usuario.domain.port.in.RegistrarUsuarioUseCase;
import com.salonpro.usuario.infrastructure.web.dto.CrearUsuarioRequest;
import com.salonpro.usuario.infrastructure.web.dto.UsuarioResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuarios", description = "Operaciones para registrar y consultar usuarios")
public class UsuarioController {

    private final RegistrarUsuarioUseCase registrarUseCase;
    private final ConsultarUsuarioUseCase consultarUseCase;

    public UsuarioController(
            RegistrarUsuarioUseCase registrarUseCase,
            ConsultarUsuarioUseCase consultarUseCase) {

        this.registrarUseCase = registrarUseCase;
        this.consultarUseCase = consultarUseCase;
    }

    @Operation(summary = "Crear usuario")
    @ApiResponse(responseCode = "201", description = "Usuario creado correctamente")
    @PostMapping
    public ResponseEntity<UsuarioResponse> crear(
            @Valid @RequestBody CrearUsuarioRequest request) {

        Usuario usuario = new Usuario(
                null,
                request.rolId(),
                request.nombre(),
                request.apellido(),
                request.email(),
                request.passwordHash(),
                request.telefono(),
                true,
                LocalDateTime.now()
        );

        Usuario creado = registrarUseCase.registrar(usuario);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(creado));
    }

    @GetMapping
    public List<UsuarioResponse> listar() {

        return consultarUseCase.listar()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public UsuarioResponse buscarPorId(@PathVariable Long id) {

        Usuario usuario = consultarUseCase.buscarPorId(id)
                .orElseThrow(() ->
                        new UsuarioNoEncontradoException(id));

        return toResponse(usuario);
    }

    @GetMapping("/rol/{rolId}")
    public List<UsuarioResponse> listarPorRol(
            @PathVariable Long rolId) {

        return consultarUseCase.listarPorRol(rolId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private UsuarioResponse toResponse(Usuario usuario) {

        return new UsuarioResponse(
                usuario.getId(),
                usuario.getRolId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getEmail(),
                usuario.getTelefono(),
                usuario.isActivo(),
                usuario.getFechaCreacion()
        );
    }
}