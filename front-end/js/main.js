var layout;
doOnLoad = () => { 
  // Creating a layout 
  layout  = new dhtmlXLayoutObject({
        parent: document.getElementById("layoutObj"),
        pattern: "4C",
        offsets: {          // optional, offsets for fullscreen init
            top:    10,     // you can specify all four sides
            right:  10,     // or only the side where you want to have an offset
            bottom: 10,
            left:   10
        },
        cells: [
            {
                id: "a",
                text: "Main Directory",
                collapsed_text: "View Directories",
                header: true,
                width: 400,        // cell init width
                height:100,        // cell init height
                collapse:false,        // collapse on init
                fix_size: [null,null] // fix cell's size, [width,height]
            },{
                id: "b",
                text: "",
                collapsed_text: "Toolbar",
                header: false,
                height:30,
                collapse:false,        // collapse on init
                fix_size: [null,true] // fix cell's size, [width,height]
            },
            {
                id: "c",
                text: "To Do List",
                collapsed_text: "View To Do Lists",
                header: true,
                collapse:false,        // collapse on init
                fix_size: [null,null]
            },{
                id:"d",
                text:"",
                collapsed_text: "",
                header: false,
                collapse:false,
                height:300
            }
        ]
    });
    
    
    layout.cells("a").attachObject("mainDirectory");
    layout.cells("b").attachObject("toDoList");   


    // Adding a toolbox for adding a To Do or a Folder

    var toDoToolbar = new dhtmlXToolbarObject("toolbarObj");
    toDoToolbar.addButton("addToDo", 1, "Add a To Do","",""); // addButton(id,pos,text,imgEnabled,imgDisabled); 
    toDoToolbar.addSeparator("seperator1", 2);
    toDoToolbar.addButton("addFolder", 3, "Add a Folder","","");
    

    // Add To Do Window
    addToDo = layout.cells("d").attachForm();
    addToDo.loadStruct("data/addToDo.xml");
    toDoToolbar.attachEvent("onClick", function(id) {
        if(id === "addToDo"){
            console.log("add to button clicked");
            addToDo = layout.cells("d").attachForm();
            addToDo.loadStruct("data/addToDo.xml");
            
        }else if(id === "addFolder"){
            addFolder = layout.cells("d").attachForm();
            addFolder.loadStruct("data/addFolder.xml");
        }else if(id === "viewToDos"){

        }
    });


};



