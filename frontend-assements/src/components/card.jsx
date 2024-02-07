import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";

import React, { useState } from "react";
import { CommentsContainer } from "./comment";
import moment from "moment";

export const CardFeed = ({ data }) => {
  const name = data.userId.username;

  const timeStamp = moment(data.createdAt).format('DD-MM-YYYY, h:mm a')

  const [isOpen , setOpenDrawer] = useState(false)

  const btnRef = React.useRef();

  function handleDrawer(){
    setOpenDrawer(!isOpen)

  }

  return (
    <Card>
      <CardHeader>
        <Flex>
        <Flex flex="1" alignItems="center" gap="3">
          <Avatar  name={name ? name[0] : ''}/>
            <Heading as="h3" size="lg" fontWeight={600}>
                {name}
                <Text fontSize='13px' color='grey' fontStyle='italic' marginTop="2px">{timeStamp}</Text>
            </Heading>
            
          
          
        </Flex>
        <IconButton
        variant='ghost'
        colorScheme='gray'
        aria-label='See menu'
        icon={<MdMoreVert />}
      />
        </Flex>
        
      </CardHeader>
      <CardBody>
        <Text>{data.msg}</Text>
      </CardBody>
      <CardFooter>
        <Button
          ref={btnRef}
          onClick={() => {
            handleDrawer()
          }}
        >
          Comment
        </Button>

        { isOpen ? <CommentsContainer postId={data._id} isOpen={isOpen} handleDrawer={handleDrawer} ></CommentsContainer> : '' }
      </CardFooter>
    </Card>
  );
};
