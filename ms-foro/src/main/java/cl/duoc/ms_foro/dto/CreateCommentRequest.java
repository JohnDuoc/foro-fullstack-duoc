package cl.duoc.ms_foro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateCommentRequest(
    @NotBlank(message = "El comentario no puede estar vacío")
    @Size(min = 2, max = 1000)
    String content,

    @NotBlank(message = "El autor es obligatorio")
    String authorUsername
) {}
