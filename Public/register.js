const registerForm = document.getElementById('registerForm');
const registerStatus = document.getElementById('registerStatus');

registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    registerStatus.textContent = '';
    const formdata = new FormData(registerForm)
    // console.log(formdata);
    const data = Object.fromEntries(formdata.entries());
    const res = await fetch("http://localhost:8001/register",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    });

    if(!res.ok){
        registerStatus.textContent = res.statusText;
        return;
        
    }
    else{
        registerStatus.textContent = res.statusText;;
        registerForm.reset();
    }
    })