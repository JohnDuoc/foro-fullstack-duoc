package cl.duoc.ms_foro.repository;

import cl.duoc.ms_foro.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findByBannedFalseOrderByCreatedAtDesc();
    List<PostEntity> findByTitleContainingIgnoreCaseAndBannedFalse(String title);
    List<PostEntity> findByCategoryIdAndBannedFalse(Long categoryId);
}
