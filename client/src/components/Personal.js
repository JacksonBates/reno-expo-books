import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import { Button, Input, Table, Typography, message, Form } from "antd";
import { API } from "../helpers/api";

export default function Personal() {
  const { authTokens } = useAuth();
  const [data, setData] = useState([]);
  const [book, setBook] = useState(null);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    API({ endpoint: "/api/user/books" }, authTokens).then((response) =>
      setData(response)
    );
  }, [fetch]);

  const handleDelete = (id) => {
    API(
      { endpoint: `/api/user/books/${id}`, method: "DELETE" },
      authTokens
    ).then(() => {
      message.success("Book deleted", 3);
      setFetch(!fetch);
    });
  };

  const handleDeleteAll = () => {
    API({ endpoint: "/api/user/books", method: "DELETE" }, authTokens).then(
      () => {
        message.success("All books deleted", 3);
        setFetch(!fetch);
      }
    );
  };

  const handleSubmit = (e) => {
    API(
      {
        endpoint: "api/user/books",
        method: "POST",
        data: { title: book },
      },
      authTokens
    ).then(() => {
      message.success("Book added", 3);
      setFetch(!fetch);
    });
  };

  const columns = [
    { title: "", key: "id", dataIndex: "id", render: () => null },
    { title: "Title", key: "title", dataIndex: "title" },
    { title: "Comment Count", key: "commentcount", dataIndex: "commentcount" },
    {
      title: "",
      key: "actions",
      dataIndex: "id",
      render: (id) => {
        return (
          <span style={{ float: "right" }}>
            <Button type="primary" ghost style={{ marginRight: 5 }}>
              <Link to={{ pathname: `/personal/book/${id}`, state: { id } }}>
                View Comments
              </Link>
            </Button>
            <Button type="danger" ghost onClick={() => handleDelete(id)}>
              Delete Book
            </Button>
          </span>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Typography.Title level={1}>Personal Library</Typography.Title>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Add a book: ">
          <Input value={book} onChange={(e) => setBook(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            ghost
            onClick={handleSubmit}
            style={{ float: "right" }}
          >
            Add book
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={data.sort((a, b) => b.id - a.id)}
        columns={columns}
        rowKey={columns[0].key}
      />

      <Button type="danger" block onClick={handleDeleteAll}>
        Delete All Books
      </Button>
    </React.Fragment>
  );
}
