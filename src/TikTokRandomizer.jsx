import { useEffect, useState } from "react";
import styles from "./TikTokRandomizer.module.css";

function TikTokRandomizer() {
  const [videoUrls, setVideoUrls] = useState([]);
  const [randomVideo, setRandomVideo] = useState("");

  const searchQuery = "uia cat";

  useEffect(() => {
    if (videoUrls.length === 0) {
      const fetchVideos = async () => {
        try {
          const response = await fetch(
            `https://www.tikwm.com/api/feed/search?keywords=${searchQuery}`
          );
          const data = await response.json();
          console.log(data.data);
          if (data.data.videos) {
            setVideoUrls(data.data.videos.map((video) => video.play));
          }
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };

      fetchVideos();
    }
  }, [videoUrls]);

  const generateVideo = () => {
    if (videoUrls.length > 0) {
      const randomIndex = Math.floor(Math.random() * videoUrls.length);
      setRandomVideo(videoUrls[randomIndex]);
      setVideoUrls((prevVideos) =>
        prevVideos.filter((_, index) => index !== randomIndex)
      );
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>UIA Cat Generator</h1>
      <button onClick={generateVideo} className={styles.button}>
        Generate Video
      </button>
      {randomVideo && (
        <div className={styles.videoContainer}>
          <iframe
            src={randomVideo}
            allow="autoplay"
            className={styles.video}
          ></iframe>{" "}
        </div>
      )}
    </div>
  );
}

export default TikTokRandomizer;
