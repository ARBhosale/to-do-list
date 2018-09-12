package iQ.learning.todoapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import iQ.learning.todoapp.model.Folder;

@Repository("folderRepository")
public interface FolderRepository extends CrudRepository<Folder, Long> {

}
