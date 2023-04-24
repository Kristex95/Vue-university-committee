import store from "@/store";

const BASE_URL = 'http://localhost:8080/University_committee_war_exploded';

export async function sendRequest(url, method, data) {
    console.log(method + " " + url)
    let headers = ""
    let access_token = localStorage.getItem("access_token");
    if (access_token) headers = "Bearer " + access_token;
    const request = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${headers}`
        }
    };
    if (data) request.body = JSON.stringify(data)

    const response = await fetch(BASE_URL + url, request);
    if (response.status === 401) {
        console.log("sending refresh token to check")
        const refreshToken = localStorage.getItem('refresh_token');
        const responseTokens = await fetch(BASE_URL + '/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        if (responseTokens.status !== 401) {
            const newTokens = await responseTokens.json();
            localStorage.setItem('access_token', newTokens['access_token']);
            localStorage.setItem('refresh_token', newTokens['refresh_token']);
            console.log(newTokens);
            return await sendRequest(url, method, data);
        }
        else if(responseTokens.status === 401){
            store.commit("logout")
            return await sendRequest(url, method, data)
        }
        else {
            return responseTokens;
        }
    } else {
        console.log("sent without refreshing")
        return response;
    }
}
