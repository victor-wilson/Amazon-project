//this line creates the request
const xhr = new XMLHttpRequest();

//because xhr.response is asynchronous, we add eventlisteners to wait for the response to load 
xhr.addEventListener('load', () =>{
  console.log(xhr.response)
});
xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send();

const response = await fetch('https://supersimplebackend.dev/hello');
console.log(response.headers.get('content-type'));

//we can also send requests using URL paths. A URL paths is the path that comes after the domain name, it usually starts with a slash
/*xhr.open('GET', 'https://supersimplebackend.dev');*/
