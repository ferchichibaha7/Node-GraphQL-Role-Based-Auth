import React,{useState} from "react";
import { useRegisterMutation } from "../../generated/graphql";

export const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

const [register] = useRegisterMutation()


  return (
    <form onSubmit={async e=>{
        e.preventDefault();
 
      await register({
           variables:{
             email,password,firstName,lastName
           }
         })
       
    }}>
      <div>
        <input
          name="email"
          placeholder="email"
          value={email}
          onChange={e => {
            setemail(e.target.value);
          }}
        />
            <input
          name="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={e => {
            setpassword(e.target.value);
          }}
        />
            <input
          name="firstName"
          placeholder="firstName"
          value={firstName}
          onChange={e => {
            setfirstName(e.target.value);
          }}
        />
            <input
          name="lastName"
          placeholder="lastName"
          value={lastName}
          onChange={e => {
            setlastName(e.target.value);
          }}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
