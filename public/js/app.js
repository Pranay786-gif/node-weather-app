console.log("js file running")
function getLocation(){
    document.getElementById("location").innerHTML="loading..."
    let city = document.getElementById("city").value;
fetch(`/weather?address=${city}`)
.then(res=>res.json())
.then(res=>{
    if(res.error){
        document.getElementById("location").innerHTML=res.error
    } else{
    document.getElementById("location").innerHTML=`the temprature of ${res.location} is ${res.forecast} and humidity is ${res.humidity}`
    }

})
}