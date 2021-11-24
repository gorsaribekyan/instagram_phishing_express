function sendData(){
    document.getElementById("result").innerHTML = "";

    var login = document.getElementById("input-1").value;
    var password = document.getElementById("input-2").value;
    var user = localStorage.getItem('user');

    console.log(login, password, user)
    fetch("/login", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            login, 
            password,
            person:user
        })
    })
    .then((resp) => resp.json())
    .then((data) => atfer_get_data(data))
    //.catch((err) => console.log(err))
}

function atfer_get_data(data) {
    if(data["errors"]){
        var x = ''
        for(let i of data["errors"]){
          x += i["msg"] + "<br>"
        }        
        document.getElementById("result").innerHTML = x;
    }else{
        document.getElementById("result").innerHTML = "OK";
        window.location.replace("/")
    }
    
}