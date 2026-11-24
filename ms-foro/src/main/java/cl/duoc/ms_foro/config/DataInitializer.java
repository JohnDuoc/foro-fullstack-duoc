package cl.duoc.ms_foro.config;

import cl.duoc.ms_foro.entity.CategoryEntity;
import cl.duoc.ms_foro.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    public DataInitializer(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            categoryRepository.saveAll(List.of(
                new CategoryEntity("r/tecnologia", "Desarrollo, hardware y gadgets"),
                new CategoryEntity("r/videojuegos", "Novedades, guías y reseñas"),
                new CategoryEntity("r/ciencia", "Divulgación, descubrimientos y debates"),
                new CategoryEntity("r/cine_y_series", "Estrenos, críticas y recomendaciones"),
                new CategoryEntity("r/educacion", "Cursos, tutoriales y consultas académicas")
            ));
        }
    }
}