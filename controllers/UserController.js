class UserController {
    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }// final controller
    onSubmit(){
        this.formEl.addEventListener('submit', event => {
            event.preventDefault();
            let btn = this.formEl.querySelector("[type = submit]");
            btn.disabled = true;
            let values = this.getValues();
            this.getPhoto().then(content => {
                values.photo = content;
                this.addLine(values);
                this.formEl.reset();
                btn.disabled = false;
            },
            (e) => {
                console.error(e);
            });
        });
    }// close metody onSubmit
     // pegar foto
     getPhoto(){
         return new Promise((resolve,reject)=> {
            let fileReader = new FileReader();
            let elements = [...this.formEl.elements].filter(item => {
                if(item.name === "photo"){
                    return item;
                }
            });
            let file = elements[0].files[0];
            
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (e) => {
                reject(e);
            }
            if(file){
                fileReader.readAsDataURL(file);
            }else {
                resolve('dist/img/boxed-bg.jpg')
            }
         });
        
    }
    getValues() {
        let user = {}; 
        let isValid = true;
        [...this.formEl.elements].forEach(function (filed, index) {
            if(['name','email','password'].indexOf(filed.name) > -1 && !filed.value )  {
                filed.parentElement.classList.add('has-error')
                isValid =  false;
            } 
            if (filed.name == "gender") {
                if (filed.checked) {
                    user[filed.name] = filed.value
                };
            } else if(filed.name == "admin"){
                user[filed.name] = filed.checked
            }else{
                user[filed.name] = filed.value
            };
        });
        if(!isValid){
            return false;
        }
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin);
    }// close metody getValues
    addLine(dataUser) {
        let tr = document.createElement('tr')
        tr.innerHTML = ` 
            <td><img src="${dataUser.photo}" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;
        this.tableEl.appendChild(tr);
    }
}