let money = 10000;
const buyACar = (car: any) => {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            if (money >= 10000) {
                resolve("Can buy " + car);
            } else {
                reject("Do not have enough money");
            }
        }, 100);
    }))
}

money = 1000001;
const promise = buyACar("Koenigsegg").then(value => {
    console.log(value);
}, error => {
    console.log(error);
})