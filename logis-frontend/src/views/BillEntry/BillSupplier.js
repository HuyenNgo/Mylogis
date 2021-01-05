import React, { createRef } from 'react'
import { Topbar } from './../../components'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import createHistory from 'history/createBrowserHistory'
import BillSupplierDetailModal from './../shared/BillSupplierDetailModal'
import NumberFormat from 'react-number-format';
import $ from 'jquery'

export class BillSupplier extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {},
            suggestions: [],
            showModal: false,
            selectedSupItem: {}
        }
    }

    //events
    // updateField = e => {
    //     setState(
    //         () => this.state.form[`${e.target.name}`] = e.target.value
    //     );
    // };

    onSelectSupplierItem = (e, item, index) => {
        e.preventDefault()
        console.log(e)
        this.setState({
            selectedSupItem: item
        }, () => {
            this.setShowModal(true)
        })
    };

    setShowModal = (value) => {
        // this.setState({ ...this.state, showModal: value })
        this.setState({ ...this.state, showModal: value });
    }

    componentDidMount() {

        let isFullInfo = this.props.location.state.isFullInfo
        if (!isFullInfo) {
            this.props.history.push("/bill-entry")
            return
        }

        let billEntryInfo = { ...this.props.location.state.billEntryInfo }
        let suggestions = this.props.location.state.suggestions

        this.setState({
            form: { ...this.state.form, billEntryInfo },
            suggestions: [...suggestions]
        }, () => {
            this.clearHistoryParams()
            this.initAnimationList()
            //load suggestion
        })
    }

    initAnimationList = () => {
        $(".liEl").each(function (index) {
            let el = $(this)
            setTimeout(function () {
                el.addClass("show")
            }, 10);
        });
    }

    clearHistoryParams = () => {
        const history = createHistory();
        let state = { ...history.location.state };
        delete state.billEntryInfo;
        delete state.suggestions;
        delete state.isFullInfo;
        history.replace({ ...history.location, state });
    }

    totalSuggestions() {
        if (this.state.suggestions) return this.state.suggestions.length
        return 0
    }


    renderSupItem(item, index) {

        return (
            <div className="liWrap liEl row mt-4 mb-3" key={++index}>
                <Link to="" onClick={e => { this.onSelectSupplierItem(e, item, index) }} className="hideLink appTheme col-md-12">
                    <div className="supItem col-md-12">
                        {index != 1 ? <span></span> :
                            <div className="supItem-header ">
                                <span className="bestPackage">Gói dịch vụ tốt nhất</span>
                            </div>
                        }
                        <div className="supItem-body">
                            <input type="checkbox" className="supItemCheck" />
                            <span className="supItemNo">{index}</span>
                            <div className="supInfoContainer col-md-2">
                                <img className="supImg" src="https://cdn.nhanh.vn/cdn/store/26/artCT/22280/dich_vu_van_chuyen_ghn_express_1.png" alt="no-image"></img>
                                <h4 className="appTheme upc">{item.companyName}</h4>
                            </div>
                            <div className="supInfoContainer col-md-5 col-sm-12 txt-center">
                                <span>Miễn phí dịch vụ bóc gỡ hàng hóa</span>
                                <span>Thời gian vận chuyển: <span className="appTheme font-weight-bold">2-3 ngày</span></span>
                            </div>
                            <div className="supInfoContaine price-container col-md-4 col-sm-12 txt-center mb-2" >
                                <h5 className=" font-weight-bold">Giá vận chuyển: <span className="appTheme">
                                    <NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true} /> VND</span></h5>
                                <span className="appTheme">Loại hình vận chuyển: Xe Container 5T</span>
                            </div>

                        </div>
                    </div>
                </Link>
                {/*!== Item */}
            </div>
        )
    }

    render() {
        return (
            <div className="page-container">
                <Topbar
                    title={'Chọn nhà vận chuyển'}
                    isOnlyTitle={true}
                    separateLine="light"
                />
                <div className="page-content pad-horizon-5">
                    <form id="formInput" className="filterForm">

                        {/* Breadcumb */}
                        <nav aria-label="breadcrumb mb-3">
                            <ol className="breadcrumb breadcrumb--noColor">
                                <li className="breadcrumb-item " > <Link to="/bill-entry" className="zzz">  <span className="material-icons">receipt</span>
                                    <span>Lập đơn hàng</span>
                                </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page"> <span>Chọn nhà cung cấp</span></li>

                            </ol>
                        </nav>
                        <h5 className="headingContentTitle--themeColor linetop-space">Tổng: {this.totalSuggestions()}</h5>
                        <div className="liContainer slide-fade">
                            {
                                (!this.state.suggestions || this.state.suggestions && this.state.suggestions.length == 0) ? <span>Không tìm thấy nhà vận chuyển</span> :
                                    this.state.suggestions.map((item, index) => {
                                        return this.renderSupItem(item, index)
                                    })
                            }
                        </div>
                        <div className="d-flex mt-5">
                            <button type="button" className="btn btn-mainColor btn-lg ml-auto mr-auto mt-auto">Hoàn thành</button>
                        </div>
                    </form>
                </div>
                <BillSupplierDetailModal supItem={this.state.selectedSupItem} showModal={this.state.showModal} setShowModal={this.setShowModal} />
            </div >
        )
    }
}
