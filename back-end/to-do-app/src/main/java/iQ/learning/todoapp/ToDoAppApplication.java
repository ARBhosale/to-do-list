package iQ.learning.todoapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

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
	public CommandLineRunner setup(TaskRepository taskRepository) {
		return (args) -> {
			taskRepository.save(new Task("t1", "d1"));
			taskRepository.save(new Task("t2", "d2"));
			taskRepository.save(new Task("t3", "d3"));
			logger.info("The sample data has been generated");
		};
	}
}
