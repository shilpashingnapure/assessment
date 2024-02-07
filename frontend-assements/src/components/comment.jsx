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
  Input,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../Services/methods";

export const CommentsContainer = ({ postId, isOpen, handleDrawer }) => {
  const user = useSelector((state) => state.user);

  const [text, setText] = useState({
    comment: "",
    commentUserID: user._id,
    postID: postId,
  });

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  async function postComment() {
    try {
      let res = await fetch(`http://localhost:4000/comment`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      });

      let data = await res.json();
      setText({
        ...text,
        comment: "",
      });
      getComments();
    } catch (err) {
      console.log(err);
    }
  }

  async function getComments() {
    try {
      let comments = await getData(`/comments?postId=${postId}`);
      setComments(comments);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleDrawer} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop="15px" />
        <DrawerHeader>
          <Stack spacing="4" width="95%">
            <Flex alignItems="center" gap="3">
              <Avatar name={user._id ? user.username[0] : ''}></Avatar>
              <Input
                placeholder="add a comment.."
                onChange={(e) => setText({ ...text, comment: e.target.value })}
                value={text.comment}
              />
            </Flex>
            <Flex justifyContent="end">
              <Button colorScheme="blue" onClick={postComment}>
                Post
              </Button>
            </Flex>
          </Stack>
        </DrawerHeader>

        <DrawerBody>
          <Flex flexDirection="column" gap="3">
            {comments.length
              ? comments.map((item) => {
                  return (
                    <Grid
                      templateColumns="10% 1fr"
                      className="comment-box"
                      gap="3"
                      key={item._id}
                    >
                      <Avatar
                        w="40px"
                        h="40px"
                        name={item.commentUserID.username ? item.commentUserID.username[0] : ''}
                      ></Avatar>
                      <Box
                        alignItems="center"
                        p="4"
                        borderRadius="8px"
                        bg="#f2f2f2"
                      >
                          <Heading as="h5">
                            {item.commentUserID.username}
                            <Text fontSize="12px" color="grey" marginTop="3px">
                            {moment(item.createdAt).format(
                              "DD-MM-YYYY, h:mm a"
                            )}
                          </Text>
                          </Heading>
                          
                        <Text fontSize="16px">{item.comment}</Text>
                      </Box>
                    </Grid>
                  );
                })
              : "no comments"}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
