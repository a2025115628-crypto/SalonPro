package com.salonpro.rol.infrastructure.web;

import com.salonpro.rol.domain.model.Rol;
import com.salonpro.rol.domain.port.in.ConsultarRolUseCase;
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

    public RolController(
            RegistrarRolUseCase registrarRolUseCase,
            ConsultarRolUseCase consultarRolUseCase) {

        this.registrarRolUseCase = registrarRolUseCase;
        this.consultarRolUseCase = consultarRolUseCase;
    }

    @PostMapping
    public ResponseEntity<RolResponse> crear(
            @Valid @RequestBody CrearRolRequest request) {

        Rol rol = new Rol(null, request.nombreRol());

        Rol creado = registrarRolUseCase.registrar(rol);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new RolResponse(
                        creado.getId(),
                        creado.getNombreRol()
                ));
    }

    @GetMapping
    public List<RolResponse> listar() {

        return consultarRolUseCase.listar()
                .stream()
                .map(rol -> new RolResponse(
                        rol.getId(),
                        rol.getNombreRol()
                ))
                .toList();
    }
}