export function FETCHRequest(url, init){
	return  fetch(url, init)
		.then(response => {
			if (response.status >= 400) {
				throw response
			}
			else {
				var contentType = response.headers.get("content-type")
				if (contentType && contentType.indexOf("application/json") !== -1) {
					return response.json()
				} else {
					return response.text()
				}
			}
		})
		.then(data => {
			var final_result = data
			//Ưu tiên convert sang JSON Object nếu kết quả là string
			if(typeof data === 'string'){
				try {
					final_result = JSON.parse(data)
				} catch (error){
					console.log('This is not a JSON format with error = ', error)
				}
			}
			return final_result
		})
		.catch(error => {
			console.log('CORS-catch-error', error)
			return error
		})
}