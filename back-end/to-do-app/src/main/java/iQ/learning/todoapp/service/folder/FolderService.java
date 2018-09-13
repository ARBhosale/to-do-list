package iQ.learning.todoapp.service.folder;

import iQ.learning.todoapp.model.Folder;
import iQ.learning.todoapp.model.request.folder.FolderCreateRequest;

public interface FolderService {
	Folder createFolder(FolderCreateRequest request);
}
