import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    search: '',
  };

  onInputChange = e => {
    this.setState({ search: e.target.value });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search.trim().toLowerCase());
    this.setState({ search: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onSubmitForm}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          value={this.state.search}
          onChange={this.onInputChange}
          required
          autoFocus
        />
      </SearchFormStyled>
    );
  }
}
