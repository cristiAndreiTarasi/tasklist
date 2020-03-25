export default function (error) {
    switch (error) {
        case error.response:
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            break;
        case error.request:
            console.log(error.request);
            break;
    
        default:
            console.log('Error: ', error.message);
            break;
    }
}