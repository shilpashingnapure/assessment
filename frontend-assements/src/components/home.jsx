import {
  Avatar,
  Box,
  Button,
  ChakraProvider,
  Flex,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Feed } from "./feed";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../state/store";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storeUser } from "../state/action";
import { getData } from "../Services/methods";

export const Home = () => {

  let user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  if (Object.keys(user).length == 0){
    const id = Cookies.get('_id');
    getUserById(id);
  
  }

  async function getUserById(id){
    let data = await getData(`/user?id=${id}`);
    dispatch(storeUser(data.user));
    user = data.user

  }
    

    
  const [search , setSearch] = useState('');
  let navigate = useNavigate()

  function handleLogOut(){
    Cookies.remove('token');
    return navigate('/')


  }
  const [searchData , setSearchData] = useState([])
  async function handleSearch(){
    let data = await getData(`/search?text=${search}`)
    setSearchData(data)

  }
  return (
    <Stack bg="gray.50" className="container">
      <Box h="20" borderWidth="1px" className="navbar" bg="gray.50">
        <Flex alignItems="center" p="5" justifyContent="space-between">
          <Image
            src="https://assets-global.website-files.com/62722382edf1ccf73f13cf27/63da0fe058edcf1bf712c74a_Artboard%201k%20save%20icon.webp"
            boxSize="50px"
            marginTop="-5px"
          />
          <Flex w="30%" marginLeft='60'>
            <Input placeholder="Search here..." onChange={(e)=> setSearch(e.target.value)}/>
            <Button onClick={handleSearch}>
            <SearchIcon />
            </Button>

              
              
            
            
            
          </Flex>
          <Flex alignItems="center" gap="4">
            <Text>{user.username}</Text>
            <Avatar name={user.username ? user.username[0] : ''}></Avatar>
            <Button onClick={handleLogOut}>Logout</Button>
          </Flex>
        </Flex>
      </Box>
      <Feed searchData={searchData} searchText={search}></Feed>
    </Stack>
  );
};
