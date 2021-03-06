import { Fragment, useState, useEffect } from "react";
import Map from "../Map/Map";
import Post from "../Post/Post";
import AddPost from "../Post/AddPost";
import PostCard from "../UI/Card/PostCard";

const flag = true;

const Alert = ({ token }) => {
  const [posts, setPosts] = useState();
  const [updatedData, setUpdatedData] = useState(flag);
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }),
      (err) => setGeoError(err.message)
    );
  }, []);

  useEffect(() => {
    const url = "https://waste-eliminator-api.us-south.cf.appdomain.cloud/datas"

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPosts(data.datas);
      });
  }, [updatedData]);

  const submitPostHandler = async (payload) => {
    try {
      await fetch(
        "https://waste-eliminator-api.us-south.cf.appdomain.cloud/datas",
        {
          method: "POST",
          body: payload,
          headers: {
            Authorization: token,
          },
        }
      );
      setUpdatedData(!flag);
    } catch (err) {
    }
  };

 
  return (
    <Fragment>
      <Map updatedData={updatedData} styling="post" height="100%" width="68%" />
      <PostCard>
        {token && (
          <AddPost
          onConfirm={submitPostHandler}
          location={location}
          geoError={geoError}
        />
        )}
        {!token && (
          <div>
            <h2 style={{ marginTop: '6rem'}}>You must login to make an alert.</h2>
          </div>
        )

        }
      </PostCard>

      {posts && posts.slice(posts.length-5, posts.length).reverse().map((post) => (
        <PostCard>
          <ul key={post._id}>
            <Post
              id={post._id}
              key={post._id}
              lat={post.location.lat}
              long={post.location.long}
              wasteType={post.wasteType}
              image={post.image}
            />
          </ul>
        </PostCard>
      ))}
    </Fragment>
  );
};

export default Alert;
