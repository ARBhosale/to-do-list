package iQ.learning.todoapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import iQ.learning.todoapp.model.Folder;
import iQ.learning.todoapp.model.Task;
import iQ.learning.todoapp.repository.*;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
public class ToDoAppApplication {

	private static final Logger logger = LoggerFactory.getLogger(ToDoAppApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ToDoAppApplication.class, args);
	}

	@Bean
	public CommandLineRunner setup(FolderRepository folderRepository, TaskRepository taskRepository) {
		return (args) -> {
			Folder rootFolder = folderRepository.save(new Folder("root"));
			taskRepository.save(new Task("t1", "d1", rootFolder.getId()));
			taskRepository.save(new Task("t2", "d2", rootFolder.getId()));
			taskRepository.save(new Task("t3", "d3", rootFolder.getId()));
			logger.info("The sample data has been generated");
		};
	}
}
