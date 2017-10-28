import React, { Component } from 'react';
import { Link } from 'react-router';

class MobileList extends Component {
    constructor(props) {
        super(props);
        this.onAddToCompare = this.onAddToCompare.bind(this);
        this.state = {
            itemsToCompare: [],
            totalItems: 0,
            isChecked: true
        };
        this.selectedItems = '';
    }
    onAddToCompare({target}) {
        if(!target.checked) {
            this.setState({
                itemsToCompare: this.state.itemsToCompare.filter((_, i) => i !== this.state.itemsToCompare.indexOf(target.value))
            }, function(){
                this.state.totalItems = this.state.itemsToCompare.length;
                this.selectedItems = this.state.itemsToCompare.join();
            });
        } else {
            if(this.state.totalItems <= 3 && this.state.itemsToCompare.indexOf(target.value) === -1) {
                this.setState({
                    itemsToCompare: [...this.state.itemsToCompare, target.value]
                }, function() {
                    this.state.totalItems = this.state.itemsToCompare.length;
                    this.selectedItems = this.state.itemsToCompare.join();
                });
            } else {
                alert('Please select at most 3');
                target.checked = false;
                return false;
            }
            
        }
    }
    render() {
        var self = this;
        // Get data from route props
        self.mobileData = this.props.route.data;
        // Map through cars and return linked cars
        self.mobileList = [];
        Object.keys(self.mobileData[0]).forEach(function (key) {
            self.mobileList.push(self.mobileData[0][key]);
        });
        const mobileNode = self.mobileList.map((mobile) => {
            return (
                <div className="col-xs-12 mobile-list-box">
                    <div className="col-xs-2">
                        <div className="image-box">
                            <img src={mobile.imageUrl} alt={mobile.productName} className="img-responsive" />
                        </div>
                        <div className="checkbox checkbox-container">
                            <label><input type="checkbox" value={mobile.sku} onChange={this.onAddToCompare.bind(this)}/>Add to Compare</label>
                        </div>
                    </div>
                    <div className="col-xs-10 no-padding">
                        <div className="col-xs-12 clearfix">
                            <div className="title text-left">{mobile.productName}</div>
                            <div className="item-price text-right">SGD {mobile.price}</div>
                        </div>
                        <div className="col-xs-12 sub-title">{mobile.mainSpecification}</div>
                        <div className="col-xs-12"><span className="rating-box">{mobile.rating} &#x2606;</span></div>
                        <div className="col-xs-12">
                            <ul className="desc-list clearfix">
                                {
                                    mobile.productDescription.map((desc) => {
                                        return <li>{desc}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className="main-list-page">
                <h1>Mobile List Page</h1>
                <div className="list-group">
                    {mobileNode}
                </div>
                {
                    this.state.totalItems > 0 ? <div className="compare-select-container">
                    <Link to={{ pathname:"/mobiles", query: {mobileSku: this.selectedItems} }}><button className="primary-button"> Compare <div>{this.state.totalItems}</div></button></Link>
                </div> : ''
                }
            </div>
        );
    }
}

export default MobileList
