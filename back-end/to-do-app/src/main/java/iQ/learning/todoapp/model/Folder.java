package iQ.learning.todoapp.model;

import java.util.List;

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
	Long[] childrenFolderIds;

	public Folder() {
	}

	public Folder(String name) {
		this.name = name;
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

	public Long[] getChildrenFolderIds() {
		return childrenFolderIds;
	}

	public void setChildrenFolderIds(Long[] childrenFolderIds) {
		this.childrenFolderIds = childrenFolderIds;
	}

}
