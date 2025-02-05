import { useEffect, useState, useRef } from "react";
import styles from "./TikTokRandomizer.module.css";

function TikTokRandomizer() {
  const [videoUrls, setVideoUrls] = useState([]);
  const [randomVideo, setRandomVideo] = useState("");
  const [cursor, setCursor] = useState(0);
  const titleOn = useRef(true);

  const searchQuery = "uia cat";

  useEffect(() => {
    if (videoUrls.length === 0) {
      const fetchVideos = async () => {
        try {
          const response = await fetch(
            `https://www.tikwm.com/api/feed/search?keywords=${searchQuery}&cursor=${cursor}`
          );
          const data = await response.json();
          if (!data.data.hasMore) {
            setCursor(0);
          } else {
            setCursor((c) => c + 10);
          }
          if (data.data.videos) {
            setVideoUrls(data.data.videos.map((video) => video.play));
          }
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };

      fetchVideos();
    }
  }, [videoUrls, cursor]);

  const generateVideo = () => {
    if (videoUrls.length > 0) {
      const randomIndex = Math.floor(Math.random() * videoUrls.length);
      setRandomVideo(videoUrls[randomIndex]);
      setVideoUrls((prevVideos) =>
        prevVideos.filter((_, index) => index !== randomIndex)
      );
    }
  };

  const hideTitle = () => {
    if (titleOn.current) {
      titleOn.current = false;
    }
  };

  return (
    <div className={styles.container}>
      {titleOn.current && <h1 className={styles.title}>UIA Cat Generator</h1>}
      <button
        onClick={() => {
          generateVideo();
          hideTitle();
        }}
        className={styles.button}
      >
        Generate Video
      </button>
      {randomVideo && (
        <div className={styles.videoContainer}>
          <iframe
            src={randomVideo}
            allow="autoplay"
            className={styles.video}
          ></iframe>
        </div>
      )}
      <p>
        <a href={randomVideo}>Link to video</a>
      </p>
    </div>
  );
}

export default TikTokRandomizer;
