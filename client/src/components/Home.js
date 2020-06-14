import React from "react";
import { Anchor, List, Typography } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";

const { Link } = Anchor;

export default function Home() {
  const originalUserStories = [
    "Nothing from my website will be cached in my client as a security measure.",
    "I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.",
    "I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id.",
    "I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount.",
    "I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present).",
    "I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}.",
    "I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.",
    "If I try to request a book that doesn't exist I will get a 'no book exists' message.",
    "I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.",
    "All 6 functional tests required are complete and passing.[Note: I'm ignoring the actual tests]",
  ];
  return (
    <React.Fragment>
      <Typography.Title level={1}>Reno Expo Books</Typography.Title>
      <Typography.Title level={2}>
        The freeCodeCamp Personal Library Project
      </Typography.Title>
      <Typography.Paragraph>
        This project was built as a demonstration of how the Reno Expo stack
        starter kit can be extended. See the repos for Reno Expo and this app
        at:
        <Anchor affix={false}>
          <Link
            href="https://github.com/JacksonBates/reno-expo"
            title="Reno Expo"
          />
          <Link
            href="https://github.com/JacksonBates/reno-expo-books"
            title="Reno Expo Books"
          />
        </Anchor>
      </Typography.Paragraph>
      <Typography.Paragraph>
        This project can be used in two ways. The first is designed to account
        for the user stories mandated by the freeCodeCamp project that inspires
        this app. As such it provides 6 API endpoints that can be publically
        accessed (although I've locked down cross origin requests, since I am
        not actually running the freeCodeCamp tests against this site). These
        are documented in the 'Original User Stories' and API table below.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Additionally, one may create an account and log in. Books created and
        commented on by a particular user can only be seen, commented upon or
        deleted by that user. This means while public users destructive actions
        such as deleting all the public books, such actions will not affect the
        records created by registered users.
      </Typography.Paragraph>
      <Typography.Title level={2}>Original User Stories</Typography.Title>
      <List
        size="small"
        bordered
        dataSource={originalUserStories}
        renderItem={(item) => (
          <List.Item>
            <CheckSquareOutlined /> {item}
          </List.Item>
        )}
      />
    </React.Fragment>
  );
}
