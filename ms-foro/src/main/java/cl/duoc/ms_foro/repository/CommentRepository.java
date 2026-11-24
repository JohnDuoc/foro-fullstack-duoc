package cl.duoc.ms_foro.repository;

import cl.duoc.ms_foro.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {}