import logo from "./logo.svg";
import "./App.css";
import {
  Avatar,
  Box,
  ChakraProvider,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  Switch,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { Feed } from "./components/feed";
import { SearchIcon } from "@chakra-ui/icons";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import { Home } from "./components/home";
import { Login } from "./components/login";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PrivateRoute } from "./privateRouter";

function App() {
  return (
    <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute/>} >
              <Route path='/' element={ <Home/>} />
            </Route>
            <Route path='/feed' element={<Home />} />
            <Route path='/login' element={<Login/>} />
          </Routes>
            
        </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
