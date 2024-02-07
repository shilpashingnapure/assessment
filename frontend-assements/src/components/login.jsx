import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { storeUser } from "../state/action";
import { setCookies } from "../Services/cookies_set.js";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    username: "",
    password: "",
  });

  const [active, setactive] = useState("login");

  const store = useSelector((state)=> state.user);
  const dispatch = useDispatch();


  // register handle
  async function submitForm(endPoint) {
    try {
      let res = await fetch(`http://localhost:4000/${endPoint}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      let data = await res.json();
      if (data.token) {
        setCookies(data);

        dispatch(storeUser(data.user));
        return navigate("/feed");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Box w="30%" borderWidth="1px" p="5" m="auto" marginTop="200px">
      <Grid
        templateColumns="50% 50%"
        justifyContent="center"
        textAlign={"center"}
        borderWidth="1px"
        marginBottom='30px'
      >
        <Text
          className={`header ${active == "login" ? "active" : ""}`}
          onClick={() => setactive("login")}
        >
          Login
        </Text>
        <Text
          className={`header ${active == "register" ? "active" : ""}`}
          onClick={() => setactive("register")}
        >
          Resigter
        </Text>
      </Grid>

      <Flex flexDirection='column' gap='9'>
          <Input
            placeholder="Enter username"
            onChange={(e) => setuser({ ...user, username: e.target.value })}
          />
          <Input
            placeholder="Enter password"
            onChange={(e) => setuser({ ...user, password: e.target.value })}
          />
           <Button onClick={ ()=> submitForm(active)}>{active =='login' ? 'login In' : 'sign up'}</Button>
        </Flex>

    </Box>
  );
};
