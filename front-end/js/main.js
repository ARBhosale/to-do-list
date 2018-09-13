var layout;
var mygrid;
var tasks;
doOnLoad = () => {
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
    initializeGrid(layout);

    // Adding a toolbox for adding a To Do or a Folder

    var toDoToolbar = new dhtmlXToolbarObject("toolbarObj");
    toDoToolbar.addButton("addToDo", 1, "Add a To Do", "", ""); // addButton(id,pos,text,imgEnabled,imgDisabled); 
    toDoToolbar.addSeparator("seperator1", 2);
    toDoToolbar.addButton("addFolder", 3, "Add a Folder", "", "");


    // Add To Do Window
    addToDo = layout.cells("d").attachForm();
    addToDo.loadStruct("data/addToDo.xml");
    toDoToolbar.attachEvent("onClick", function (id) {
        if (id === "addToDo") {
            console.log("add to button clicked");
            addToDo = layout.cells("d").attachForm();
            addToDo.loadStruct("data/addToDo.xml");

        } else if (id === "addFolder") {
            addFolder = layout.cells("d").attachForm();
            addFolder.loadStruct("data/addFolder.xml");
        } else if (id === "viewToDos") {

        }
    });

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
                body:JSON.stringify(newData)
            });
            fetch(request)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{ 
                loadAllTasks(mygrid);
            }).catch((error)=>{console.log(error);})

        }
    });

    // Creating a Tree View.
    directoryTreeView = layout.cells("a").attachTreeView({
        json: "data/directory.json",
        iconset: "font_awesome",
        dnd:true
    });


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

function loadAllTasks(grid) {
    var allTasksApiUrl = "http://localhost:8080/task/v1";
    var tasksData = { rows: [] };
    fetch(allTasksApiUrl)
        .then((allTasksResponse) => {
            return allTasksResponse.json();
        })
        .then(function (allTasks) {
            if (allTasks && allTasks.length > 0) {
                allTasks.forEach((task)=>{
                    tasksData.rows.push({
                        id: task.id, 
                        data:[
                            task.name, 
                            task.description
                        ]
                    });
                });
                mygrid.parse(tasksData, "json"); //takes the name and format of the data source
            }
        })
        .catch((error) => { console.error(error); });    
}

function doOnRowSelected(id){
    console.log(id);

}




