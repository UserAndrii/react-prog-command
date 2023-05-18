import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      this.getImeges(value, page);
    }
  }

  getImeges = async (qwery, page) => {
    try {
      const { photos, total_results } = await ImageService.getImages(
        qwery,
        page
      );
      this.setState(({ images, total }) => ({
        images: [...images, ...photos],
        total: total_results,
      }));
    } catch (error) {
      this.setState({ error: true });
    }
  };

  onSubmit = searhValue => {
    this.setState({
      value: searhValue,
      page: 1,
      images: [],
      total: 0,
      error: null,
    });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
