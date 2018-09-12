package iQ.learning.todoapp.config;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableJpaRepositories("iQ.learning.todoapp.repository")
@EnableTransactionManagement
public class DatabaseConfig {

}

