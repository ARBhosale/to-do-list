package iQ.learning.todoapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import iQ.learning.todoapp.model.Task;

@Repository("taskRepository")
public interface TaskRepository extends CrudRepository<Task, Long> {

}
