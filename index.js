async function showList(){
    let url = 'http://localhost:3000/todolist'
    try {
        let data = await getData(url);
    } catch (error) {
        console.log(error)
    }
}
async function getData(url){
    try {
        let res =await fetch(url);
        let data = await res.json();
        display(data);
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
showList();
function display(data){
    data.forEach(ele => {
        let title = document.createElement("div")
        title.innerText = ele.title;
        title.addEventListener("click" , function(){
            localStorage.setItem("selectedTitle" ,JSON.stringify(ele))
            window.location.href = "edit.html"
        })
        if(ele.status == "false"){
            title.style.color = "red";
        }
        else{
            console.log(ele.status)
            title.style.color = "green";
        }

        document.getElementById("showList").append(title)
    });
}

async function addList(){
   try{
       let title = document.getElementById("title").value;
       let status = document.getElementById("status").value;
    //    console.log(title,status);
    let body = {
        title,
        status
    }
    let res = await fetch(`http://localhost:3000/todolist`,{
        method: "POST",
        body: JSON.stringify(body),
        headers :{
            "Content-Type" : "application/json"
        }
    });
    showList();
   }
    catch (error) {
        console.log(error)
    }
}