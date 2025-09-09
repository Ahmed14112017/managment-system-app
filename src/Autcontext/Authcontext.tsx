import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
type props = {
  children: ReactNode;
};
type authcontext = {
  logindata: any;
  savedata: () => void;
  logout: () => void;
};
export const authcontext = createContext<authcontext | null>(null);
export const AuthcontextProvider = ({ children }: props) => {
  const [logindata, Setlogindata] = useState<any>(null);
  const savedata = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      Setlogindata(decodedToken); // Store the decoded token
    } else {
      Setlogindata(null);
      localStorage.removeItem("token");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    Setlogindata(null);
  };
  useEffect(() => {
    savedata();
  }, []);

  return (
    <authcontext.Provider value={{ logindata, savedata, logout }}>
      {children}
    </authcontext.Provider>
  );
};
