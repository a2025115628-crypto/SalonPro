package com.salonpro.rol.infrastructure.web;

import com.salonpro.rol.domain.exception.RolNoEncontradoException;
import com.salonpro.rol.domain.model.Rol;
import com.salonpro.rol.domain.port.in.ActualizarRolUseCase;
import com.salonpro.rol.domain.port.in.ConsultarRolUseCase;
import com.salonpro.rol.domain.port.in.EliminarRolUseCase;
import com.salonpro.rol.domain.port.in.RegistrarRolUseCase;
import com.salonpro.rol.infrastructure.web.dto.CrearRolRequest;
import com.salonpro.rol.infrastructure.web.dto.RolResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    private final RegistrarRolUseCase registrarRolUseCase;
    private final ConsultarRolUseCase consultarRolUseCase;
    private final ActualizarRolUseCase actualizarRolUseCase;
    private final EliminarRolUseCase eliminarRolUseCase;

    public RolController(
            RegistrarRolUseCase registrarRolUseCase,
            ConsultarRolUseCase consultarRolUseCase,
            ActualizarRolUseCase actualizarRolUseCase,
            EliminarRolUseCase eliminarRolUseCase) {

        this.registrarRolUseCase = registrarRolUseCase;
        this.consultarRolUseCase = consultarRolUseCase;
        this.actualizarRolUseCase = actualizarRolUseCase;
        this.eliminarRolUseCase = eliminarRolUseCase;
    }

    @PostMapping
    public ResponseEntity<RolResponse> crear(
            @Valid @RequestBody CrearRolRequest request) {

        Rol rol = new Rol(null, request.nombreRol());
        Rol creado = registrarRolUseCase.registrar(rol);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(creado));
    }

    @GetMapping
    public List<RolResponse> listar() {
        return consultarRolUseCase.listar()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RolResponse> buscarPorId(@PathVariable Long id) {
        Rol rol = consultarRolUseCase.buscarPorId(id)
                .orElseThrow(() -> new RolNoEncontradoException(id));
        return ResponseEntity.ok(toResponse(rol));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RolResponse> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody CrearRolRequest request) {

        Rol actualizado = actualizarRolUseCase.actualizar(id, request.nombreRol());
        return ResponseEntity.ok(toResponse(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        eliminarRolUseCase.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    private RolResponse toResponse(Rol rol) {
        return new RolResponse(rol.getId(), rol.getNombreRol());
    }
}