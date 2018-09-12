package iQ.learning.todoapp.model.converter;

import org.springframework.core.convert.converter.Converter;

import iQ.learning.todoapp.model.Task;
import iQ.learning.todoapp.model.request.TaskCreateRequest;

public class TaskRequestToEntityConverter implements Converter<TaskCreateRequest, Task>{

	@Override
	public Task convert(TaskCreateRequest source) {
		Task newTask = new Task();
		newTask.setName(source.getName());
		newTask.setDescription(source.getDescription());
		return newTask;
	}

}
