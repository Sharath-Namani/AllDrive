
const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");


loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    loginStatus.textContent = "";   
    const formdata = new FormData(loginForm);
    const data = Object.fromEntries(formdata.entries());
    if(!formdata.get("email") || !formdata.get("password")){
        loginStatus.textContent = "Please enter both email and password";
        return;
    }
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const user = await res.json();
    if(user.success){
        loginStatus.textContent = "Login successful!";
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user.user));
        window.location.href = "home.html";
    }else{
        loginStatus.textContent = "Login failed: " + user.message;
    }
})