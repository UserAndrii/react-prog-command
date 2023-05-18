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
    // isEmpty: false,
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
      // if (photos.length === 0) {
      //   this.setState({ isEmpty: true });
      // }
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
  onLoadMoreButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, total, error, value } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {error && <Text>Error</Text>}
        {value !== '' && images.length === 0 && <Text>No images</Text>}
        {images.length > 0 && (
          <Grid>
            {images.map(({ id, avg_color, alt, src }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
          </Grid>
        )}
        {images.length > 0 && images.length < total && (
          <Button onClick={this.onLoadMoreButtonClick}>Load more</Button>
        )}
      </>
    );
  }
}
