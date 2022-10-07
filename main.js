//AXIOS GLOBALS:tokenref:jwt.io
axios.defaults.headers.common['X-auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


// GET REQUEST
function getTodos() {
  //method-01
  // axios({//return a promise
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params:{
  //     _limit:15
  //   }
  // })
  // .then((res)=>{
  //   showOutput(res);
  // })
  // .catch((error)=>{
  //   console.error(error);
  // })


  //method_02:bydefault get,but for clean code we should put get:
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5',{timeout: 5}) //timeout:after 5 ms it will stop searching data from server.
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    })

}

// POST REQUEST
function addTodo() {

  //method:-01
  // axios({
  //   method:'post',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   data:{
  //     title:"new todos",
  //     completed:false

  //   }
  // })
  // .then((res)=>{
  //   showOutput(res);
  // })
  // .catch((error)=>{
  //   console.error(error);
  // })

  //method:02

  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: "new todos",
    completed: false
  })
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    })





}

// PUT/PATCH REQUEST:put:replace;patch:updation
function updateTodo() {
  // console.log('PUT/PATCH Request');

  // axios.put('https://jsonplaceholder.typicode.com/todos/1',{  //instead the data at id 1 we use new data at id 1;
  //     title:"update todos",
  //     completed:true})
  // .then((res)=>{
  //   showOutput(res);
  // })
  // .catch((error)=>{
  //   console.error(error);
  // })



  //PATCH:UPDATE ALONG WITH PREVIOUS DATA
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
    title: "update todos",
    completed: true
  })
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    })








}

// DELETE REQUEST
function removeTodo() {
  // console.log('DELETE Request');

  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    })
}

// SIMULTANEOUS DATA: data of different things at the same time
function getData() {
  // console.log('Simultaneous Request');

  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
    .then(axios.spread((todos, posts) => {
      // showOutput(posts)
      showOutput(todos)
    }))
    .catch((error) => {
      console.error(error);
    })




}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: 'some-token'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: "new todos",
    completed: false
  }, config)
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      console.error(error);
    })




}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {

  const option = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: "Hello World"

    }, transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })

  }

  axios(option).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todossssssss',{
    validateStatus:function(status){
      return status<500;  //reject only if the status is greater or equal to 500;
    }
    })
    .then((res) => {
      showOutput(res);
    })
    .catch((error) => {
      if (error.response) {
        //server responded with status other than 200(success) range;
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        if (error.response.status === 404) {
          alert("Error:404:Page not found")
        }
      } else if (error.request) {
        //request was made but no response
        console.log(error.request)
      }else{
        console.error(error.message)
      }
    })
}

// CANCEL TOKEN
function cancelToken() {
   const source=axios.CancelToken.source()

  axios.get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken:source.token
  })
    .then((res) => {
      showOutput(res);
    })
    .catch(thrown=>{
      if(axios.isCancel(thrown)){
        console.log('request cancelled',thrown.message)
      }
    });

    if(true){
      source.cancel("Request Cancelled!")
    }
  
}

// INTERCEPTING REQUESTS & RESPONSES:
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} hsa been sent to ${config.url} at ${new Date()}`);
  return config;
}, error => {
  return Promise.reject(error)

})

// AXIOS INSTANCES:

const axiosInstance=axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
})

// axiosInstance.get('/comments').then((res)=>showOutput(res))




// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
