import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Layout from "../components/Layout";
function NewsDesc() {
  const [loading, setLoading] = useState(false);
  const [newsItem, setNewsItem] = useState(null);

  const { id } = useParams(); // This retrieves the 'id' from the URL

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8000/api/newsitems/getnewsitemby/${id}`
      );
      setNewsItem(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setError('Failed to fetch data')
    } finally {
      setLoading(false);
    }
  };

  console.log(newsItem);
  useEffect(() => {
    getData();
  }, [id]); // This ensures getData reruns when 'id' changes

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-5">
          <h1 className="my-3 text-2xl font-semibold">
            {newsItem !== null && newsItem.title}
          </h1>
          <hr />
          <p>{newsItem !== null && newsItem.description}</p>
          <hr />
          <p>{newsItem !== null && newsItem.content}</p>
          <hr />
          <p>{newsItem !== null && newsItem.postedBy.email}</p>
          <hr />
        </div>
      )}
    </Layout>
  );
}

export default NewsDesc;
