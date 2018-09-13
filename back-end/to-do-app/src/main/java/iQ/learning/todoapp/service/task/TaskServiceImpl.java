package iQ.learning.todoapp.service.task;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import iQ.learning.todoapp.model.Folder;
import iQ.learning.todoapp.model.Task;
import iQ.learning.todoapp.model.TaskStatus;
import iQ.learning.todoapp.model.request.task.TaskCreateRequest;
import iQ.learning.todoapp.model.request.task.TaskUpdateRequest;
import iQ.learning.todoapp.model.response.TasksFolderStructureResponse;
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
		return this.getList(taskRepository.findAll());
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

	@Override
	public TasksFolderStructureResponse getDirectory() {
		List<Task> allTasks = this.getList(taskRepository.findAll());
		List<Folder> allFolders = this.getList(folderRepository.findAll());
		return new TasksFolderStructureResponse(allTasks, allFolders);
	}

	private <T> List<T> getList(Iterable<T> iterable) {
		Iterator<T> iterator = iterable.iterator();
		List<T> allItems = new ArrayList<T>();
		while (iterator.hasNext()) {
			allItems.add(iterator.next());
		}
		return allItems;
	}

}
