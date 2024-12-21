import React, { Component } from 'react'
import './News.css'
export class Item extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date}=this.props
    return (
      <div className="card">
          <img src={imageUrl} className="card-img-top news-image" alt="News Image"/>
          <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-body-secondary">By {author} on { new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} className="btn btn-primary">Read More</a>
          </div>
      </div>
    )
  }
}

export default Item
