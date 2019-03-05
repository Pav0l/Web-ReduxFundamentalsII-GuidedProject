import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shape, string, arrayOf, func } from 'prop-types';
import Quote from './Quote';
import { deleteQuote, makeQuoteOfTheDay } from '../App';


export class Quotes extends React.Component {
  render() {
    return (
      <div>
        <h3>My Favorite Quotes</h3>
        <div>
          {
            // is <Quote /> getting everything it needs?
            this.props.quotes.map(quote => (
              <Quote
                key={quote.id}
                quote={quote}
                makeQuoteOfTheDay={this.props.makeQuoteOfTheDay}
                deleteQuote={this.props.deleteQuote}
                isQuoteOfTheDay={quote.id === this.props.quoteOfTheDay}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Quotes.propTypes = {
  // data from state:
  quotes: arrayOf(shape({
    id: string.isRequired,
    author: string.isRequired,
    text: string.isRequired,
  })).isRequired,
  quoteOfTheDay: string,
  // functions that change state:
  makeQuoteOfTheDay: func,
  deleteQuote: func,
};

// Keys returned from this FN will be used as props from Redux state
function mapStateToProps(state) {
  return {
    quotes: state.quotes,
    quoteOfTheDay: state.quoteOfTheDay,
  };
}

// you dispatch action creators to component
// this can be done in the connect HOC 2nd arg { deleteQuote, makeQouteOfTheDay }
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteQuote,
    makeQuoteOfTheDay,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
