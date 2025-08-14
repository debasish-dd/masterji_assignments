import { Tiktoken } from "https://cdn.jsdelivr.net/npm/js-tiktoken@latest/dist/lite.js";
import o200k_base from 'js-tiktoken/ranks/o200k_base';
const enc = new Tiktoken(o200k_base);


const textInput = document.getElementById('textInput')

textInput.addEventListener('change' , (e)=>{

    const userQuery = (e.target.value);
    const tokens = enc.encode(userQuery);
    console.log(tokens);
    


})
