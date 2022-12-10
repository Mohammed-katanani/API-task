////////////////////  INFLAT ELEMENTS  //////////////////////////
let containerCard = document.getElementById("containerCard"),
    addBtn = document.getElementById('addBtn'),
    addForm =document.querySelector('.addForm'),
    add =document.querySelector('.true'),
    cansle =document.querySelector('.false'),
    title=document.getElementById('newTitle'),
    contint=document.getElementById('contint');


////////////////////  AJAX  /////////////////////////
const getData=(link)=>{
    return new Promise((resolve,reject)=>{
        let myRequest = new XMLHttpRequest();
        myRequest.onload = ()=>{
            if(myRequest.readyState===4&&myRequest.status==200){
                resolve(JSON.parse(myRequest.responseText))
            }else reject(Error("No Data Found"))
        }
        myRequest.open("GET",link)
        myRequest.send();
    })
}    
getData("https://jsonplaceholder.typicode.com/posts")
.then(json =>json.forEach(el=>addItem(el.title,el.body)))
.catch(rej=>console.log(rej))

////////////////////  FETCH  /////////////////////////
/*

fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(json =>json.forEach(el=>addItem(el.title,el.body)))
.catch(console.error("Error:something is wrong"))

*/
////////////////////  my dom code event /////////////////////////
addBtn.addEventListener("click",()=>{
    addForm.style.display="block"
    addBtn.parentElement.style.display="none"
})
cansle.addEventListener("click",()=>{
    addForm.style.display="none"
    addBtn.parentElement.style.display="block"
})
add.addEventListener("click",()=>{
    if(title.value.trim() !== ""&&contint.value.trim() !== ""){
        addForm.style.display="none"
        addBtn.parentElement.style.display="block"
        addItem(title.value,contint.value)
        // post requst 
        postItemFetch(title.value,contint.value)
        title.value=""
        contint.value=""
    }else alert("enter the title & containt")
})


////////////////////  my dom code functions /////////////////////////

const addItem=(title,body)=>{
    let divCard=document.createElement('div'),
    container=document.createElement('div'),
    myH2=document.createElement('h2'),
    myP=document.createElement('p'),
    mySpans=document.createElement('div'),
    divSpan1=document.createElement('div'),
    divSpan2=document.createElement('div'),
    Span1=document.createElement('span'),
    Span2=document.createElement('span'),
    myTitle=document.createTextNode(title),
    mybody=document.createTextNode(body),
    myspan1txt=document.createTextNode("P1"),
    myspan2txt=document.createTextNode("health");
    divCard.className="card"
    mySpans.className="spans"
    myH2.appendChild(myTitle)
    myP.appendChild(mybody)
    Span1.appendChild(myspan1txt)
    Span2.appendChild(myspan2txt)
    divSpan1.appendChild(Span1)
    divSpan2.appendChild(Span2)
    mySpans.appendChild(divSpan1)
    mySpans.appendChild(divSpan2)
    container.appendChild(myH2)
    container.appendChild(myP)
    container.appendChild(mySpans)
    divCard.appendChild(container)
    containerCard.appendChild(divCard)
/*
    //the semple way to add the card put wrong
    let card = `
        <div class="card">
                <div>
                    <h2>${title}</h2>
                    <p>${body}</p>
                    <div class="spans">
                        <div>
                            <span>P1</span>
                        </div>
                        <div>
                            <span>health</span>
                        </div>
                    </div>
                </div>
            </div>
        `
        containerCard.innerHTML += card
        */
}


////////////////////  post Item with Fetch /////////////////////////
const postItemFetch =(title,body)=>{
    fetch('https://jsonplaceholder.typicode.com/posts',
        {
        method: 'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify(
            {
                "userId": 1,
            "id": 1,
            "title": title,
            "body": body
        }
        ),
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(console.error("Error:something is wrong"))
}

