dhtmlxEvent(window,"load",function(){ 
    
    var layout = new dhtmlXLayoutObject({
        parent: document.body,
        pattern: "2U",
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
                text: "To Do List",
                collapsed_text: "View To Do Lists",
                header: true,

                collapse:false,        // collapse on init
                fix_size: [null,null] // fix cell's size, [width,height]
            }
        ]
    }); 
});