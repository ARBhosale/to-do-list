package iQ.learning.todoapp.service;

import java.util.List;
import java.util.Optional;

import iQ.learning.todoapp.model.Task;
import iQ.learning.todoapp.model.request.TaskCreateRequest;
import iQ.learning.todoapp.model.request.TaskUpdateRequest;

public interface TaskService {
	Optional<Task> getTaskById(long id);

	List<Task> getAllTasks();
	
	Task createTask(TaskCreateRequest request);
	
	Task setTaskStatus(TaskUpdateRequest request);
}
