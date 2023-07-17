import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner"
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title=`Pigeon-${this.props.category}`
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ced00dacc1314ae5a630f3f77f506d36&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(50)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    })
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1,
    })
    this.updateNews();
  }

  fetchMoreData = async() => {
   this.setState({page:this.state.page+1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ced00dacc1314ae5a630f3f77f506d36&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   let data = await fetch(url);
   let parsedData = await data.json();
   this.setState({
     articles: this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults
     })
  };

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: '40px 0px' }}>Pigeon- Top {this.props.category} headlines </h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  newsUrl={element.url}
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        </>
    );
  }
}

export default News;
