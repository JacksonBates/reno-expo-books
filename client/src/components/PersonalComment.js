import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Comment, List, Input, Typography, Button } from "antd";
import { API } from "../helpers/api";
import { useAuth } from "../context/auth";

const { TextArea } = Input;

export default function PersonalComment(props) {
  console.log("hello");
  const location = useLocation();
  const { authTokens } = useAuth();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    API(
      { endpoint: `/api/user/books/${location.state.id}` },
      authTokens
    ).then((response) => setData(response));
  }, [location]);

  const submitComment = () => {
    if (comment) {
      API(
        {
          endpoint: `/api/user/books/${location.state.id}`,
          method: "POST",
          data: { comment },
        },
        authTokens
      ).then((response) => {
        setData(response);
        setComment(null);
      });
    }
  };

  return (
    <React.Fragment>
      <Typography.Title level={1}>{data?.title}</Typography.Title>
      <TextArea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button
        type="primary"
        ghost
        onClick={submitComment}
        style={{ marginTop: 5 }}
        disabled={!comment}
      >
        Submit Comment
      </Button>
      <Button style={{ marginTop: 5, marginLeft: 5 }}>
        <Link to="/personal">Return to Personal Library</Link>
      </Button>
      <List
        header={`${data?.BookComments?.length} comments`}
        dataSource={data?.BookComments?.sort((a, b) => b.id - a.id)}
        renderItem={(item, index) => (
          <List.Item key={index + "--" + item.id}>
            <Comment content={item.comment} />
          </List.Item>
        )}
      />
    </React.Fragment>
  );
}
