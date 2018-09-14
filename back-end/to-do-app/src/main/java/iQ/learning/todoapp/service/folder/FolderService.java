package iQ.learning.todoapp.service.folder;

import iQ.learning.todoapp.model.Folder;
import iQ.learning.todoapp.model.request.folder.FolderCreateRequest;
import iQ.learning.todoapp.model.request.folder.FolderUpdateRequest;

public interface FolderService {
	Folder createFolder(FolderCreateRequest request);
	Folder updateFolder(FolderUpdateRequest request);
}
