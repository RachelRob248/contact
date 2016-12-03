window.onload = function() {
  document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();
    array1 = document.getElementsByName("name");
    array2 = document.getElementsByName("email");
    array3 = document.getElementsByName("email-confirm");
    var emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var name = array1[0].value;
    if(!name) {
      document.getElementById("message").innerHTML="Name is required";
    } else if(!emailFilter.test(array2[0].value)){
      document.getElementById("message").innerHTML="Invalid Email";
    } else if (array2[0].value != array3[0].value){
      document.getElementById("message").innerHTML="Email Confirmation Failed"
    } else {
      document.getElementById("message").innerHTML="Submission successful"
    }
  });
}
