package iQ.learning.todoapp.model.request.folder;

public class FolderCreateRequest {

	private String name;
	private Long parentFolderId;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getParentFolderId() {
		return parentFolderId;
	}

	public void setParentFolderId(Long parentFolderId) {
		this.parentFolderId = parentFolderId;
	}

}
