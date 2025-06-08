# TroubleGang Discord Bot

¡Bienvenido al repositorio oficial de NightFlameBot, un bot de Discord versátil, con comandos de información, entretenimiento, utilidad y moderación!

---

## Descripción

TroubleGang es un bot para Discord creado para ofrecer funcionalidades tanto de diversión como de gestión para tu servidor. Incluye comandos útiles, juegos, información, y gestión de respuestas automáticas y eventos.

---

## Comandos disponibles

### Comandos de Información
| Comando       | Descripción                             |
|---------------|---------------------------------------|
| `/about`      | Muestra información sobre el bot.     |
| `/credits`    | Muestra información técnica sobre el bot. |
| `/help`       | Muestra la lista de comandos disponibles. |
| `/ping`       | Muestra la latencia del bot.           |
| `/avatar`     | Muestra el avatar de un usuario.       |
| `/banner`     | Muestra el banner de un usuario.       |
| `/userinfo`   | Muestra información sobre un usuario.  |
| `/emojis`     | Muestra los emojis del servidor.       |
| `/icon`       | Muestra el icono del servidor.          |
| `/roles`      | Muestra los roles del servidor.         |
| `/serverbanner` | Muestra el banner del servidor.       |
| `/serverinfo` | Muestra información sobre el servidor. |

### Comandos de Entretenimiento
| Comando   | Descripción                                   |
|-----------|-----------------------------------------------|
| `/8ball`  | Responde una pregunta con la mágica bola 8.  |
| `/choose` | Elige entre opciones dadas.                    |
| `/mixnames` | Mezcla los nombres de dos usuarios.         |
| `/pokemon` | Obtén información sobre un Pokémon.           |
| `/shiny`  | Visualiza la versión shiny de un Pokémon.     |
| `/rate`   | El bot puntúa tu perfil.                       |
| `/roll`   | Lanza dados con cantidad y caras específicas. |
| `/rps`    | Juega a piedra, papel o tijeras.               |
| `/ship`   | Calcula compatibilidad entre dos usuarios.    |

### Comandos de Utilidad
| Comando           | Descripción                                     |
|-------------------|------------------------------------------------|
| `/allbirthdays`    | Muestra todos los cumpleaños registrados.      |
| `/birthday add`   | Añade tu cumpleaños.                             |
| `/birthday remove`| Elimina tu cumpleaños.                           |
| `/github`         | Muestra información de un usuario de GitHub.   |
| `/poll`           | Realiza una encuesta con opciones separadas por `|`. |

### Comandos de Moderación
| Comando            | Descripción                                        |
|--------------------|---------------------------------------------------|
| `/allresponses`     | Muestra todas las respuestas automáticas registradas. |
| `/responses add`    | Añade una nueva respuesta automática.             |
| `/responses remove` | Elimina una respuesta existente.                   |
| `/responses update` | Actualiza una respuesta existente.                 |
| `/slowmode`         | Establece un slowmode en un canal específico.     |
| `/purge`            | Limpia una cantidad específica de mensajes.        |
| `/setchannel`       | Establece un canal específico (EventsBot).         |
| `/listevents`       | Muestra información detallada de los EventsBot.    |

---

## Eventos configurables

- **Bienvenida:** Envía un mensaje personalizado cuando un usuario entra al servidor (configurable con `/setchannel canal welcome`).
- **Despedida:** Envía un mensaje personalizado cuando un usuario sale del servidor (configurable con `/setchannel canal goodbye`).
- **Conteo de miembros** Muestra el número de usuarios que hay en el servidor (configurable con `/setchannel canal memberCount`).
- **Mensajes de error como mensaje privado** Envía todo mensaje de error al chat privado del usuario (configurable en `config.js - errorUserId`)

---

## Instalación y Configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/SCrbnll/NightFlameBot.git
