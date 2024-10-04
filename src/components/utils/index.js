
export const verifyLogin=(user)=>{
    const sessionData = JSON.parse(sessionStorage.getItem("user"));
    const localData = localStorage.getItem("accessToken");
if(sessionData?.accessToken===localData)
return true;
else
return false;
}

