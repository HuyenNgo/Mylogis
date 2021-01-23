import { render } from '@testing-library/react';
import React, { useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import NumberFormat from 'react-number-format';

class BillSupplierDetailModal extends React.Component {
    constructor(props) {
        super(props)
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
        let sup = this.props.supItem
        let supItem = {}
        if (sup) {
            supItem = sup.suggestionDetailDTOS[0]
        }

        if (!sup || sup && !sup.suggestionDetailDTOS) return (<></>)

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
                            Thông tin chi tiết nhà vận chuyển
          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {sup.suggestionDetailDTOS.length == 0 ? <></> :
                            sup.suggestionDetailDTOS.map((supItem, index) => {
                                return (
                                    <div key={++index}>
                                        <div className="supItem col-md-12 modal-section-top" >
                                            <div className="supItem-body">
                                                <span className="supItemNo">{index}</span>
                                                <div className="supInfoContainer col-md-2">
                                                    <img className="supImg" src="https://cdn.nhanh.vn/cdn/store/26/artCT/22280/dich_vu_van_chuyen_ghn_express_1.png" alt="no-image"></img>
                                                    <h4 className="appTheme upc">{supItem.companyName}</h4>
                                                </div>
                                                <div className="supInfoContainer col-md-5 col-sm-12 txt-center">
                                                    <span>Ngày lấy hàng dự kiến: </span>
                                                    <span>Thời gian vận chuyển: <span className="appTheme font-weight-bold">{supItem.transitTime} ngày</span></span>
                                                </div>
                                                <div className="supInfoContainer price-container col-md-4 col-sm-12 txt-center mb-2" >
                                                    <h5 className=" font-weight-bold">Giá vận chuyển: <span className="appTheme"><NumberFormat value={supItem.amount} displayType={'text'} thousandSeparator={true} />  VND</span></h5>
                                                    <span className="appTheme">Loại hình vận chuyển: {supItem?.container?.contName}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="supItem col-md-12 modal-section">
                                            <div className="supItem-body">
                                                <div className="d-flex flex-row">
                                                    <h4 className="appTheme bold">Tuyến đường:</h4>
                                                </div>
                                                <div className=" col-md-5 col-sm-12">
                                                    <div>
                                                        <h5>{supItem?.startLocation?.locDescription} <i className="fa fa-arrow-right toModalWidth appTheme"></i> {supItem?.endLocation?.locDescription}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {!supItem.surcharges ? <></> :
                                            <div className="supItem col-md-12 modal-section">
                                                <div className="supItem-body align-items-start fcol">
                                                    <div className="d-flex flex-column">
                                                        <h4 className="appTheme bold">Thông tin báo giá:</h4>
                                                    </div>
                                                    <div className="col-md-12 col-sm-12 mt-1">
                                                        <table className="amtTable">
                                                            <thead></thead>
                                                            <tbody>
                                                                {this.renderSurcharges(supItem.surcharges)}
                                                                <tr>
                                                                    <td colSpan="7"><hr /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="6"><h5>Tổng phí:</h5></td>
                                                                    <td><h5><NumberFormat value={this.sumCharges(supItem.surcharges)} displayType={'text'} thousandSeparator={true} /> VND</h5></td>
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
                </Modal>
            </>
        );
    }
}



export default BillSupplierDetailModal