// Tyrone Ruffin
// Project 2
// VFW 1303
// 03-14-2013




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
    // Reads as null, what im I doing wrong?
    function getRadio() {
        var radios = document.forms[0].location
        for(var i=0; i<radios.length; i++){
            if(radios[i].checked){
                locationValue = radios[i].value;
            }
        }
    }
    // Also reads as null.
    function checkBox(){
        if($("action").checked){
            genreValue = $("action").value;
        }else{
            genreValue = "Not Action"
        
        }
    }
    
    function toggleControl(n){
        switch(n){
            case "on":
                $("contactForm").style.display = "none";
                $("clear").style.display = "inline";
                $("show").style.display = "none"
                $("addNew").style.display = "inline";
                break;
            case "off":
                $("contactForm").style.display = "block";
                $("clear").style.display = "inline";
                $("show").display = "inline"
                $("addNew").style.display = "none";
                $("items").style.display = "none";
                break;
            default:
                
        }
        
    };
    
    function storeData(){
        var id              = Math.floor(Math.random()*10000001);
        var item            = {};
            item.group      = ["Group", $("groups").value];
            item.username   = ["Username", $("username").value];
            item.password   = ["Password", $("password").value];
            item.title      = ["Movie Title", $("title").value];
            item.genre      = ["Genre", genreValue ];
            item.comment    = ["Comments", $("comments").value];
            item.location   = ["Location", locationValue];
            item.rating     = ["Rating", $("rating").value];
            item.length     = ["Movie Length", $("movielength").value];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Title Saved");
    }
    
    function getData(){
        toggleControl("on");
        if(localStorage.length === 0){
            alert("No Titles Saved");
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $("items").style.display = "block";
        for(var i = 0, len=localStorage.length; i < len; i++){
            var makeli = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var object = JSON.parse (value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            for(var n in object){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = object[n][0] + " " + object[n][1];
                makeSubli.innerHTML = optSubText;
            }
        }
    }
    
    function clearLocal(){
        if(localStorage.length === 0){
            alert("No Movie Titles Found.")
        }else{
            localStorage.clear();
            alert("All Titles deleted")
            window.location.reload();
            return false;
        }
    }
   
    
    

    var userInfo = ["--Which are you?--", "Administrator", "Guest"],
        locationValue ,genreValue;
        
    makeCats();
    



    
    var clearLink = $('clear');
    clearLink.addEventListener("click", clearLocal);
    var save = $('save');
    save.addEventListener("click", storeData);
    var displayLink = $('show');
    displayLink.addEventListener("click", getData);



});









