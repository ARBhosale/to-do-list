package iQ.learning.todoapp.model.request.task;

import iQ.learning.todoapp.model.TaskStatus;

public class TaskUpdateRequest {

	Long taskId;
	int updatedStatus;
	Long folderId;

	public Long getFolderId() {
		return folderId;
	}

	public void setFolderId(Long folderId) {
		this.folderId = folderId;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public int getUpdatedStatus() {
		return updatedStatus;
	}

	public void setUpdatedStatus(int updatedStatus) {
		this.updatedStatus = updatedStatus;
	}

	public TaskStatus getTaskStatus(int statusValue) {
		TaskStatus status = null;

		switch (this.updatedStatus) {
		case 0:
			status = TaskStatus.New;
			break;
		case 1:
			status = TaskStatus.Started;
			break;
		case 2:
			status = TaskStatus.Complete;
			break;
		default:
			status = null;
			break;
		}
		return status;
	}

}
