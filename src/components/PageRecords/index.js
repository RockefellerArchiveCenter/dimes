import React, { Component } from "react";
import { LiveMessage } from "react-aria-live";
import PropTypes from "prop-types";
import axios from "axios";
import queryString from "query-string";
import { Helmet } from "react-helmet";
import ContextSwitcher from "../ContextSwitcher";
import RecordsContent from "../RecordsContent";
import RecordsDetail from "../RecordsDetail";
import PageNotFound from "../PageNotFound";


class PageRecords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      ancestors: {},
      children: [],
      collection: {},
      found: true,
      isAncestorsLoading: true,
      isChildrenLoading: true,
      isContentShown: false,
      isItemLoading: true,
      params: {},
      updateMessage: ""
    }
  }

  componentDidMount() {
    window.onpopstate = () => {
      this.setState({...this.props.location.state})
      this.setState({ isItemLoading: false });
    }
    const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}/${this.props.match.params.type}/${this.props.match.params.id}`
    const params = queryString.parse(this.props.location.search);
    const childrenParams = {...params, limit: 5}
    this.setState({ params: params })
    axios
      .get(`${itemUrl}?${queryString.stringify(params)}`)
      .then(res => {
        this.setState({ item: res.data });
        this.setState({ isItemLoading: false });
        this.setState({ collection: res.data })
      })
      .catch(err => this.setState({ found: false }));
    axios
      .get(`${itemUrl}/ancestors`)
      .then(res => {
        this.setState({ ancestors: res.data });
        this.setState({ isAncestorsLoading: false });
        res.data.length && this.setState({ ancestors: res.data.slice(0)[0] })
      })
      .catch(err => this.setState({ found: false }));
    this.getPage(`${itemUrl}/children/?${queryString.stringify(childrenParams)}`)
  };

  getPage = uri => {
    axios
      .get(uri)
      .then(res => {
          this.setState({ children: [...this.state.children].concat(res.data.results)});
          this.state.isChildrenLoading && this.setState({ isChildrenLoading: false });
          res.data.next && this.getPage(res.data.next)
        }
      )
      .catch(err => console.log(err))
  }

  /** Updates state with item found at URL. */
  setActiveRecords = uri => {
    if (uri !== this.state.item.uri) {
      this.setState({isItemLoading: true})
      this.setState({isAncestorsLoading: true})
      const itemUrl = `${process.env.REACT_APP_ARGO_BASEURL}/${uri}`
      axios
        .get(`${itemUrl}?${queryString.stringify(this.state.params)}`)
        .then(res => {
          this.setState({ item: res.data });
          this.setState({ updateMessage: `Details under heading 1 have been updated to describe the selected records titled ${res.data.title}`})
          this.setUrl(`${uri}?${queryString.stringify(this.state.params)}`, res.data);
        })
        .catch(e => console.log(e))
        .then(() => this.setState({isItemLoading: false}));
      axios
        .get(`${itemUrl}/ancestors?${queryString.stringify(this.state.params)}`)
        .then(res => {
          this.setState({ ancestors: res.data })
        })
        .catch(e => console.log(e))
        .then(() => this.setState({isAncestorsLoading: false}));
    }
}

  /** Pushes a URL and state into browser history */
  setUrl = (uri, itemData) => {
    this.props.history.push(uri, {...this.state, item: itemData})
  }

  toggleIsContentShown = () => {
    this.setState({ isContentShown: !this.state.isContentShown })
  }

  render() {
    const { savedList, toggleInList } = this.props;
    if (!this.state.found) {
      return (<PageNotFound />)
    }
    return (
      <React.Fragment>
        <LiveMessage message={this.state.updateMessage} aria-live="polite" />
        <Helmet>
          <title>{ this.state.item.title }</title>
        </Helmet>
        <div className="container--full-width">
          <ContextSwitcher
            isContentShown={this.state.isContentShown}
            toggleIsContentShown={this.toggleIsContentShown} />
          <RecordsDetail
            ancestors={this.state.ancestors}
            isAncestorsLoading={this.state.isAncestorsLoading}
            isContentShown={this.state.isContentShown}
            isItemLoading={this.state.isItemLoading}
            item={this.state.item}
            params={this.state.params}
            savedList={savedList}
            toggleInList={toggleInList} />
          <RecordsContent
            children={this.state.children}
            collection={this.state.collection}
            isContentShown={this.state.isContentShown}
            params={this.state.params}
            parent={this.state.item}
            savedList={savedList}
            setActiveRecords={this.setActiveRecords}
            toggleInList={toggleInList}
            toggleIsLoading={this.toggleIsLoading} />
        </div>
      </React.Fragment>
    )
  }
}

PageRecords.propTypes = {
  savedList: PropTypes.object.isRequired,
  toggleInList: PropTypes.func.isRequired,
}

export default PageRecords;
