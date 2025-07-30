import React, { useState, useEffect } from 'react';
import './News.css';
import NewsItem from './Item';
import _ from 'lodash';
import Loading from './Loading';

function Newscomponent(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      props.setProgress(0);
      const url = `https://api.worldnewsapi.com/search-news?api-key=${props.api_key}&source-country=${props.country}&language=en&categories=${props.category}&earliest-publish-date=${props.date}&number=90`;
      setLoading(true);
      const response = await fetch(url, { signal: controller.signal });
      props.setProgress(25);
      const parsedData = await response.json();
      props.setProgress(70);
      const shuffled = _.shuffle(parsedData.news);
      setArticles(shuffled);
      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Fetch failed:", error);
      }
    }
  };

  fetchData();

  // cleanup function to cancel request if component unmounts
  return () => {
    controller.abort();
  };
}, [props.api_key, props.country, props.category, props.date]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredArticles = articles.filter(
    element => element.author != null && element.image != null
  );

  return (
    <div className="container mt-5">
      <h1 className="carousel-title">{props.title}</h1>
      {loading && <Loading />}

      {!loading && (
        <>
          {!isMobile ? (
            <div id="newsCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true" data-bs-wrap="true">
              <div className="carousel-inner">
                {Array.from({ length: Math.floor(filteredArticles.length / 3) }).map((_, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <div className="row">
                      {filteredArticles
                        .slice(index * 3, index * 3 + 3)
                        .map(element => (
                          <div className="col-md-4" key={element.url}>
                            <NewsItem
                              title={element.title.slice(0, 50)}
                              description={element.text.slice(0, 100)}
                              imageUrl={element.image}
                              author={element.author}
                              date={element.publish_date}
                              newsUrl={element.url}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              <a className="carousel-control-prev" href="#newsCarousel" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </a>
              <a className="carousel-control-next" href="#newsCarousel" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </a>

              <ol className="carousel-indicators">
                {Array.from({ length: Math.floor(articles.length / 3) }).map((_, index) => (
                  <li
                    key={index}
                    data-bs-target="#newsCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? 'active' : ''}
                  ></li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="news-scroll-container">
              <div className="news-scroll-row">
                {filteredArticles.map(element => (
                  <div className="news-scroll-card" key={element.url}>
                    <NewsItem
                      title={element.title.slice(0, 50)}
                      description={element.text.slice(0, 100)}
                      imageUrl={element.image}
                      author={element.author}
                      date={element.publish_date}
                      newsUrl={element.url}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Newscomponent;
