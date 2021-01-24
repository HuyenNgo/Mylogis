import React from 'react'
import { Topbar } from './../../components'
import Select from 'react-select'
import { DataOptions } from './../../common'
import { Link } from "react-router-dom";
import $ from 'jquery'
import { notifier } from './../../helpers'
import { createOrderProxy } from './../../api'
export class BillDelivery extends React.Component {

    constructor(props) {
        super()
        this.state = {
            form: {}
        }
        console.log(this)
    }
    updateField = (e) => {
        this.setState({
            form: { ...this.state.form, [e.target.name]: e.target.value }
        });
    };


    updateSelectField = (newValue, fieldName, callbackFn = undefined) => {
        const val = newValue ? newValue.value : undefined
        this.setState({
            form: { ...this.state.form, [fieldName]: val }
        }, () => {
            if (callbackFn)
                callbackFn()
        });
    }

    getInvalidMessage = () => {
        let errMessage = ''

        let isValid = $("#formInput")[0].checkValidity()

        if (!isValid) {
            errMessage = 'Form không hợp lệ'
            return errMessage
        }

        return errMessage
    }

    submit = (e) => {
        e.preventDefault()
        let errMessage = this.getInvalidMessage()
        if (errMessage) {
            notifier.showErrorMessage(errMessage)
            return
        }

        notifier.showWaiting()
        setTimeout(() => {
            let queryObject = { ...this.state.form }
            notifier.hideWaiting()
            createOrderProxy(queryObject, res => {
                console.log(res)
                if (res.returnCode === 1) {
                    notifier.showSuccessMessage("Lập đơn thành công")
                    this.props.history.push('/bill-submit-result', { submitResult: { message: 'Lập đơn thành công' } })
                    return
                }
                notifier.showErrorMessage("Tạo đơn hàng không thành công")
            })
        }, 50)
    }

    componentDidMount() {

        let isFullSupplierInfo = this.props.location.state.isFullSupplierInfo
        if (!isFullSupplierInfo) {
            this.props.history.push("/bill-entry")
            return
        }

        let { billSupplierInfo } = this.props.location.state

        this.setState({
            form: { ...billSupplierInfo }
        }, () => {
            this.clearHistoryParams()
        })
    }


    clearHistoryParams = () => {
        const history = this.props.history
        let state = { ...history.location.state };
        delete state.billSupplierInfo;
        delete state.isFullSupplierInfo;
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
                                <li className="breadcrumb-item " >
                                    <Link to="/bill-entry" className="zzz">  <span className="material-icons">receipt</span>
                                        <span>Lập đơn hàng</span>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <span>Thông tin nhà vận chuyển</span>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <span>Thông tin gửi hàng</span>
                                </li>
                            </ol>
                        </nav>

                        {/* Bill info */}
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="headingContentTitle--themeColor linetop-space">Thông tin người gửi</h5>
                                <div className="row">
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Họ tên</label>
                                        <input className="form-control" name="senderName" onChange={this.updateField} required />
                                    </div>
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Giới tính</label>
                                        <Select
                                            name="GenderSender"
                                            defaultValue={DataOptions.genders[0]}
                                            onChange={e => { this.updateSelectField(e, 'a2') }}
                                            placeholder={'Chọn giới tính'}
                                            options={DataOptions.genders}
                                            required={true} />
                                    </div>
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">SDT</label>
                                        <input className="form-control" name="senderPhone" type="text" onChange={this.updateField} required />
                                    </div>
                                    <div className="col-md-12 form-group required">
                                        <label className="filter-label">Địa chỉ</label>
                                        <textarea className="form-control" name="senderAddress" onChange={this.updateField} required></textarea>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-6">
                                <h5 className="headingContentTitle--themeColor linetop-space">Thông tin người nhận</h5>
                                <div className="row">
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Họ tên</label>
                                        <input className="form-control" name="receiverName" onChange={this.updateField} />
                                    </div>
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">Giới tính</label>
                                        <Select
                                            name="GenderReceiver"
                                            defaultValue={DataOptions.genders[0]}
                                            onChange={e => { this.updateSelectField(e, 'a') }}
                                            placeholder={'Chọn giới tính'}
                                            options={DataOptions.genders}
                                            required={true} />
                                    </div>
                                    <div className="col-md-4 form-group required">
                                        <label className="filter-label">SDT</label>
                                        <input className="form-control" name="receiverPhone" type="text" onChange={this.updateField} required />
                                    </div>
                                    <div className="col-md-12 form-group required">
                                        <label className="filter-label">Địa chỉ</label>
                                        <textarea className="form-control" name="recieveAddress" onChange={this.updateField} required></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mt-5">
                            <button type="button" onClick={this.submit} className="btn btn-mainColor btn-lg ml-auto mr-auto mt-auto">Hoàn thành</button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}
