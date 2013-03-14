





window.addEventListener("DOMContentLoaded", function(){


    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }

    function makeCats(){
       var formTag = document.getElementsByTagName("form"); 
       var selectLi = $("select"),
           makeSelect = document.createElement("select");
           makeSelect.setAttribute("id", "groups");
       for(var i=0, j=userInfo.length; i<j; i++){
           var makeOption = document.createElement("option");
           var optText = userInfo[i];
           makeOption.setAttribute("value", optText);
           makeOption.innerHTML = optText;
           makeSelect.appendChild(makeOption);
        }  
          selectLi.appendChild(makeSelect);
       
    }
    
    function storeData(){
        var id              = Math.floor(Math.random()*10000001);
        var item            = {};
            item.group      = ["Group", $("groups").value];
            item.username   = ["Username", $("username").value];
            item.password   = ["Password", $("password").value];
            item.title      = ["Movie Title", $("title").value];
          /*  item.genre      = ["Genre", genreValue ];*/
            item.comment    = ["Comments", $("comments").value];
         /*   item.location   = ["Location", locationValue];*/
            item.rating     = ["Rating", $("rating").value];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Title Saved");
    }

    var userInfo = ["--Which are you?--", "Administrator", "Guest"];
    makeCats();
    


/*
    var show = $('show');
    show.addEventListener("click", getData);
    var clearLink = $('clear');
    clearLink.addEventListener("click", clearLocal);*/
    var save = $('save');
    save.addEventListener("click", storeData);




});









