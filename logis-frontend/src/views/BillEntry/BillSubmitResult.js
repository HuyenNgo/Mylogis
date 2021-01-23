import React, { createRef } from 'react'
import { Topbar } from './../../components'
import { notifier } from './../../helpers'
import { Link } from "react-router-dom";
export class BillSubmitResult extends React.Component {

    constructor(props) {
        super()
        this.state = {
            submitResult: {
                message: ''
            }
        }
        console.log(this)
    }
    componentDidMount() {




        let submitResult = this.props.location.state.submitResult
        if (!submitResult) {
            submitResult = { message: 'Lập đơn thất bại' }
        }

        this.setState({
            submitResult: { ...submitResult }
        }, () => {
            this.clearHistoryParams()
        })
    }


    clearHistoryParams = () => {
        const history = this.props.history
        let state = { ...history.location.state };
        delete state.submitResult;
        this.props.history.replace({ ...history.location, state });
    }


    render() {
        return (
            <div className="page-container">
                <Topbar
                    title={'Thông tin giao hàng'}
                    isOnlyTitle={true}
                    separateLine="light"
                />
                <div className="page-content pad-horizon-5">
                    <form id="formInput" className="filterForm">
                        {/* Breadcumb */}
                        <nav aria-label="breadcrumb bill mb-3">
                            <ol className="breadcrumb breadcrumb--noColor">
                                {/* <li className="breadcrumb-item " >
                                    <Link to="/bill-entry" className="zzz">  <span className="material-icons">receipt</span>
                                        <span>Lập đơn hàng</span>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <span>Thông tin nhà vận chuyển</span>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <span>Thông tin gửi hàng</span>
                                </li> */}
                            </ol>
                        </nav>

                        {/* Bill info */}
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="appTheme linetop-space">{this.state.submitResult.message}!</h5>
                                <span className="appTheme linetop-space">Tra cứu lịch sử giao dịch tại trang  <Link to="/bill">Quản lý đơn hàng</Link></span>
                            </div>
                        </div>
                    </form >
                </div >
            </div >
        )
    }
}
