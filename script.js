document.addEventListener("DOMContentLoaded", () => {

  let password = localStorage.getItem("password");

  let setPassword = document.getElementById("setPassword");
  let setPasswordSubmit = document.getElementById("setPasswordSubmit");
  let setPasswordInput = document.getElementById("setPasswordInput");

  let enterPassword = document.getElementById("enterPassword");
  let enterPasswordSubmit = document.getElementById("enterPasswordSubmit");
  let enterPasswordInput = document.getElementById("enterPasswordInput");

  if(password == null){

    setPassword.style.display = "";
    enterPassword.style.display = "none";
	setPasswordInput.focus();
    document.title = "Choose";

  }
  else{

    setPassword.style.display = "none";
    enterPassword.style.display = "";
	enterPasswordInput.focus();

  }

  window.onblur = () => {
    if(document.title != "Choose") document.title = "Destruct";
  }

  setPasswordInput.addEventListener("input", () =>{

    if(setPasswordInput.value.length > 0){
      setPasswordSubmit.disabled = false;
    }
    else{
      setPasswordSubmit.disabled = true;
    }

  })
  setPasswordSubmit.addEventListener("click", () => {


    let newPassword = setPasswordInput.value;
    localStorage.setItem("password", newPassword);
    document.title = "Success";

  })

  enterPasswordInput.addEventListener("input", () =>{

    if(enterPasswordInput.value.length > 0){
      enterPasswordSubmit.disabled = false;
    }
    else{
      enterPasswordSubmit.disabled = true;
    }

  })
  enterPasswordSubmit.addEventListener("click", () => {

    let guessPassword = enterPasswordInput.value;

    if(guessPassword != password){
      document.title = "Destruct";
    }
    else{
      document.title = "Success";
    }

  })



})
