import React, { Component } from 'react';
import MasterMobielComponent from '../common/main.component.jsx';
import { browserHistory } from 'react-router';

class MobileCompare extends MasterMobielComponent {
    handleRedirect(){
        browserHistory.push('/mobiles');
    }
    render(){
        var self = this;
        self.mobileSkuList = this.props.location.query.mobileSku.split(',');
        self.mobilesDetails = this.props.route.data[0];
        self.mobileCompareList = [];
        self.mobileSkuList.forEach(function(item){
            self.mobileCompareList.push(self.mobilesDetails[item]);
        });
        const compareNode = self.mobileCompareList.map(function(mobile){
            return (
                <div className="col-xs-3 compare-title-box">
                    <div className="image-container">
                        <img src={mobile.imageUrl} className="img-responsive"/>
                    </div>
                    <div className="mobile-name">{mobile.productName}</div>
                    <div className="compare-price">SGD {mobile.price}</div>
                    <div className="available-in">Available At: {mobile.availableLocation}</div>
                </div>
            )
        });
        return (
            <div className="col-xs-12">
                <div className="col-xs-3">
                    <div className="compare-title">Compare</div>
                    <div className="item-number">{self.mobileCompareList.length} items</div>
                </div>
                {compareNode}
            </div>
        );
    }
}

export default MobileCompare