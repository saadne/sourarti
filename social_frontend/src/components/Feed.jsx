import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  if (pins?.length == 0)
    return (
      <h1 className="flex justify-center items-center">No Pins Available</h1>
    );

  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner
        loading={loading}
        message={`We are adding ${ideaName} ideas to your feed!`}
      />
    );
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
