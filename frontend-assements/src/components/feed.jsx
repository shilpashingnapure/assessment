import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { CardFeed } from "./card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../Services/methods";

export function Feed({ searchData, searchText }) {
  const [posts, setposts] = useState(searchData);
  const [total, settotal] = useState(0);
  let user = useSelector((state) => state.user);

  const [postData, setPostdata] = useState({
    msg: "",
    userId: user._id,
  });

  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (searchData.length != 0) {
      setposts(searchData);
      settotal(searchData.length);
    } else if (searchText && searchText.length != 0) {
      setposts([]);
    } else {
      getallPosts();
    }
  }, [searchData]);

  async function getallPosts() {
    try {
      let { data , total} = await getData('/feed');
      setposts(data);
      settotal(total);

      setloading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function createPost() {
    try {
      let res = await fetch("http://localhost:4000/post", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...postData,
          userId: user._id,
        }),
      });
      let data = await res.json();
      setPostdata({
        ...postData,
        msg: "",
      });
      getallPosts();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid templateColumns="30% 1fr 15%" spacing="8" gap="10" p="5">
      <Box>
        <Heading as="h3" size="md" p="3">
          Create Your Post
        </Heading>

        <Box p="5" bg="#fff" borderWidth="1px" borderRadius="lg">
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea
              onChange={(e) =>
                setPostdata({ ...postData, msg: e.target.value })
              }
              h="20vh"
              value={postData.msg}
              placeholder="create your post"
            ></Textarea>
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={createPost}>
            Submit
          </Button>
        </Box>
      </Box>
      <Stack spacing={6}>
        <Box className="feed-container">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <Flex flexDirection="column" gap="8">
              {posts.length != 0 ? (
                posts.map((item, index) => {
                  return <CardFeed key={index} data={item}></CardFeed>;
                })
              ) : searchText.length ? (
                <Card height="40vh" className="no-post">
                  <Heading as="h3" marginBottom="30px">
                    No Results Found
                  </Heading>
                </Card>
              ) : (
                <Card height="40vh" className="no-post">
                  <Heading as="h3" marginBottom="30px">
                    {" "}
                    No Posts yet
                  </Heading>
                  <Text>
                    Create your first post and engage with other peoples !!!
                  </Text>
                  <Text>Build Your social family</Text>
                </Card>
              )}
            </Flex>
          )}
        </Box>
      </Stack>
    </Grid>
  );
}
