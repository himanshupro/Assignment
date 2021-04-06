
function delay(milisec){
    return new Promise(resolve => {
        setTimeout(resolve,milisec)
    },1000);
}

async function testDelay(){

    console.log('next message should come after 5 seconds', new Date().toTimeString());
    await delay(5000);
    console.log('We are done', new Date().toTimeString());
}

testDelay();