import axios, { AxiosResponse, AxiosRequestConfig } from "axios"

export const makeApi = async (
	endpoint: string,
	method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
	data?: any 
): Promise<AxiosResponse> => {  
	try {
		const token = localStorage.getItem("token")
		if (!token && endpoint.includes("/auth-required")) {
			window.location.href = "/Signup"
			throw new Error("Please login to access this resource.")
		}

		const headers = {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : "",
		}

		const config: AxiosRequestConfig = {
			method,
			// url: `http://localhost:8000${endpoint}`, 
			url: `https://tixteen-backend.onrender.com${endpoint}`,

			headers,
			data,
		}

		const response = await axios(config)
		return response
	} catch (error: any) {
		// if(error.response.data.error === "Unauthorized access"){
		// 	console.log("------------------------------")
		// 	window.location.href = "/Signup";
		// }
		console.error("API request failed:", error.response.data)
		throw error
	}
}
