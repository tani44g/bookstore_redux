import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore,combineReducers} from 'redux';
import {bindActionCreators} from 'redux';
import BookReducer from './reducers/reducer_books';
import ActiveBook from './reducers/reducer_active_books';
import {selectBook} from './actions/index'

var createReactClass = require('create-react-class');

var rootReducer = combineReducers({
    books: BookReducer,
    activeBook: ActiveBook
})

var store = createStore(rootReducer);

function mapStateToProps(state){
    return{
        books : state.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({sb: selectBook}, dispatch)
}

const BookDetails = createReactClass({
    render(){
        if(!this.props.books){
            return <div className="two">Select a book to get details</div>
        }
        return(
            <div>
                <h3> Book details are </h3>
                <div className="one">Title: {this.props.books.title}</div>
                <div className="one">Pages: {this.props.books.pages}</div>
                <div className="one">Author: {this.props.books.Author}</div>
            </div>
        )
    }
})


const BookList = createReactClass({
    renderList() {
        return this.props.books.map((book)=>{
            return (
                <li className="list-group-item" key={book.title} onClick = {()=> this.props.sb(book)}>
                {book.title}</li>
            )
        })
    },

    render(){
        return(
            <div>
                <ul className="list-group">
                    {this.renderList()}
                </ul>
            </div>
        )
    }
})


const BookListContainer =  connect(mapStateToProps, mapDispatchToProps)(BookList);

function mapStateToProps1(state){
    return{
        books: state.activeBook
    }
}





const BookDetailContainer = connect(mapStateToProps1, mapDispatchToProps)(BookDetails)

ReactDOM.render(
    <Provider store={store}>
        <div className="container">
            <div className="head"><h2>Book Details</h2></div>
            <div className="blockl"><BookListContainer/></div>
            <div className="blockr"><BookDetailContainer/></div>
        </div>
    </Provider>,
    document.getElementById('root')
    
)