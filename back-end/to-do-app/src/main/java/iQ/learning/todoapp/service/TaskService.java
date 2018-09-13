package iQ.learning.todoapp.service;

import java.util.List;
import java.util.Optional;

import iQ.learning.todoapp.model.Task;
import iQ.learning.todoapp.model.request.task.TaskCreateRequest;
import iQ.learning.todoapp.model.request.task.TaskUpdateRequest;
import iQ.learning.todoapp.model.response.TasksFolderStructureResponse;

public interface TaskService {
	Optional<Task> getTaskById(long id);

	List<Task> getAllTasks();
	
	Task createTask(TaskCreateRequest request);
	
	Task updateTask(TaskUpdateRequest request);
	
	TasksFolderStructureResponse getDirectory();
}
