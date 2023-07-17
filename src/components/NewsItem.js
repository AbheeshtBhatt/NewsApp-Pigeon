import React from 'react'

const NewsItem =(props)=> {

    let { title, description, imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span class="badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}<span class="visually-hidden">unread messages</span></span>
          </div>
        
          <img src={!imageUrl?"https://cdn.dribbble.com/users/1027121/screenshots/14874800/media/2d9e4002077d32ef7032fd7a2283d470.gif":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}... </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read full article</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
