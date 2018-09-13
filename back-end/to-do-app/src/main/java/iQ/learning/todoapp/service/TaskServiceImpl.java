package iQ.learning.todoapp.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import iQ.learning.todoapp.model.Task;
import iQ.learning.todoapp.model.TaskStatus;
import iQ.learning.todoapp.model.request.task.TaskCreateRequest;
import iQ.learning.todoapp.model.request.task.TaskUpdateRequest;
import iQ.learning.todoapp.repository.*;

@Service("taskService")
public class TaskServiceImpl implements TaskService {

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	FolderRepository folderRepository;

	@Autowired
	ConversionService conversionService;

	@Override
	public Optional<Task> getTaskById(long id) {
		return taskRepository.findById(id);
	}

	@Override
	public List<Task> getAllTasks() {
		Iterator<Task> iterator = taskRepository.findAll().iterator();
		List<Task> allTasks = new ArrayList<Task>();
		while (iterator.hasNext()) {
			allTasks.add(iterator.next());
		}
		return allTasks;
	}

	@Override
	public Task createTask(TaskCreateRequest request) {
		Task task = conversionService.convert(request, Task.class);
		task.setStatus(TaskStatus.New);
		taskRepository.save(task);
		return task;
	}

	@Override
	public Task updateTask(TaskUpdateRequest request) {
		Optional<Task> task = taskRepository.findById(request.getTaskId());
		if (task.isPresent()) {
			Task taskToUpdate = task.get();
			taskToUpdate.setStatus(request.getTaskStatus(request.getUpdatedStatus()));
			Long folderId = request.getFolderId();
			if (null != folderId) {
				taskToUpdate.setFolderId(folderId);
			}

			return taskRepository.save(task.get());
		} else {
			return null;
		}
	}

}
