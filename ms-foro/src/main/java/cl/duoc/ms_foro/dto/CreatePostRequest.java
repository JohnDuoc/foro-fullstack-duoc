package cl.duoc.ms_foro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreatePostRequest(
    @NotBlank(message = "El título es obligatorio")
    @Size(min = 5, max = 200)
    String title,

    @NotBlank(message = "El contenido es obligatorio")
    @Size(min = 10, max = 2000)
    String content,

    @NotBlank(message = "El autor es obligatorio")
    String authorUsername,

    @NotNull(message = "La categoría es obligatoria")
    Long categoryId
) {}