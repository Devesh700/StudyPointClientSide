const sessionData = JSON.parse(sessionStorage.getItem("user"));
    const localData = localStorage.getItem("accessToken");
export const verifyLogin=(user)=>{
if(sessionData?.accessToken===localData)
return true;
else
return false;
}

