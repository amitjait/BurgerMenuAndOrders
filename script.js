
// Get Menu function
function getMenu(){
    return fetch("https://free-food-menus-api-production.up.railway.app/burgers");
}


// Take Order functio 
function takeOrder(burgers){

    // returning a promise with set Time out API
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            let obj = {}; // Object to store three random burgers object

            //running a loop for getting random three objects of burgers
            for(let i=1; i<=3; i++){
                let randomIdx = Math.floor(Math.random() * burgers.length);
                obj[i] = burgers[randomIdx];
            }

            // resolving Prominse with Obj
            console.log(obj);
            resolve(obj);
        }, 2500);
    })
}


// order Preperation function
function orderPrep(){
    
    // returning a promise with order status and paid object
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{

            // resolving with object 
            resolve({order_status:true, paid:false});
            console.log({order_status:true, paid:false});
        }, 1500);
    })
}


// pay order function 
function payOrder(orderPre){

    // returning a promise with paid = true
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            orderPre.paid = true;
            console.log(orderPre);
            resolve(orderPre);
        }, 1000);
    })
}


// funstion to show message after the succesfull payment
function thankyouFnc(){
    alert("Thank You! Your Order is Confirmed!");
}


// this is the main function Named foody which handle all promises 
async function foody(){

    try{
        // getting response from Get Menu function
        // 1st function 
        let response = await getMenu();

        // checking if response if ok
        if(response.ok){

            // getting array of burgers from response.json();
            let burgers = await response.json();
            console.log(burgers);

            // creating burgers by createBurger function!
            burgers.map((burger) =>{
                createBurger(burger);
            });

            // picking orders randomely
            // 2nd function 
            let orders = await takeOrder(burgers);
            // creating and showing randolmely picked orders from burgers array
            createOrder(orders);

            // 3rd function
            //assigning the order status as true
            let orderPre = await orderPrep();
            
            //if order status is true then go for sh
            if(orderPre["order_status"]){
                orderPreparing();

                let paid = await payOrder(orderPre);
                paymentDone();        

                if(paid.paid){
                    confirmedOrder();
                    thankyouFnc();
                }else{
                    alert("Please Make payment f=to confirm your order!");
                }
            }else{
                alert("Please select your Order!")
            }
        }else{
            throw new Error("Data is valid!");
        }
    }
    catch(e){
        console.log("Error :", e);
    }
}

// function to create burgers or dispalying data in the web page
function createBurger(burger){
        let mainDiv = document.getElementById('container');

        let food = document.createElement('div');
        food.setAttribute('class', 'food-item');

        let img = document.createElement('img');
        img.src = burger.img;

        let details = document.createElement('div');
        details.setAttribute('class', 'details');

        details.innerHTML += `<h3>${burger.name}</h3>`;
        details.innerHTML += `<p>${burger.country}</p>`;

        let priceTag = document.createElement('div');
        priceTag.setAttribute('class', 'price-rate');

        let rate = document.createElement('div');
        rate.setAttribute('class', 'rate');

        rate.innerHTML =  `&#9733 ${burger.rate}`;

        
        priceTag.appendChild(rate);
        priceTag.innerHTML += `<p> &#x20b9; ${burger.price}</p>`

        details.appendChild(priceTag);

        let dsc = document.createElement('p');
        dsc.innerHTML = `<b>Description: </b> ${burger.dsc}`;


        details.appendChild(dsc);

        food.appendChild(img);
        food.appendChild(details);

        mainDiv.appendChild(food);
}


// function to create picked orders in the web page
function createOrder(orders){
    
    for(const i in orders){
        let burger = orders[i];
         
        let order = document.getElementById('innerOrder');

        let food = document.createElement('div');
        food.setAttribute('class', 'food-item');

        let img = document.createElement('img');
        img.src = burger.img;

        let details = document.createElement('div');
        details.setAttribute('class', 'details');

        details.innerHTML += `<h3>${burger.name}</h3>`;
        details.innerHTML += `<p>${burger.country}</p>`;

        let priceTag = document.createElement('div');
        priceTag.setAttribute('class', 'price-rate');

        let rate = document.createElement('div');
        rate.setAttribute('class', 'rate');

        rate.innerHTML =  `&#9733 ${burger.rate}`;

        
        priceTag.appendChild(rate);
        priceTag.innerHTML += `<p> &#x20b9; ${burger.price}</p>`

        details.appendChild(priceTag);

        let dsc = document.createElement('p');
        dsc.innerHTML = `<b>Description: </b> ${burger.dsc}`;

        details.appendChild(dsc);

        food.appendChild(img);
        food.appendChild(details);

        order.appendChild(food);
        
    }

    // remove active class to show the orders box
    let ods = document.getElementById('orders');
    ods.classList.remove('active');

    //halting the scrolling for a while
    // document.body.style = "overflow: hidden";
}

// Closing button feature in Picked Orders
let closeBtn = document.getElementById('close');

closeBtn.addEventListener(('click'), ()=>{
    // document.body.style = "overflow: none";
    let ods = document.getElementById('orders');
    ods.classList.add('active');
})


// functio  to show that order is being placed
function orderPreparing(){
    let orderDiv = document.getElementById('innerOrder')
    let Preparing = document.getElementById('orderPrep');

    orderDiv.classList.add('active');
    Preparing.classList.remove('active');
}


// function to show that payment is being done
function paymentDone(){
    let paying = document.getElementById('orderPrep');
    paying.innerHTML = "Payment is being done..."
}

// function to show that order is confirmed
function confirmedOrder(){
    let paying = document.getElementById('orderPrep');
    paying.innerHTML = "Thank You Order is Confirmed! Enjoy your Meal."
}



// calling the main function

foody();