package iQ.learning.todoapp.model.response;

import java.util.List;

import iQ.learning.todoapp.model.Folder;
import iQ.learning.todoapp.model.Task;

public class TasksFolderStructureResponse {
	private List<Task> allTasks;
	private List<Folder> allFolders;

	public TasksFolderStructureResponse(List<Task> allTasks, List<Folder> allFolders) {
		this.allTasks = allTasks;
		this.allFolders = allFolders;
	}

	public List<Task> getAllTasks() {
		return allTasks;
	}

	public void setAllTasks(List<Task> allTasks) {
		this.allTasks = allTasks;
	}

	public List<Folder> getAllFolders() {
		return allFolders;
	}

	public void setAllFolders(List<Folder> allFolders) {
		this.allFolders = allFolders;
	}

}
