import React from 'react'
import Select from 'react-select'
import DatePicker from "react-datepicker"
import { FormatHelper, DataOptions } from './../../common'
import Pagination from '@material-ui/lab/Pagination';
import { PagingListModel } from './../../models'
import { Topbar } from './../../components'
import { PagingHelper } from './../../helpers/pagingHelper'
import { getAllOrderProxy, updateOrderProxy, updateOrder2Proxy } from './../../api'
import BillEditModal from './../shared/BillModal/BillEditModal'
import notifier from './../../helpers/notifier'
import { Constants } from './../../common/constants'
import NumberFormat from 'react-number-format';

export default class Bill extends React.Component {
    constructor(props) {
        super(props)
        let d = new Date()
        this.state = {
            form: {
                status: '',
                fromDate: new Date(d.setDate(d.getDate() - 30)),
                toDate: new Date(),
            },
            orderList: [],
            pagingListModel: new PagingListModel(),
            showModal: false,
            editItem: {},
            editRule: "BYCUSTOMER"
        }

    }

    componentDidMount() {
        const userClaims = JSON.parse(localStorage.getItem("User"))
        if (userClaims.userType == 2) {
            this.setState({ editRule: "BYCOMPANY" })
        }

        this.reloadFetchData()
    }

    reloadFetchData = () => {
        const userClaims = JSON.parse(localStorage.getItem("User"))
        let queyObject = {
            cusID: userClaims.id,
            queryType: "BYCUSTOMER"
        }

        if (userClaims.userType == 2) {
            queyObject.queryType = "BYCOMPANY"
        }

        getAllOrderProxy(queyObject, res => {
            let data = res.data ? res.data : []
            let fillData = []
            for (let orderItem of data) {
                let newItem = {
                    ...orderItem.order,
                    orderDetails: orderItem.orderDetails
                }
                console.log(newItem)
                fillData.push(newItem)
            }
            let model = PagingHelper.mapToPagingListModel(fillData)

            this.setState({ pagingListModel: model, orderList: fillData });
        })
    }

    //events
    updateField = e => {
        this.setState({
            form: { ...this.state.form, [e.target.name]: e.target.value }
        });
    };

    mockClick = () => { }

    getDelliveryDate = (orderItem) => {
        let date = orderItem.expectedDate
        let label = " (Dự kiến)"
        if (orderItem.recieveDate) {
            date = orderItem.recieveDate
            label = ""
        }
        let strDate = FormatHelper.getDateFormtString(date) + label
        return strDate
    }

    onSelectStatusChanged = (newValue, actionMeta) => {
        this.setState({
            form: { ... this.state.form, status: newValue ? newValue.value : '' }
        });
    };

    onSearch = (e) => {
        if (this.state.orderList.length == 0) return

        const { status, fromDate, toDate } = this.state.form

        let fillData = this.state.orderList.filter(item => {
            if (item.createdDate && typeof (item.createdDate) == 'string') item.createdDate = new Date(item.createdDate)
            return ((!status || status && item.status == status) &&
                (!fromDate || fromDate && item.createdDate && fromDate.getTime() <= item.createdDate.getTime()) &&
                (!toDate || item.createdDate && toDate.getTime() >= item.createdDate.getTime())
            )
        })

        let model = PagingHelper.mapToPagingListModel([...fillData])
        this.setState({ pagingListModel: { ...model } });
    }

    handlePageChange = (event, value) => {
        const { pageNumber } = this.state.pagingListModel
        let gotoPage = value
        if (gotoPage !== pageNumber) {
            this.setState({
                pagingListModel: { ...this.state.pagingListModel, pageNumber: gotoPage }
            })
        }
    }

    setShowModal = (value) => {
        this.setState({ ...this.state, showModal: value });
    }

    onBillItemClick = (item) => {
        this.setState({
            editItem: item
        }, () => {
            this.setShowModal(true)
        })
    }

    onEditBillItemSubmit = (item) => {
        notifier.showConfirmation("Xác nhận cập nhật thông tin vận chuyển hàng", () => {
            notifier.showWaiting()
            this.setShowModal(false)

            console.log(item)
            const queryObj = item
            setTimeout(() => {
                updateOrderProxy(queryObj, res => {
                    notifier.hideWaiting()
                    if (res.returnCode === 1) {
                        this.reloadFetchData()
                        notifier.showSuccessMessage("Cập nhật thành công")
                        return
                    }
                    notifier.showErrorMessage("Cập nhật không thành công")
                })
            }, 100)
        })
    }

    onCompleteBill = (item) => {
        let itemUpdate = item
        itemUpdate.status = Constants.BillCompleted
        notifier.showConfirmation("Xác nhận hoàn thành đơn hàng", () => {
            notifier.showWaiting()
            this.setShowModal(false)
            const queryObj = itemUpdate
            setTimeout(() => {
                updateOrder2Proxy(queryObj, res => {
                    notifier.hideWaiting()
                    if (res.returnCode === 1) {
                        this.reloadFetchData()
                        notifier.showSuccessMessage("Cập nhật thành công")
                        return
                    }
                    notifier.showErrorMessage("Cập nhật không thành công")
                })
            }, 100)

        })
    }


    renderNoResultFound = () => {
        return (<div className="d-flex noresult-container "><span className="m-auto">Không tìm thấy kết quả</span> </div>)
    }

