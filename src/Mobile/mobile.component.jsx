import React, { Component } from 'react';
import { Link } from 'react-router';

class MobileList extends Component {
    constructor(props) {
        super(props);
        this.onAddToCompare = this.onAddToCompare.bind(this);
        this.state = {
            totalItems: Number(0)
        };
        this.selectedItems = '';
        this.itemsToCompare = [];
    }
    onAddToCompare({target}) {
        let arrayIndex = this.itemsToCompare.indexOf(target.value); 
        if(this.itemsToCompare.length === 0 || arrayIndex === -1) {
            this.setState({ 
                totalItems: this.state.totalItems + 1,
            }, console.log(this.itemsToCompare));
            this.itemsToCompare = this.itemsToCompare.concat(target.value);
            this.selectedItems = this.itemsToCompare.join();
            
        } else {
            this.itemsToCompare = this.itemsToCompare.filter((_, i) => i !== arrayIndex);
            this.selectedItems = this.itemsToCompare.join();
            this.setState({
                totalItems: this.state.totalItems - 1,
            }, console.log(this.itemsToCompare));
        }
    }
    render() {
        var self = this;
        self.mobileData = this.props.route.data;
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
                            <label><input type="checkbox" value={mobile.sku} id={mobile.sku} onChange={this.onAddToCompare.bind(this)}/>Add to Compare</label>
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
