var layout;
var mygrid;
var directory;
doOnLoad = () => {
    fetchAllData();
    // Creating a layout 
    layout = new dhtmlXLayoutObject({
        parent: document.getElementById("layoutObj"),
        pattern: "4C",
        offsets: {          // optional, offsets for fullscreen init
            top: 10,     // you can specify all four sides
            right: 10,     // or only the side where you want to have an offset
            bottom: 10,
            left: 10
        },
        cells: [
            {
                id: "a",
                text: "Main Directory",
                collapsed_text: "View Directories",
                header: true,
                width: 400,        // cell init width
                height: 100,        // cell init height
                collapse: false,        // collapse on init
                fix_size: [null, null] // fix cell's size, [width,height]
            }, {
                id: "b",
                text: "",
                collapsed_text: "Toolbar",
                header: false,
                height: 30,
                collapse: false,        // collapse on init
                fix_size: [null, true] // fix cell's size, [width,height]
            },
            {
                id: "c",
                text: "To Do List",
                collapsed_text: "View To Do Lists",
                header: true,
                collapse: false,        // collapse on init
                fix_size: [null, null]
            }, {
                id: "d",
                text: "",
                collapsed_text: "",
                header: false,
                collapse: false,
                height: 300
            }
        ]
    });


    layout.cells("a").attachObject("mainDirectory");
    layout.cells("b").attachObject("toDoList");
    layout.cells("c").attachObject("gridbox");
    var toDoToolbar = new dhtmlXToolbarObject("toolbarObj");
    toDoToolbar.addButton("addToDo", 1, "Add a To Do", "", ""); // addButton(id,pos,text,imgEnabled,imgDisabled); 
    toDoToolbar.addSeparator("seperator1", 2);
    toDoToolbar.addButton("addFolder", 3, "Add a Folder", "", "");

    // Add To Do Window
    var addToDo = layout.cells("d").attachForm();
    addToDo.loadStruct("data/addToDo.xml");
    showToDoForm(addToDo)
    toDoToolbar.attachEvent("onClick", function (id) {
        if (id === "addToDo") {
            console.log("add to button clicked");
            addToDo = layout.cells("d").attachForm();
            addToDo.loadStruct("data/addToDo.xml");
            showToDoForm(addToDo)

        } else if (id === "addFolder") {
            addFolder = layout.cells("d").attachForm();
            addFolder.loadStruct("data/addFolder.xml");
        } else if (id === "viewToDos") {

        }
    });

    
    // Creating a Tree View.
    directoryTreeView = layout.cells("a").attachTreeView({
        json: "data/directory.json",
        iconset: "font_awesome",
        dnd:true
    });


};

function fetchAllData(){
    var allTasksApiUrl = "http://localhost:8080/task/v1/directory";
    fetch(allTasksApiUrl)
        .then((allDataResponse) => {
            return allDataResponse.json();
        })
        .then((allData)=>{
            directory = allData;
            console.log("All the data is loaded from the server");
            initializeGrid(layout);
            
        }).catch((error)=>console.log(error))
        
        
}

function initializeGrid(layout) {
    mygrid = new dhtmlXGridObject('gridbox');
    //the path to images required by grid 
    mygrid.setImagePath("./codebase/imgs/");
    mygrid.setHeader("Name,Description,Status");//the headers of columns  
    mygrid.setInitWidths("100,400,100");          //the widths of columns  
    mygrid.setColAlign("center,center,center");
    mygrid.attachEvent("onRowSelect",doOnRowSelected);       //the alignment of columns   
    mygrid.setColTypes("ro,ed,ed");                //the types of columns  
    
    mygrid.init();//finishes initialization and renders the grid on the page 
    loadAllTasks(mygrid);

}   

function loadAllTasks(grid) {
    var tasksData = { rows: [] };
    var allTasks=directory.allTasks;
    allTasks.forEach((task)=>{
        tasksData.rows.push({
            id: task.id, 
            data:[
                task.name, 
                task.description,
                task.status
            ]
        });
    });
    mygrid.parse(tasksData, "json");
   
}

function doOnRowSelected(id){
    var allTasks= directory.allTasks;
    var selectedTask = allTasks.filter(task => task.id == id);
    console.log(selectedTask);
    // layout.cells("d").detachForm();
    editToDo = layout.cells("d").attachForm();
    formData = [
        {type:"fieldset", name:"data", label:"Edit To Do", inputWidth:"auto", 
         list:[
            {type:"input",offsetLeft:"15",    name:'editToDo', label:'Name', value: `${selectedTask[0].name}`},
            {type:"input",offsetLeft:"15", name:"editToDoDescription", label:"Description", value: `${selectedTask[0].description}`},
            {type:"input",offsetLeft:"15", name:"editToDoStatus", label:"Status", readonly:true, value: `${selectedTask[0].status}`},
            {type:"button",   name:"completeTask", value:"Complete"},
            {type:"button",   name:"deleteTask", value:"Delete"}] 
        }
    ];
    console.log()
    editToDo.loadStruct(formData);

}


