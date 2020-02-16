const fileds = document.querySelectorAll("#form-user-create [name]");
const form = document.querySelector("#form-user-create");
const user = {};

function addLine(dataUser) {

    let tr = document.createElement('tr');
    let table = document.querySelector('#table-users')

    tr.innerHTML = ` 
    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>
    `;

    table.appendChild(tr)

   

}


form.addEventListener('submit', function(event){

    event.preventDefault();
    

    fileds.forEach(function(filed,index){

        if(filed.name == "gender"){
    
            if(filed.checked){
    
                user[filed.name] = filed.value
    
            }; 
    
    
        }else{
            
            user[filed.name] = filed.value
    
        };
    
        
    
    });
    addLine(user)
    
});



