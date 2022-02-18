import { createContext, useContext, ReactNode, useState } from "react";
import { api } from "../../services/api";
import { useToast } from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
  id: number;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface AuthContextData {
  logout: (path: string) => void;
  accessToken: string;
  user: User;
  createRegister: (data: RegisterProps) => void;
  login: (data: LoginProps) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();

  const toast = useToast();

  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@SimpleBudget:accessToken");
    const user = localStorage.getItem("@SimpleBudget:user");

    if (accessToken && user) {
      return {
        accessToken,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const createRegister = (data: RegisterProps) => {
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    api
      .post("/signup/", newData)
      .then((response) => {
        toast({
          title: "User created!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Something went wrong...",
          description: "This email might be already registered.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const login = (data: LoginProps) => {
    api
      .post("/login", data)
      .then((response) => {
        const accessToken = response.data.accessToken;
        const user = response.data.user;

        localStorage.setItem("@SimpleBudget:accessToken", accessToken);
        localStorage.setItem("@SimpleBudget:user", JSON.stringify(user));

        setData({ accessToken, user });
        toast({
          title: "User authenticated successfully!",
          duration: 1000,
          isClosable: true,
          status: "success",
          position: "top",
        });
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Authentication failed",
          status: "error",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const logout = (path: string) => {
    localStorage.removeItem("@SimpleBudget:accessToken");
    localStorage.removeItem("@SimpleBudget:user");
    setData({} as AuthState)
    history.push('/')
  };

  return (
    <AuthContext.Provider
      value={{
        createRegister,
        login,
        accessToken: data.accessToken,
        user: data.user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
