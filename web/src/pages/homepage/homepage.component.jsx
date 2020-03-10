import React from 'react'
import { useGetUsersQuery } from '../../generated/graphql'
import './homepage.style.scss'


export const Home = () => {

 const {data,error}= useGetUsersQuery({fetchPolicy:'network-only'})


 if(!data){
    return <div>Server down!</div>
}
if(error){
return <div>{error}</div>
}
    return (
        
        <div>
       <div className="home">
        home page 
        </div>
        <div>
            All Users:
            <ul>
                {data.users.map(x=>{
                 return( 
                     <div key={x.profile.id} >
                 <div>{x.profile.firstName}  <span>{x.profile.lastName} </span> </div>
                
                 </div>
 )  
                })}
            </ul>
        </div>
        </div>
    )
}
