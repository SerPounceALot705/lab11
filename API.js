class Api {
    constructor(options) {
      this.ip = options.ip; 
      this.token = options.token; 
      this.groupId = options.groupId;
      this.contentType = options.contentType;
      this.action = options.action;
      this.baseUrl = `http://${this.ip}/${this.groupId}/${this.action}`;
      this.method = options.method;
    }
  
    getRequest() {
        return new Promise((resolve, reject) => {
            fetch (this.baseUrl, {
                headers: {
                    authorization: this.token,
                    'Content-Type': this.contentType
                }, 
            })
            .then(promise => {
                if (promise.ok) {
                  return promise.json()
                }
                
                return Promise.reject(`Ошибка: ${promise.status}`);
            })
            .then(result => {
                console.log(result);
                resolve(result)
            })
            .catch(error => reject(error)) 
        })
    }  

    requestToApi(data) {  
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl, {
                method: this.method,
                headers: {
                    authorization: this.token,
                    'Content-Type': this.contentType
                },
                body: data == null ? '' : JSON.stringify(data)
            })
            .then(promise => {
                if (promise.ok) {
                return promise.json()
                }
                return Promise.reject(`Ошибка: ${promise.status}`);
            })
            .then(result => resolve(result))
            .catch(error => reject(error)) 
        }) 
    }  
}
