package iQ.learning.todoapp.service.folder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iQ.learning.todoapp.model.Folder;
import iQ.learning.todoapp.model.request.folder.FolderCreateRequest;
import iQ.learning.todoapp.repository.FolderRepository;

@Service("folderService")
public class FolderServiceImpl implements FolderService {
	
	@Autowired
	FolderRepository folderRepository;

	@Override
	public Folder createFolder(FolderCreateRequest request) {
		Long newFolderParentId = request.getParentFolderId();
		newFolderParentId = newFolderParentId == null ? 1 : newFolderParentId;
		Folder newFolder = new Folder(request.getName(), newFolderParentId);
		return folderRepository.save(newFolder);
	}

}
