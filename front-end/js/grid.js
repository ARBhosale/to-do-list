function initializeGrid(incomingLayout) {
    layout = incomingLayout;
    mygrid = new dhtmlXGridObject('gridbox');
    //the path to images required by grid 
    mygrid.setImagePath("./codebase/imgs/");
    mygrid.setHeader("Name,Description,Status");//the headers of columns  
    mygrid.setInitWidths("100,400,100");          //the widths of columns  
    mygrid.setColAlign("center,center,center");
    mygrid.attachEvent("onRowSelect",doOnRowSelected);       //the alignment of columns   
    mygrid.setColTypes("ro,ed,ed");                //the types of columns  
    
    mygrid.init();//finishes initialization and renders the grid on the page 
    loadAllTasks();

}   

function loadAllTasks(){
    var tasksData = { rows: [] };
    var allTasks=directory.allTasks;
    console.log(allTasks);
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
    mygrid.clearAll();
    mygrid.parse(tasksData, "json");
   
}

function doOnRowSelected(id){
    var allTasks= directory.allTasks;
    var selectedTask = allTasks.filter(task => task.id == id);
    editToDo = layout.cells("d").attachForm();
    formData = [
        {type:"fieldset", name:"data", label:"Edit To Do", inputWidth:"auto", 
         list:[
            {type:"input",offsetLeft:"15",    name:'editToDo', label:'Name', value: `${selectedTask[0].name}`},
            {type:"input",offsetLeft:"15", name:"editToDoDescription", label:"Description", value: `${selectedTask[0].description}`},
            {type:"input",offsetLeft:"15", name:"editToDoStatus", label:"Status", readonly:true, value: `${selectedTask[0].status}`},
            {type:"input",offsetLeft:"15",    name:'toDoId', label:'Task Id',readonly:true, value: `${selectedTask[0].id}`},            
            {type:"button",   name:"startTask", value:"Start"},
            {type:"button",   name:"completeTask", value:"Complete"}] 
        }
    ];
    editToDo.loadStruct(formData);
    updateStatus(editToDo);
}

function updateStatus(editToDoForm){
    editToDoForm.attachEvent("onButtonClick", function(name, command){
        if(name=="startTask"){
            var values = editToDoForm.getFormData();
            var updateData = {
                "taskId": values.toDoId,
                "updatedStatus":1
            }
            updateDataFromBackend(updateData);

        }else if(name=="completeTask"){
            var values = editToDoForm.getFormData();
            var updateData = {
                "taskId": values.toDoId,
                "updatedStatus":2
            }
            updateDataFromBackend(updateData);
        }
    });
}

function updateDataFromBackend(updateData){
    var updateTask = "http://localhost:8080/task/v1";
    var request = new Request(updateTask, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    });
    fetch(request)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        var currentTasks =directory.allTasks;
        currentTasks.forEach((task)=>{
            if(task.id == data.id){
                task.status = data.status;
            }
        });
        directory.allTasks = currentTasks;
        // directory.allTasks.push(data);
        loadAllTasks();
    }).catch((error)=>{console.log(error);})
}
