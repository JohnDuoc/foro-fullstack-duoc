package cl.duoc.ms_foro.controller;

import cl.duoc.ms_foro.dto.CreateCommentRequest;
import cl.duoc.ms_foro.dto.CreatePostRequest;
import cl.duoc.ms_foro.service.ForumService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin(origins = "*")
public class ForumController {

    private final ForumService forumService;

    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(forumService.listarCategorias());
    }

    @GetMapping("/posts")
    public ResponseEntity<?> getPosts(@RequestParam(required = false) String search,
                                      @RequestParam(required = false) Long categoryId) {
        return ResponseEntity.ok(forumService.buscarPublicaciones(search, categoryId));
    }

    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@Valid @RequestBody CreatePostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(forumService.crearPublicacion(request));
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<?> addComment(@PathVariable Long postId, @Valid @RequestBody CreateCommentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(forumService.agregarComentario(postId, request));
    }

    // Endpoints de Moderación para Administrador (ROLE_ADMIN)
    @GetMapping("/admin/posts")
    public ResponseEntity<?> getAllAdminPosts() {
        return ResponseEntity.ok(forumService.listarTodasAdmin());
    }

    @PatchMapping("/admin/posts/{id}/ban")
    public ResponseEntity<?> banPost(@PathVariable Long id) {
        return ResponseEntity.ok(forumService.alternarBaneoPost(id));
    }

    @PatchMapping("/admin/comments/{id}/ban")
    public ResponseEntity<?> banComment(@PathVariable Long id) {
        return ResponseEntity.ok(forumService.alternarBaneoComentario(id));
    }

    @DeleteMapping("/admin/posts/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        forumService.eliminarPublicacion(id);
        return ResponseEntity.ok(Map.of("message", "Publicación eliminada correctamente."));
    }
}