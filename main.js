let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let submit = document.getElementById("submit")
let category = document.getElementById("category")
let count = document.getElementById("count")
let tbody = document.getElementById("tbody")
let delateAll = document.getElementById("delateAll")
let mood = "create"
let temp;
let search = document.getElementById("search")
// get total
function getTotal() {
    if (price.value != "") {
        total.style.background = "#29bf12"
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
    } else {
        total.style.background = "#e63946"
    }
}
// create product
// hadi dartha psq kindir realod wnktb new data tramplaci data 9dima
// yassama kitkoun kayan data fi local storage array tkoun fiha data 9dima matkounch fargha

let dataPro;
if (localStorage.product != null) {
   dataPro = JSON.parse(localStorage.product) 
} else {
  dataPro =[]  
}

submit.onclick = function () {
    let newPro = {
        title: title.value ,
        price: price.value,
        taxes : taxes.value,
        ads : ads.value , 
        discount : discount.value ,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }
    // create many product with count
    if (title.value != "" && price.value !=""&&category.value != ""&& count.value<100) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                 } 
              }else {
                 dataPro.push(newPro)
              }  
        }else {
            dataPro [temp] = newPro
            // mood= "create"
            count.style.display = "block"
            submit.innerHTML= "Create"
    
        }
        clearData()  
    }
    
// ida tha9a9 condition he will clear data if it doesnt he will not clear the data
   
        
    // nkhazan data fi array yssama nkhzn aray fi locale
    localStorage.setItem("product", JSON.stringify(dataPro))
   
    
    showData()
   
}
// clear data from input when i click on continue
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    category.value = "";
    count.value = "";
}
// read and show data in table
function showData() {
    getTotal()
    let table = ""
    
   for (let i = 0; i < dataPro.length; i++) {
     table  += `
    <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick = "updateData(${i})" id="update">update</button></td>
    <td><button onclick = "delateData(${i})"  id="delate">delate</button></td>
    </tr>
     `
     
    } 
 
    tbody.innerHTML = table
   if (dataPro.length > 0) {
    delateAll.innerHTML = ` <button onclick = "delateALL()" >Delate All (${dataPro.length})</button>`
   }
   else{
    delateAll.innerHTML = ""
   }
  
 }
 showData()
    
// delate data and reload automaticly
function delateData(i) {
   dataPro.splice(i,1)
   localStorage.product = JSON.stringify(dataPro)
   showData()
}
function delateALL() {
   localStorage.clear() 
   dataPro.splice(0)
   showData()
}
//  update
function updateData(i) {
    title.value = dataPro[i].title ;
    price.value = dataPro[i].price ;
    taxes.value = dataPro[i].taxes ;
    ads.value = dataPro[i].ads ;
    discount.value = dataPro[i].discount ;
    getTotal()
    count.style.display = "none"
    category.value = dataPro[i].category ;
    submit.innerHTML= "Update"
    mood = "update"
    temp = i
    scroll({
        top: 0 , 
        behavior :"smooth"
    })
   
}
// search
let searchMood = "title"
function getSearchMood(id) {
    if (id == "searchTitle") {
       searchMood = "title"
       search.placeholder ="Search By Title"
    } else {
        searchMood = "category"
        search.placeholder ="Search By Category"
    }
    search.focus()
    search.value =''
    showData()
}
// SEARCH 2

function searchByTandC(value) {
    let table = "";
    if (searchMood == "title") {
    
        for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
          
    
           
              table  += `
             <tr>
             <td>${i}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick = "updateData(${i})" id="update">update</button></td>
             <td><button onclick = "delateData(${i})"  id="delate">delate</button></td>
             </tr>
              `
             
           
            
          
             

          }
          
        }
    } 
    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
            
      
             
                table  += `
               <tr>
               <td>${i}</td>
               <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
               <td><button onclick = "updateData(${i})" id="update">update</button></td>
               <td><button onclick = "delateData(${i})"  id="delate">delate</button></td>
               </tr>
                `
               
             
              
            
               
  
            }
            
          }
          tbody.innerHTML = table 
    }
    tbody.innerHTML = table 
    
}






