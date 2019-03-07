const promise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve('some data');
        reject('some error');
    });
});

promise.then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
});