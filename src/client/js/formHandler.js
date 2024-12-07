//alert("handle submit loaded")
const serverURL = 'http://localhost:8081/try'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    // Get the URL from the input field
    const formText = document.getElementById('name').value;   
    // Check if the URL is valid
    if (Client.checkForUrl(formText)) {
        console.log("Valid URL")
        alert("Valid")        
        // If the URL is valid, send it to the server using the serverURL constant above
        postData(serverURL, formText)
        // showing the analysis
        .then((res) => {
            updateUI(res);
        });
    } else {
        alert("please enter a valid URL")
    }      
}
// Function to send data to the server
const postData = async (url='', data={})=>{
    const response= await fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: data}),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error){
        console.log("error:", error)
    }
}
//updateUI
function updateUI(res) {
    document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
}
// Export the handleSubmit function
export { handleSubmit };

