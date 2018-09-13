package iQ.learning.todoapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Task")
public class Task {

	public Task() {
	}

	public Task(@NotNull String name, String description) {
		this.name = name;
		this.description = description;
		this.status = TaskStatus.New;
	}

	public Task(@NotNull String name, String description, Long folderId) {
		this.name = name;
		this.description = description;
		this.status = TaskStatus.New;
		this.folderId = folderId;
	}

	@Id
	@GeneratedValue
	private Long id;
	@NotNull
	private String name;
	private String description;
	private TaskStatus status;
	private Long folderId;

	public TaskStatus getStatus() {
		return status;
	}

	public void setStatus(TaskStatus status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getFolderId() {
		return folderId;
	}

	public void setFolderId(Long folderId) {
		this.folderId = folderId;
	}

	public Long getId() {
		return id;
	}

}
