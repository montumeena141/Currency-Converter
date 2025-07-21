// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json

// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-05-01/v1/currencies/usd.json


const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdown=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");

// for (let code in countryList){
//     console.log(code,countryList[code]);
// }

//fist time load
document.addEventListener("load",()=>{
 updateExchange();
})


for(let select of dropdown){
    for(currCode in countryList){
        let newOptions=document.createElement("option");
        newOptions.innerText=currCode;
        newOptions.value=currCode;

        if(select.name==="from" && currCode==="USD"){
          newOptions.selected=true;
        }else if(select.name==="from" && currCode==="INR"){
          newOptions.selected=true;
        }
        select.append(newOptions);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateExchange=async()=>{
     let amount=document.querySelector("form input");
     let amtVal=amount.value;
    // console.log(amtVal);
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value=1;
    }
    // console.log(fromCurr.value, toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    // const URL=`${BASE_URL}/${toCurr.value.toLowerCase()}.json`;


    let response = await fetch(URL);
    console.log(response);

    let data=await response.json();
    // console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];


    let finalAmount=amtVal*rate;
    // msg.innerText=`${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    console.log(data);
    console.log(rate);
}

const updateFlag=(element)=>{
    // console.log(element);
    let currCode=element.value;
    // console.log(currCode);

    let countryCode=countryList[currCode]; //IN,EU
    console.log(countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}



button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    // let amount=document.querySelector("form input");
    // let amtVal=amount.value;
    // // console.log(amtVal);
    // if(amtVal==="" || amtVal<1){
    //     amtVal=1;
    //     amount.value=1;
    // }

    // // console.log(fromCurr.value, toCurr.value);

    // const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    // // const URL=`${BASE_URL}/${toCurr.value.toLowerCase()}.json`;


    // let response = await fetch(URL);
    // console.log(response);

    // let data=await response.json();
    // let rate=data[toCurr.value.toLowerCase()]

    // let finalAmount=amtVal*rate;
    // msg.innerText=`${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`
    // console.log(data);
    updateExchange();
})



window.addEventListener("load",()=>{
 updateExchange();
})