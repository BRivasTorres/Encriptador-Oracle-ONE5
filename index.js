const encriptBtn = document.getElementById("encrypt")
const decriptBtn = document.getElementById("decrypt")
const textArea = document.getElementById("textReceived")
const contentEmpty = document.querySelector(".decryptor-empty")
const contentFill = document.querySelector(".decryptor-fill")
const textToDecrypt = document.getElementById("text-area-decryptor")
const copyBtn = document.getElementById("copy")

let text = ""
let newText = ""

const encrypt = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
}
const decrypt = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u"
}

textArea.addEventListener("input", (e) => {
    text = e.target.value
    const regex = /^[a-z\b\s]+$/;
    
    if (regex.test(text)) {
        textArea.value = text        
    } else {
        e.preventDefault();
        alert('Only lowercase letters are allowed, no signs');
        e.target.value = ""
    } 
    
})

encriptBtn.addEventListener("click", () => {
    // let regExp = /a|e|i|o|u/g
    if(text === "") {
        alert("Please enter something to encrypt")
        return
    } else {
        for(let char of text) {
            if(encrypt.hasOwnProperty(char)) {
                newText += encrypt[char]
            } else {
                newText += char
            }
        }
        newText += " "
        if(contentFill.style.display === "none") {
            contentEmpty.style.display = "block"
            contentFill.style.display = "none"      
        } else {
            contentEmpty.style.display = "none"
            contentFill.style.display = "block"
        }
        textToDecrypt.innerHTML = newText
    }  
})

copyBtn.addEventListener("click", () => {
    navigator.clipboard
    .writeText(newText)
    .then(() => {
      console.log(`Encrypted code copied to clipboard ${newText}`);
    })
    .catch((error) => {
      console.error("Failed to copy encrypted code to clipboard:", error);
    });
})

let decriptText = ""
decriptBtn.addEventListener("click", () => {
    const regexPattern = new RegExp(Object.keys(decrypt).join("|"), "g");
    if(text === "") {
        alert("Please enter something to decrypt")
        return
    } else {
        let encryptedWords = text.split(" ");
        for (let word of encryptedWords) {
            const decryptedWord = word.replace(regexPattern, (match) => decrypt[match]);
            decriptText += decryptedWord + " ";
        }
        decriptText = decriptText.trim();
        
        textToDecrypt.innerHTML = decriptText
    }  
})