import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import { Home } from './pages/homepage/homepage.component';
import { Navbar } from './components/navbar/navbar.component';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { Profile } from './pages/profile/profile.component';




export const Routes:React.FC =()=>{

    var styles1 = {
        paddingLeft: '25px',
        paddingRight: '25px'
      };

return <BrowserRouter>
<Navbar />
<div style={styles1}>
<switch>
<Route exact path="/" component={Home}/>
<Route exact path="/" component={Home}/>
<Route exact path="/" component={Home}/>
<<<<<<< HEAD
<Route exact path="/login" component={Login}/>
=======
>>>>>>> devtest
<Route exact path="/login" component={Login}/>
<Route exact path="/register" component={Register}/>
<Route exact path="/profile" component={Profile}/>
</switch>
</div>
</BrowserRouter>
}


