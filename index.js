const fileds = document.querySelectorAll("#form-user-create [name]");
const form = document.querySelector("#form-user-create");
const user = {};


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
    console.log(user);
    
});



