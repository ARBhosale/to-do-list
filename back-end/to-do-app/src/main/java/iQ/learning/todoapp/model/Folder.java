package iQ.learning.todoapp.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.persistence.GeneratedValue;

@Entity
@Table(name = "Folder")
public class Folder {

	@Id
	@GeneratedValue
	private Long id;
	@NotNull
	private String name;
	Long parentFolderId;

	public Folder() {
	}

	public Folder(String name) {
		this.name = name;
	}

	public Folder(String name, Long parentFolderId) {
		this.name = name;
		this.parentFolderId = parentFolderId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public Long getParentFolderId() {
		return parentFolderId;
	}

	public void setParentFolderId(Long parentFolderId) {
		this.parentFolderId = parentFolderId;
	}

}