function showToDoForm(addToDo){
    addToDo.attachEvent("onButtonClick", function(name, command){
        if(name=="addToDoBtn"){
            var values = addToDo.getFormData();
            console.log(values);
            var newData;
            newData = {
                "name": values.newToDo,
                "description": values.toDoDescription
            }
            var addTask = "http://localhost:8080/task/v1";
            var request = new Request(addTask, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });
            fetch(request)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                console.log(data);
                directory.allTasks.push(data);
                console.log(directory);
                loadAllTasks(mygrid);
            }).catch((error)=>{console.log(error);})

        }
    });

    // Creating a Tree View.
    loadDirectory(layout);

};

function initializeGrid(layout) {
    mygrid = new dhtmlXGridObject('gridbox');
    //the path to images required by grid 
    mygrid.setImagePath("./codebase/imgs/");
    mygrid.setHeader("Name,Description");//the headers of columns  
    mygrid.setInitWidths("100,450");          //the widths of columns  
    mygrid.setColAlign("center,center");
    mygrid.attachEvent("onRowSelect",doOnRowSelected);       //the alignment of columns   
    mygrid.setColTypes("ro,ed");                //the types of columns  
    mygrid.init();      //finishes initialization and renders the grid on the page 
    loadAllTasks(mygrid);
}

const TASKS_API_URL = "http://localhost:8080/task/v1";
const DIRECTORY_URL = TASKS_API_URL + '/directory';

function loadAllTasks(grid) {
    var allTasksApiUrl = TASKS_API_URL;
    var tasksData = { rows: [] };
    fetch(allTasksApiUrl)
        .then((allTasksResponse) => {
            return allTasksResponse.json();
        })
        .then(function (allTasks) {
            if (allTasks && allTasks.length > 0) {
                allTasks.forEach((task) => {
                    tasksData.rows.push({ id: task.id, data: [task.name, task.description, task.status] });
                });
                mygrid.parse(tasksData, "json"); //takes the name and format of the data source
            }
        })
        .catch((error) => { console.error(error); });
}

function loadDirectory(layout) {
    var directoryApiUrl = DIRECTORY_URL;



    fetch(directoryApiUrl)
        .then((directoryResponse) => { return directoryResponse.json(); })
        .then((directory) => {
            console.log(directory);

            let constructedDirectory = constructDirectory(directory);
            directoryTreeView = layout.cells("a").attachTreeView({
                items: constructedDirectory,
                iconset: "font_awesome",
                dnd: true
            });
        })
        .catch((error) => { console.error(error); });

}

function constructDirectory(directoryData) {
    let directory = [];
    let folderMap = getFolderMap(directoryData);
    addTasksToFolders(folderMap, directoryData.allTasks);

    let rootFolder = getRootFolder(directoryData);
    if (folderMap.has(rootFolder.id)) {
        return [getDirectoryItemFromFolder(folderMap, rootFolder.id)];
    } else {
        return [];
    }

}

function getRootFolder(directoryData) {
    if (!directoryData || !directoryData.allFolders) {
        return null;
    }
    let allFolders = directoryData.allFolders;
    for (let i = 0; i < allFolders.length; i++) {
        if (allFolders[i].parentFolderId == null) {
            return allFolders[i];
        }
    }
    return null;
}

function getFolderMap(directoryData) {
    let folderMap = new Map();
    if (!directoryData || !directoryData.allFolders) {
        return folderMap;
    }
    let allFolders = directoryData.allFolders;
    for (let i = 0; i < allFolders.length; i++) {
        let folder = allFolders[i];

        if (!folderMap.has(folder.id)) {
            folderMap.set(folder.id, { folder: folder, children: [] });
        }

        let parentFolderId = folder.parentFolderId;

        if (null != parentFolderId) {
            if (folderMap.has(parentFolderId)) {
                let childrenElements = folderMap.get(parentFolderId).children;
                childrenElements.push(folder);
            }
        }

    }
    return folderMap;
}

function addTasksToFolders(folderMap, allTasks) {
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        if (folderMap.has(task.folderId)) {
            let childrenElements = folderMap.get(task.folderId).children;
            childrenElements.push(task);
        }
    }
}

function getDirectoryItemFromFolder(folderMap, folderId) {
    if (!folderMap.has(folderId)) {
        return null;
    }
    let folderData = folderMap.get(folderId);

    let item = {
        id: 'f' + folderData.folder.id,
        text: folderData.folder.name,
        kids: true,
        open: folderData.folder.parentFolderId == null ? 1 : 0,
        items: getDirectoryItems(folderMap, folderData)
    }
    return item;
}

function getDirectoryItemFromTask(task) {
    let item = {
        id: 't' + task.id,
        text: task.name,
        kids: false,
        open: 1
    };
    return item;
}

function getDirectoryItems(folderMap, folderData) {
    let items = [];
    for (let i = 0; i < folderData.children.length; i++) {
        let item = folderData.children[i];
        let directoryItem;
        if (isFolder(item)) {
            directoryItem = getDirectoryItemFromFolder(folderMap, item.id);
        } else {
            directoryItem = getDirectoryItemFromTask(item);
        }
        items.push(directoryItem);
    }
    return items;
}

function isFolder(item) {
    // folders have the field parentFolderId
    return item.parentFolderId != undefined;
}
