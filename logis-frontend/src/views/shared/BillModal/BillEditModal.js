import React, { useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import { DataOptions } from './../../../common'
import Select from 'react-select'

class BillEditModal extends React.Component {
    constructor(props) {
        super(props)
    }


    onSelectOrderDetailItemChanged = (item, newValue) => {
        console.log(newValue)
        item.status = newValue.value
        console.log(item.status)
    }

    getSubmitItem = (orderId, detailDto) => {
        return {
            orderId: orderId,
            rulrateId: detailDto.rulRateId,
            status: detailDto.status
        }
    }

    sumCharges = (surcharges) => {
        let totalSurcharge = 0
        for (let i in surcharges)
            totalSurcharge = totalSurcharge + surcharges[i].amount
        return totalSurcharge
    }

    renderSurcharges = (surcharges) => {
        return surcharges.map((item, index) => {
            return (
                <tr key={++index}>
                    <td colSpan="6"><h5>{item.surName}:</h5></td>
                    <td><h5><NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true} /> VND</h5></td>
                </tr>)
        })
    }


    render() {
        const showModal = this.props.showModal
        const setShowModal = this.props.setShowModal
        const editItem = this.props.editItem
        const onEdit = this.props.onEdit
        const editRule = this.props.editRule

        let modalTitle = 'Xem thông tin đơn hàng'
        if (editRule == "BYCOMPANY") {
            modalTitle = 'Chỉnh sửa thông tin đơn hàng'
        }

        if (!editItem || (editItem && !editItem.orderDetails || editItem && editItem.orderDetails.length == 0))
            return <></>

        return (
            <>
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    dialogClassName="modal-w modal-bg"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title" className="">
                            {modalTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {editItem.orderDetails.length == 0 ? <></> :
                            editItem.orderDetails.map((orderDetailItem, index) => {
                                return (
                                    <div key={++index}>
                                        <div className="supItem col-md-12 modal-section-top" >
                                            <div className="supItem-body">
                                                <span className="supItemNo">{index}</span>
                                                <div className="supInfoContainer col-md-2">
                                                    <img className="supImg" src="https://cdn.nhanh.vn/cdn/store/26/artCT/22280/dich_vu_van_chuyen_ghn_express_1.png" alt="no-image"></img>
                                                    <h4 className="appTheme upc">{orderDetailItem.companyName}</h4>
                                                </div>
                                                <div className={`supInfoContainer col-md-${editRule == "BYCOMPANY" ? 3 : 5} col-sm-12 txt-center`}>
                                                    <span>Ngày lấy hàng dự kiến: </span>
                                                    <span>Thời gian vận chuyển: <span className="appTheme font-weight-bold">{orderDetailItem.transitTime} ngày</span></span>
                                                </div>
                                                <div className="supInfoContainer price-container col-md-4 col-sm-12 txt-center mb-2" >
                                                    <h5 className=" font-weight-bold">Giá vận chuyển: <span className="appTheme"><NumberFormat value={orderDetailItem.amount} displayType={'text'} thousandSeparator={true} />  VND</span></h5>
                                                    <span className="appTheme">Loại hình vận chuyển: {orderDetailItem?.container?.contName}</span>
                                                </div>
                                                {editRule == "BYCOMPANY" ? (
                                                    <div className="ml-auto col-md-2 col-sm-12 appTheme ">
                                                        <div className="form-group">
                                                            <label className="filter-label">Trạng thái</label>
                                                            <Select
                                                                onChange={(newValue) => {
                                                                    this.onSelectOrderDetailItemChanged(orderDetailItem, newValue)
                                                                    console.log(orderDetailItem)
                                                                }}
                                                                defaultValue={DataOptions.billStatus.find(option => option.value === orderDetailItem.status)}
                                                                options={DataOptions.billStatus} />
                                                        </div>
                                                        <button type="button" onClick={() => { onEdit(this.getSubmitItem(editItem.orderId, orderDetailItem)) }} className="btn btn-info w-100">Lưu</button>
                                                    </div>) : <></>}
                                            </div>
                                        </div>

                                        <div className="supItem col-md-12 modal-section">
                                            <div className="supItem-body">
                                                <div className="d-flex flex-row">
                                                    <h4 className="appTheme bold">Tuyến đường:</h4>
                                                </div>
                                                <div className=" col-md-5 col-sm-12">
                                                    <div>
                                                        <h5>{orderDetailItem?.startLocation?.locDescription} <i className="fa fa-arrow-right toModalWidth appTheme"></i> {orderDetailItem?.endLocation?.locDescription}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {!orderDetailItem.surcharges ? <></> :
                                            <div className="supItem col-md-12 modal-section">
                                                <div className="supItem-body align-items-start fcol">
                                                    <div className="d-flex flex-column">
                                                        <h4 className="appTheme bold">Thông tin báo giá:</h4>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12 mt-1">
                                                        <table className="amtTable">
                                                            <thead></thead>
                                                            <tbody>
                                                                {this.renderSurcharges(orderDetailItem.surcharges)}
                                                                <tr>
                                                                    <td colSpan="7"><hr /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="6"><h5>Tổng phí:</h5></td>
                                                                    <td><h5><NumberFormat value={this.sumCharges(orderDetailItem.surcharges)} displayType={'text'} thousandSeparator={true} /> VND</h5></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                )
                            })
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        {/* {editRule == "BYCOMPANY" ? (<button type="button" onClick={() => { onEdit(editItem) }} className="btn btn-info">Lưu</button>) : <></>} */}
                        <button type="button" onClick={() => { setShowModal(false) }} className="btn btn-danger">Đóng</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default BillEditModal