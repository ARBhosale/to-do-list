package iQ.learning.todoapp.service.folder;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import iQ.learning.todoapp.model.Folder;
import iQ.learning.todoapp.model.request.folder.FolderCreateRequest;
import iQ.learning.todoapp.model.request.folder.FolderUpdateRequest;
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

	@Override
	public Folder updateFolder(FolderUpdateRequest request) {
		Optional<Folder> folder = folderRepository.findById(request.getFolderId());
		if (folder.isPresent()) {
			Folder folderToUpdate = folder.get();
			if (null != request.getFolderName()) {
				folderToUpdate.setName(request.getFolderName());
			}
			if (0 != request.getParentFolderId()) {
				folderToUpdate.setParentFolderId(request.getParentFolderId());
			}
			return folderRepository.save(folderToUpdate);
		} else {
			return null;
		}
	}

}
