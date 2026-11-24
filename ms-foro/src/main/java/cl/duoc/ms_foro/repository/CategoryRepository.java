package cl.duoc.ms_foro.repository;

import cl.duoc.ms_foro.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {}