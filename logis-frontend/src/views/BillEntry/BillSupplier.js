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
        super()
        this.state = {
            form: {},
            supData: [],
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
        this.setState({ ...this.state, showModal: value });
    }

    componentDidMount() {

        let isFullInfo = this.props.location.state.isFullInfo
        if (!isFullInfo) {
            this.props.history.push("/bill-entry")
            return
        }

        let { billEntryInfo } = this.props.location.state
        let supData = [...this.props.location.state.supData]

        this.setState({
            form: { ...billEntryInfo },
            supData: [...supData]
        }, () => {
            this.clearHistoryParams()
            this.initAnimationList()
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
        // const history = createHistory();
        const history = this.props.history
        let state = { ...history.location.state };
        delete state.billEntryInfo;
        delete state.supData;
        delete state.isFullInfo;
        history.replace({ ...history.location, state });
    }

    totalPackages = () => {
        if (this.state.supData) return this.state.supData.length
        return 0
    }

    totalAmount = () => {
        if (0 != this.totalPackages()) return this.state.supData[0].totalAmount
        return 0
    }

    strDateSpan = (packageItem) => {
        let totalTransitTime = 0.00
        for (let item of packageItem.suggestionDetailDTOS) {
            totalTransitTime = totalTransitTime + item.transitTime ? item.transitTime : 0
        }
        const floorTime = Math.floor(totalTransitTime)
        const ceilTime = Math.ceil(totalTransitTime)

        if (floorTime == 0) return ceilTime.toString()
        return `${floorTime} - ${ceilTime} `
    }

    continueBillDelivery = (e) => {
        e.preventDefault()

        let rr_ids = []
        this.state.supData[0].suggestionDetailDTOS.forEach(item => {
            // let rr_idObj = { rr_id: item.rulRateId }
            rr_ids.push(item.rulRateId)
        });

        this.setState({
            form: { ...this.state.form, rr_id: rr_ids }
        }, () => {
            this.props.history.push('/bill-delivery', { billSupplierInfo: { ...this.state.form }, isFullSupplierInfo: true })
        })

    }


    // renderSupItem(item, index) {

    //     return (
    //         <div className="liWrap liEl row mt-4 mb-3" key={++index}>
    //             <Link to="" onClick={e => { this.onSelectSupplierItem(e, item, index) }} className="hideLink appTheme col-md-12">
    //                 <div className="supItem col-md-12">
    //                     {index != 1 ? <span></span> :
    //                         <div className="supItem-header ">
    //                             <span className="bestPackage">Gói dịch vụ tốt nhất</span>
    //                         </div>
    //                     }
    //                     <div className="supItem-body">
    //                         <input type="checkbox" className="supItemCheck" />
    //                         <span className="supItemNo">{index}</span>
    //                         <div className="supInfoContainer col-md-2">
    //                             <img className="supImg" src="https://cdn.nhanh.vn/cdn/store/26/artCT/22280/dich_vu_van_chuyen_ghn_express_1.png" alt="no-image"></img>
    //                             <h4 className="appTheme upc">{item.companyName}</h4>
    //                         </div>
    //                         <div className="supInfoContainer col-md-5 col-sm-12 txt-center">
    //                             <span>Miễn phí dịch vụ bóc gỡ hàng hóa</span>
    //                             <span>Thời gian vận chuyển: <span className="appTheme font-weight-bold">2-3 ngày</span></span>
    //                         </div>
    //                         <div className="supInfoContaine price-container col-md-4 col-sm-12 txt-center mb-2" >
    //                             <h5 className=" font-weight-bold">Giá vận chuyển: <span className="appTheme">
    //                                 <NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true} /> VND</span></h5>
    //                             <span className="appTheme">Loại hình vận chuyển: Xe Container 5T</span>
    //                         </div>

    //                     </div>
    //                 </div>
    //             </Link>
    //             {/*!== Item */}
    //         </div>
    //     )
    // }

    renderSupItem(item, index) {

        return (
            <div className="liWrap liEl row mt-4 mb-3" >
                <Link to="" onClick={e => { this.onSelectSupplierItem(e, item, index) }} className="hideLink appTheme col-md-12">
                    <div className="supItem col-md-12">
                        <div className="supItem-header ">
                            <span className="bestPackage">Gói dịch vụ tốt nhất</span>
                        </div>
                        <div className="supItem-body">
                            <div className="supInfoContaine price-container col-md-6 col-sm-12 txt-center mb-2" >
                                <h2 className=" font-weight-bold">Giá vận chuyển: <span className="appTheme">
                                    <NumberFormat value={item.totalAmount} displayType={'text'} thousandSeparator={true} /> VND</span></h2>
                            </div>
                            <div className="supInfoContainer col-md-6 col-sm-12 txt-center">
                                <h2>Thời gian vận chuyển: <span className="appTheme font-weight-bold">{this.strDateSpan(item)} ngày</span></h2>
                            </div>
                        </div>
                    </div>
                </Link>
                {/*!== Item */}
            </div>
        )
    }


    render() {

        const bestPackage = this.state.supData[0]
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
                                <li className="breadcrumb-item active" aria-current="page"> <span>Chọn nhà vận chuyển</span></li>

                            </ol>
                        </nav>
                        {/* <h5 className="headingContentTitle linetop-space">Tổng: {<NumberFormat value={this.totalAmount()} displayType={'text'} thousandSeparator={true} />}</h5> */}
                        <div className="liContainer slide-fade">
                            {
                                (this.totalPackages() == 0) ? <span>Không tìm thấy nhà vận chuyển</span> :
                                    this.renderSupItem(bestPackage, 1)
                            }
                        </div>
                        <div className="d-flex mt-5">
                            <button type="button" onClick={this.continueBillDelivery} className="btn btn-mainColor btn-lg ml-auto mr-auto mt-auto">Tiếp tục</button>
                        </div>
                    </form>
                </div>
                <BillSupplierDetailModal supItem={bestPackage} showModal={this.state.showModal} setShowModal={this.setShowModal} />
            </div >
        )
    }
}
