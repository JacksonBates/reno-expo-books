import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Comment, List, Input, Typography, Button } from "antd";
import { API } from "../helpers/api";

const { TextArea } = Input;

export default function PublicComment(props) {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    API({ endpoint: `/api/books/${location.state.id}` }).then((response) =>
      setData(response)
    );
  }, [location]);

  const submitComment = () => {
    if (comment) {
      API({
        endpoint: `/api/books/${location.state.id}`,
        method: "POST",
        data: { comment },
      }).then((response) => {
        setData(response);
        setComment(null);
      });
    }
  };

  console.log(location);
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
        <Link to="/public">Return to Public Library</Link>
      </Button>
      <List
        header={`${data?.BookComments?.length} comments`}
        dataSource={data?.BookComments?.sort((a, b) => b.id - a.id)}
        renderItem={(item) => (
          <List.Item>
            <Comment content={item.comment} />
          </List.Item>
        )}
      />
    </React.Fragment>
  );
}
