# Glosario del dominio v0.1 — SalonPro

| Término | Significado |
|---|---|
| **Profesional** | Persona del salón que presta servicios a clientes (estilista, terapeuta, manicurista, etc.). Tiene un conjunto de servicios que está habilitado a realizar y un horario de trabajo propio. |
| **Servicio** | Prestación concreta que ofrece el salón (por ejemplo, "Corte de cabello", "Masaje relajante 60 min"). Tiene una duración estándar que determina cuánto ocupa una cita en la agenda. |
| **ProfesionalServicio** | Relación que indica qué profesionales están habilitados para realizar qué servicios. Sin esta habilitación, un profesional no puede ser asignado a esa cita (RN-03). |
| **Horario** | Configuración de disponibilidad regular de un profesional (por ejemplo, días y franjas en que trabaja). Es la base sobre la que se calculan los slots disponibles. |
| **BloqueoHorario** | Intervalo de tiempo dentro del horario de un profesional que queda explícitamente no disponible para reservar (vacaciones, permisos, mantenimiento, cita administrativa). Un slot dentro de un bloqueo nunca debe ofrecerse como disponible (RN-07). |
| **Disponibilidad / Slot** | Intervalo de tiempo concreto en el que un profesional habilitado para un servicio puede recibir una nueva cita, resultado de cruzar Horario, BloqueoHorario y las citas ya existentes. |
| **Cliente** | Persona que solicita y recibe servicios del salón. Puede tener varias citas, sujeto a control de solapamiento personal configurable (RN-09). |
| **Cita** | Reserva de uno o más servicios con un profesional en una fecha y hora determinadas. Recorre estados válidos: reservada, confirmada, en atención, finalizada, cancelada o no asistió (RN-05). No se elimina una vez creada, incluso si se cancela (RN-06). |
| **CitaServicio** | Detalle de los servicios específicos incluidos dentro de una cita (una cita puede incluir más de un servicio), junto con el precio congelado de cada uno al momento de la confirmación (RN-08). |
| **Atención** | Registro de la ejecución real de una cita: momento en que el profesional inicia y finaliza el servicio al cliente. |
| **Pago** | Registro operativo del cobro asociado a una cita, sin integración con una pasarela bancaria real (RN-10). |
| **Usuario** | Cuenta de acceso al sistema asociada a una persona (administrador, recepcionista, profesional, cliente o supervisor) que le permite autenticarse y operar según su rol. |
| **Rol** | Conjunto de permisos que determina qué acciones puede realizar un Usuario dentro del sistema (Administrador, Recepcionista, Profesional, Cliente, Supervisor). |
| **Auditoría** | Registro histórico de cambios relevantes sobre la agenda (quién hizo qué, sobre qué entidad y cuándo), usado para trazabilidad y resolución de disputas (RF-18). |
| **Precio congelado** | Valor del servicio que queda fijado en la cita en el momento en que esta se confirma, de modo que cambios posteriores en el precio del catálogo no afectan citas ya confirmadas (RN-08). |
| **Cancelación tardía** | Cancelación de una cita realizada dentro de un margen de tiempo cercano a la hora reservada, que queda registrada de forma distinguible de una cancelación anticipada (RN-04). |
| **Solapamiento** | Situación en la que dos citas de un mismo profesional (o, si aplica, de un mismo cliente) ocupan un rango de tiempo que se cruza. El sistema debe impedirlo para el profesional siempre, y para el cliente según configuración (RN-01, RN-09). |
