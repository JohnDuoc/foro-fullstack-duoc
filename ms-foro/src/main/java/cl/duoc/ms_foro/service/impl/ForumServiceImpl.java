package cl.duoc.ms_foro.service.impl;

import cl.duoc.ms_foro.dto.CreateCommentRequest;
import cl.duoc.ms_foro.dto.CreatePostRequest;
import cl.duoc.ms_foro.entity.CategoryEntity;
import cl.duoc.ms_foro.entity.CommentEntity;
import cl.duoc.ms_foro.entity.PostEntity;
import cl.duoc.ms_foro.repository.CategoryRepository;
import cl.duoc.ms_foro.repository.CommentRepository;
import cl.duoc.ms_foro.repository.PostRepository;
import cl.duoc.ms_foro.service.ForumService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ForumServiceImpl implements ForumService {

    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public ForumServiceImpl(CategoryRepository categoryRepository,
                            PostRepository postRepository,
                            CommentRepository commentRepository) {
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public List<CategoryEntity> listarCategorias() {
        return categoryRepository.findAll();
    }

    @Override
    public List<PostEntity> buscarPublicaciones(String search, Long categoryId) {
        if (search != null && !search.isBlank()) {
            return postRepository.findByTitleContainingIgnoreCaseAndBannedFalse(search);
        }
        if (categoryId != null) {
            return postRepository.findByCategoryIdAndBannedFalse(categoryId);
        }
        return postRepository.findByBannedFalseOrderByCreatedAtDesc();
    }

    @Override
    public List<PostEntity> listarTodasAdmin() {
        return postRepository.findAll();
    }

    @Override
    public PostEntity crearPublicacion(CreatePostRequest request) {
        CategoryEntity category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Categoría no encontrada"));

        PostEntity post = new PostEntity();
        post.setTitle(request.title());
        post.setContent(request.content());
        post.setAuthorUsername(request.authorUsername());
        post.setCategory(category);
        return postRepository.save(post);
    }

    @Override
    public CommentEntity agregarComentario(Long postId, CreateCommentRequest request) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Publicación no encontrada"));

        CommentEntity comment = new CommentEntity();
        comment.setContent(request.content());
        comment.setAuthorUsername(request.authorUsername());
        comment.setPost(post);
        return commentRepository.save(comment);
    }

    @Override
    public PostEntity alternarBaneoPost(Long postId) {
        PostEntity post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Publicación no encontrada"));
        post.setBanned(!post.isBanned());
        return postRepository.save(post);
    }

    @Override
    public CommentEntity alternarBaneoComentario(Long commentId) {
        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comentario no encontrado"));
        comment.setBanned(!comment.isBanned());
        return commentRepository.save(comment);
    }

    @Override
    public void eliminarPublicacion(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new IllegalArgumentException("Publicación no encontrada");
        }
        postRepository.deleteById(postId);
    }
}