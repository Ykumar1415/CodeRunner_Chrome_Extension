const div = document.querySelector(".container");
const field = document.querySelector(".input");
const button = document.querySelector(".runbtn");
const codebtn = document.querySelector(".codebtn");
// const code = document.querySelector(".code");
var  flag = false; 
codebtn.addEventListener('click', () =>{
  var code = document.createElement("textarea");
  code.className = "code"
  code.style.height = "9rem";
  code.style.width = "100%";
  document.body.appendChild(code);
  codebtn.style.display = "none";
  // field.style.display = "none";
  code.style.padding = "10px";
  code.style.width = "100%";

  code.style.color = "black";
  code.style.backgroundColor = "white";

  code.focus();
  document.execCommand("paste");
  flag = true; 
  

})
button.addEventListener("click", () => {
  
  const text = field.value;
  console.log(text);
  div.innerHTML = `<h5>Loading... </h5>`;
  // div.innerHTML = text;
  div.style.color = "White";
  let clip; 
  let data ; 
  try {
    if(flag == false){
  let t = document.createElement("textarea");
  t.style.height = "9rem";
  t.style.width = "100%";
    document.body.appendChild(t);
    t.focus();
    document.execCommand("paste");
    t.style.display = "none";
     clip = t.value; 
     data =  {code : t.value, input : text};

    }
    else if(flag == true){
      // let t = document.querySelector(".code");
      // t.focus();
    const code = document.querySelector(".code");
       clip = code.value;
       console.log(clip); 
        data = {code : code.value, input : text};
        flag = false; 
    }
    
    fetch('https://code-runr.onrender.com/submit-cpp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);

  div.innerHTML = `<p>${data} </p>`;
  const para = document.querySelector("p");
  para.style.padding = "10px";
    })
    .catch(error => {
      console.error(error);
    });
    document.body.removeChild(t);
  } catch (e) {
    console.log("error");
  }
});