    render() {

        return (
            <>
                <div className="page-container" >
                    <Topbar
                        title={'Quản lý đơn hàng'}
                        isOnlyTitle={true}
                        separateLine="light"
                    />
                    {/* <div className="toolbar-section botline-light ">
                    <div className="toolbar-section__horizon">
                        <div className="bg">
                            <ToolbarButton
                                onClick={this.mockClick}
                                title="Mới tạo"
                            />
                            <ToolbarButton
                                onClick={this.mockClick}
                                title="Đang chờ lấy hàng"
                            />
                            <ToolbarButton
                                onClick={this.mockClick}
                                title="Đã lấy hàng"
                            />
                        </div>
                        <div className="bg">
                            <ToolbarButton
                                onClick={this.mockClick}
                                title="Đang vận chuyển"
                            />
                            <ToolbarButton
                                onClick={this.mockClick}
                                title="Đã giao"
                            />
                        </div>
                    </div>
                </div> */}

                    <div className="page-content appTheme">
                        <h5 className="headingContentTitle">Bộ lọc</h5>

                        <form className="filterForm">
                            <div className="row">
                                <div className="col-md-3 form-group">
                                    <label className="filter-label">Trạng thái</label>
                                    <Select
                                        isClearable={true}
                                        onChange={this.onSelectStatusChanged}
                                        placeholder={'Tất cả'}
                                        options={DataOptions.billStatus} />
                                </div>
                                <div className="col-md-3 form-group">
                                    <label className="filter-label">Thời gian tạo đơn từ</label>
                                    <DatePicker
                                        dateFormat={FormatHelper.dateFormat}
                                        className="form-control"
                                        selected={this.state.form.fromDate}
                                        onChange={date => this.setState({ form: { ...this.state.form, fromDate: date } })}
                                    />
                                </div>
                                <div className="col-md-3 form-group">
                                    <label className="filter-label">đến</label>
                                    <DatePicker
                                        dateFormat={FormatHelper.dateFormat}
                                        className="form-control"
                                        selected={this.state.form.toDate}
                                        onChange={date => this.setState({ form: { ...this.state.form, toDate: date } })}
                                    />
                                </div>
                                <div className="col-md-3 form-group d-flex">
                                    <label htmlFor="btnApply"></label>
                                    <button type="button" className="btn btn-mainColor mt-auto" onClick={e => { this.onSearch(e) }} >Áp dụng</button>
                                </div>
                            </div>
                        </form>

                        <div className="filtertop-space">
                            {this.state.pagingListModel.data.length == 0 ? this.renderNoResultFound() :
                                <div className="tableContainer">
                                    <table className="table">
                                        <caption>Tổng cộng: {this.state.pagingListModel.data.length}</caption>
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Mã đơn</th>
                                                <th scope="col">Bên nhận</th>
                                                <th scope='col'>Loại hàng</th>
                                                <th scope='col'>Khối lượng</th>
                                                <th scope="col">Tổng chi phí</th>
                                                <th scope="col">Ngày giao</th>
                                                <th scope="col">Trạng thái</th>
                                                <th scope="col">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...this.state.pagingListModel.data].slice(
                                                PagingHelper.fromIndex(this.state.pagingListModel),
                                                PagingHelper.toIndex(this.state.pagingListModel)).map((item, index) => {
                                                    const currentIndex = PagingHelper.fromIndex(this.state.pagingListModel) + index + 1
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{currentIndex}</th>
                                                            <td>HD{item.orderId}</td>
                                                            <td>{item.receiverName}</td>
                                                            <td>{item.typeProduct}</td>
                                                            <td>{item.volumeProduction} (KG)</td>
                                                            <td>{<NumberFormat value={item.totalAmount} displayType={'text'} thousandSeparator={true} />}</td>
                                                            <td>{this.getDelliveryDate(item)}</td>
                                                            <td>
                                                            
                                                                    {/* this.state.editRule == "BYCOMPANY" ? DataOptions.getBillStatusNameByValue(item.orderItem.status): */}
                                                                    
                                                                   {DataOptions.getBillStatusNameByValue(item.status)}
                                                            </td>
                                                            <td>
                                                                {
                                                                    this.state.editRule == "BYCOMPANY" ?
                                                                        <button type="button" onClick={this.onBillItemClick.bind(this, item)} className="btn btn-edit"><i className="fa fa-edit"></i></button> :
                                                                        <div>
                                                                            <button type="button" onClick={this.onBillItemClick.bind(this, item)} className="btn btn-view"><i className="fa fa-eye"></i></button>
                                                                            {item.status === Constants.BillDelivered ? <button className="btn btn-success" onClick={this.onCompleteBill.bind(this, item)} >Đã nhận hàng</button> : <></>}
                                                                        </div>

                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                        </tbody>
                                    </table>
                                    <Pagination count={this.state.pagingListModel.totalPage} shape="rounded" page={this.state.pagingListModel.pageNumber} onChange={this.handlePageChange} />
                                </div>
                            }
                        </div>

                    </div>
                </div>

                <BillEditModal showModal={this.state.showModal} setShowModal={this.setShowModal} editItem={this.state.editItem} onEdit={this.onEditBillItemSubmit} editRule={this.state.editRule} />
            </>
        )
    }
}
