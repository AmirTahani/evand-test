import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from 'redux/Modules/events';
import { load  as loadProvinces } from 'redux/Modules/provinces.js';
import { load as loadCategories } from 'redux/Modules/categories';
import { push } from 'react-router-redux';
import Url from 'helpers/Url';
import { Spinner } from 'cathode';
import Card from 'components/Events/Card';
import Search from 'components/Events/Filter/Search';
import DropDown from 'components/Events/Filter/DropDown';
import Switch from 'components/Events/Filter/Switch';
import Pagination from 'components/Events/Pagination';
import styles from './Test.scss';


@connect(state => ( {
  loading: state.events.loading,
  loaded: state.events.loaded,
  data: state.events.data,
  meta: state.events.meta,
  error: state.events.error,
  categories: state.categories.categories,
  loadingCategories: state.categories.loadingCategories,
  loadedCategories: state.categories.loadedCategories,
  loadedProvinces: state.provinces.loadedProvinces,
  loadingProvinces: state.provinces.loadingProvinces,
  provinces: state.provinces.provinces,

}), {load, push, loadCategories, loadProvinces})
export default class Test extends Component {
  url = new Url();
  nextUrl = null;
  prevUrl = null;
  provinces = [];
  categories = [];

  componentDidMount() {
    this.url.setQuery(this.props.location.query);
    this.props.load(this.url.getQueryString());
    this.props.loadProvinces();
    this.props.loadCategories();
  }

  componentWillReceiveProps(nextProps) {
    const nextQuery = nextProps.location.query;
    const currentQuery = this.props.location.query;
    if (nextQuery !== currentQuery) {
      if(nextQuery['cities'] && nextQuery['cities'] !== currentQuery['cities']) {
        this.props.push(`${this.props.location.pathname}?${this.url.duplicate().setQuery(nextQuery).unSet('online').getQueryString()}`);
      }else {
        this.props.load(this.url.setQuery(nextQuery).duplicate().getQueryString());
      }
    }
  }

  handleSearch(value) {
    const queryString = this.url.duplicate().set('q', value).getQueryString();
    this.props.push(`${this.props.location.pathname}?${queryString}`);
  }

  handleClearFilter() {
    this.url.clearQuery();
    this.props.push(this.props.location.pathname);
  }

  generatePaginationUrl() {
    if (this.props.loaded) {
      const totalPages = Number(this.props.meta.pagination.total_pages);
      const currentPage = Number(this.props.meta.pagination.current_page);
      const nextUrl = this.url.duplicate().set('page', currentPage + 1).getQueryString();
      const prevUrl = this.url.duplicate().set('page', currentPage - 1).getQueryString();
      this.nextUrl = `${this.props.location.pathname}?${nextUrl}`;
      this.prevUrl = `${this.props.location.pathname}?${prevUrl}`;
      if (currentPage == 1) {
        this.prevUrl = null;
      }
      if (currentPage + 1 == totalPages) {
        this.nextUrl = null;
      }
    }
    else {
      return this;
    }
  }

  handleSwitch(value) {
    const {pathname} = this.props.location
    if (value) {
      const queryString = this.url.duplicate().setOnline('yes').getQueryString();
      this.props.push(`${pathname}?${queryString}`);
    }
    else {
      const queryString = this.url.duplicate().setOnline('no').getQueryString();
      this.props.push(`${pathname}?${queryString}`);
    }
  }


  render() {
    const {
      data,
      loaded,
      loading,
      location,
      provinces,
      categories,
      loadedCategories,
      loadingCategories,
      loadedProvinces,
      loadingProvinces
    } = this.props;

    const onlineSwitchChecked = location.query['online'] === 'yes';

    this.generatePaginationUrl();

    if ((!loadingCategories && !loadingProvinces) && (loadedCategories && loadedProvinces)) {
      this.provinces = {
        ...provinces,
        name: 'cities',
        label: 'choose Your City',
        optionValue: option => option.slug,
        optionLabel: option => option.name,
      };
      this.categories = {
        ...categories,
        name: 'categories',
        label: 'choose Your Category',
        optionLabel: option => option.title,
        optionValue: option => option.slug
      }
    }

    return (
      <div className={styles.container}>
        {
          (!loaded && loading) ? <Spinner/> :
            <div>
              <div className="filters">
                <Search onChange={this.handleSearch.bind(this)} value={this.url.duplicate().getQuery()['q']}/>
                <DropDown data={this.provinces} url={this.url} location={location}/>
                <DropDown data={this.categories} url={this.url} location={location}/>
                <Switch label="online" checked={onlineSwitchChecked} onChange={this.handleSwitch.bind(this)}/>
                <button className="clear-filter" onClick={this.handleClearFilter.bind(this)}>Clear Filters</button>
              </div>
              {
                data.map((item, key) => {
                  return <Card
                    src={(item.cover && item.cover.original) ? item.cover.original : null}
                    title={item.name}
                    key={key}
                  />
                })
              }
              <Pagination
                next={this.nextUrl}
                prev={this.prevUrl}
              />

            </div>
        }

      </div>
    );
  }
};
