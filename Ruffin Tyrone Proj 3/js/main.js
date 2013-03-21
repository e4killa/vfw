// Tyrone Ruffin
// Project 2
// VFW 1303
// 03-14-2013




window.addEventListener("DOMContentLoaded", function(){


    function $(x){
        var myElement = document.getElementById(x);
        return myElement;
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
        var radio = document.forms[0].location;
        for(var i=0; i<radio.length; i++){
            if(radio[i].checked){
                locationValue = radio[i].value;
            }
        }
    }
    // Also reads as null.
    function checkBox(){
        if($("action" && "sci-fi").checked){
            genreValue = $("action" && "sci-fi").value;
        
        
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
    
    function storeData(key){
        if(!key){
            var id              = Math.floor(Math.random()*10000001);
        }else{
            id = key
        }
         getRadio();
         checkBox();
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
        window.location.reload();


    }
    
    function getData(){
        toggleControl("on");
        if(localStorage.length === 0){
            alert("No Titles Saved");
        }
        var myDiv = document.createElement("div");
        myDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        myDiv.appendChild(makeList);
        document.body.appendChild(myDiv);
        $("items").style.display = "block";
        for(var i = 0, len=localStorage.length; i < len; i++){
            var makeli = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var object = JSON.parse (value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            for(var n in object){
                var mySubli = document.createElement("li");
                makeSubList.appendChild(mySubli);
                var mySubText = object[n][0] + " " + object[n][1];
                mySubli.innerHTML = mySubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }
    
    function makeItemLinks(key, linksLi){
     var editLink = document.createElement("a");
     editLink.href = "#";
     editLink.key = key;
     var editText = "Edit Movie";
     editLink.addEventListener("click", editItem);
     editLink.innerHTML = editText;
     linksLi.appendChild(editLink);
     
     var deleteLink = document.createElement("a");
     deleteLink.href = "#";
     deleteLink.key = key;
     var deleteText = "Delete Movie";
     deleteLink.addEventListener("click", deleteItem);
     deleteLink.innerHTML = deleteText;
     linksLi.appendChild(deleteLink);
    }
    
    function editItem(){
       var value = localStorage.getItem(this.key);
       var item = JSON.parse(value);
       
       toggleControl("off");
       $("groups").value = item.group[1];
       $("username").value = item.username[1];
       $("password").value = item.password[1];
       $("title").value = item.title[1];
       $("comments").value = item.comment[1];
       var radio = document.forms[0].location;
       for(var i=0; i<radio.length; i++){
           if(radio.value == "Movie Theatre" && item.sex[1] == "Movie Theatre"){
              radio[i].setAttribute("checked", "checked");
           }else if(radio[i].value == "Home Movie" && item.location[1] == "Home Movie"){
                radio[i].setAttribute("checked", "checked");
           }
       }
       if(item.genre[1] == "Action"){
            $("genre").setAttribute("checked", "checked");
       }
       $("rating").value = item.rating[1];
       $("movielength").value = item.length[1];
       
       save.removeEventListener("click", storeData);
       $("save").value = "Edit Movie";
       var editSave = $("save");
       editSave.addEventListener("click", validate);
       editSave.key = this.key;
       
       
    }
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this movie?");
        if(ask){
            alert("Movie Deleted")
            localStorage.removeItem(this.key);
            window.location.reload();

        }else{
            alert("Movie was not deleted.");
        }
    }
    
    function clearLocalStor(){
        if(localStorage.length === 0){
            alert("No Movie Titles Found.")
        }else{
            localStorage.clear();
            alert("All Titles deleted")
            window.location.reload();
            return false;
        }
    }
   
   function validate(e){
        var getGroup = $("groups");
        var getUserName = $("username");
        var getPassword = $("password");
        var getTitle = $("title");
        errMsg.innerHTML = "";
        getGroup.style.border = "1px solid black";
        getUserName.style.border = "1px solid black";
        getPassword.style.border = "1px solid black";
        getTitle.style.border = "1px solid black";

        var messageArray = [];
        if(getGroup.value ==="--Which are you?--"){
            var groupError = "Choose a group";
            getGroup.style.border = "1px solid red";
            messageArray.push(groupError);
        }
        
        if(getUserName.value === ""){
            var userNameError = "Enter username"
            getUserName.style.border = "1px solid red";
            messageArray.push(userNameError);
        }
        if(getPassword.value === ""){
            var passwordError = "Enter password"
            getPassword.style.border = "1px solid red";
            messageArray.push(passwordError);
        }
        if(getTitle.value === ""){
            var titleError = "Enter movie title"
            getTitle.style.border = "1px solid red";
            messageArray.push(titleError);
        }
        
        if(messageArray.length >= 1){
           for(var i=0, j=messageArray.length; i<j; i++){
            var text = document.createElement("li");
            text.innerHTML = messageArray[i];
            errMsg.appendChild(text);
             }
            e.preventDefualt();
            return false;   
        }else{
            storeData(this.key);
            window.location.reload();

        }
        
   }
    
    

    var userInfo = ["--Which are you?--", "Administrator", "Guest"],
        locationValue ,genreValue, errMsg = $("errors");
        
    makeCats();
   


    
    var linkClear = $('clear');
    linkClear.addEventListener("click", clearLocalStor);
    var save = $('save');
    save.addEventListener("click", validate);
    var showLink = $('show');
    showLink.addEventListener("click", getData);



});









