import React, { Component } from 'react'
import './News.css'
import NewsItem from './Item'
import _, { set } from 'lodash'
import Loading from './Loading';

export class Newscomponent extends Component {
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false
        }
        document.title=`NewsWorm-${this.props.title}`
    }
    async componentDidMount(){
        this.props.setProgress(0)
      // let url1=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}`
      let url=`https://api.worldnewsapi.com/search-news?api-key=${this.props.api_key}&source-country=${this.props.country}&language=en&categories=${this.props.category}&earliest-publish-date=${this.props.date}&number=90`
      this.setState({loading:true})
      let data=await fetch(url)
      this.props.setProgress(25)
      let parsedData= await data.json()
      console.log(parsedData)
      this.props.setProgress(70)
      // shuffling and setting
      const shfArticle=_.shuffle(parsedData.news)
      console.log(shfArticle)
      this.setState({articles:shfArticle,
        loading:false
      })
      // console.log(this.state.articles)
      this.props.setProgress(100)
    }
  render() {
    const filteredArticles = this.state.articles.filter(
      element => element.author != null && element.image != null
    );
    return (
        <div className="container mt-5">
        <h1 className="carousel-title">{this.props.title}</h1>
        {this.state.loading && <Loading />}
        {!this.state.loading && (
          <div id="newsCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-wrap="true">
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
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#newsCarousel" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>

            <ol className="carousel-indicators">
              {Array.from({ length: Math.floor(this.state.articles.length / 3) }).map((_, index) => (
                <li
                  key={index}
                  data-bs-target="#newsCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                ></li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default Newscomponent
