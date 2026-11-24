package cl.duoc.ms_foro.service;

import cl.duoc.ms_foro.dto.CreateCommentRequest;
import cl.duoc.ms_foro.dto.CreatePostRequest;
import cl.duoc.ms_foro.entity.CategoryEntity;
import cl.duoc.ms_foro.entity.CommentEntity;
import cl.duoc.ms_foro.entity.PostEntity;
import java.util.List;

public interface ForumService {
    List<CategoryEntity> listarCategorias();
    List<PostEntity> buscarPublicaciones(String search, Long categoryId);
    List<PostEntity> listarTodasAdmin();
    PostEntity crearPublicacion(CreatePostRequest request);
    CommentEntity agregarComentario(Long postId, CreateCommentRequest request);
    PostEntity alternarBaneoPost(Long postId);
    CommentEntity alternarBaneoComentario(Long commentId);
    void eliminarPublicacion(Long postId);
}