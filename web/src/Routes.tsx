import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import "./Routes.style.scss"
export const Routes:React.FC =()=>{

return <BrowserRouter>
<switch>
<Route exact path="/" render={()=><div className="title">Home page</div>}/>
<Route exact path="/profile" render={()=><div>Profile page</div>}/>

</switch>
</BrowserRouter>
}


