package iQ.learning.todoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import iQ.learning.todoapp.model.Task;
import iQ.learning.todoapp.model.request.task.TaskCreateRequest;
import iQ.learning.todoapp.model.request.task.TaskUpdateRequest;
import iQ.learning.todoapp.model.response.TasksFolderStructureResponse;
import iQ.learning.todoapp.service.TaskService;

@CrossOrigin(origins = "http://localhost:8888")
@RestController
@RequestMapping(path = Constants.TASKS_V1)
public class TaskController {

	@Autowired
	TaskService taskService;

	@RequestMapping(path = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Task> getTasks() {
		return taskService.getAllTasks();
	}

	@RequestMapping(path = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Task> createTask(@RequestBody TaskCreateRequest createRequest) {
		Task newTask = taskService.createTask(createRequest);
		return new ResponseEntity<>(newTask, HttpStatus.CREATED);
	}

	@RequestMapping(path = "", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<Task> updateStatus(@RequestBody TaskUpdateRequest updateRequest) {
		Task newTask = taskService.updateTask(updateRequest);
		if (null == newTask) {
			return new ResponseEntity<>(newTask, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(newTask, HttpStatus.CREATED);
	}

	@RequestMapping(path = "/directory", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<TasksFolderStructureResponse> getDirectory() {
		return new ResponseEntity<>(taskService.getDirectory(), HttpStatus.CREATED);
	}

}
