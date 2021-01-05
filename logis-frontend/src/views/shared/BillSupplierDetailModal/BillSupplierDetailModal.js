import React, { useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import NumberFormat from 'react-number-format';

const BillSupplierDetailModal = (props) => {
    const showModal = props.showModal
    const setShowModal = props.setShowModal
    const supItem = props.supItem

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
                        Thông tin chi tiết nhà cung cấp
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="supItem col-md-12 modal-section-top">
                        <div className="supItem-body">
                            <span className="supItemNo">1</span>
                            <div className="supInfoContainer col-md-2">
                                <img className="supImg" src="https://cdn.nhanh.vn/cdn/store/26/artCT/22280/dich_vu_van_chuyen_ghn_express_1.png" alt="no-image"></img>
                                <h4 className="appTheme upc">{supItem.companyName}</h4>
                            </div>
                            <div className="supInfoContainer col-md-5 col-sm-12 txt-center">
                                <span>Miễn phí dịch vụ bóc gỡ hàng hóa</span>
                                <span>Thời gian vận chuyển: <span className="appTheme font-weight-bold">2-3 ngày</span></span>
                            </div>
                            <div className="supInfoContainer price-container col-md-4 col-sm-12 txt-center mb-2" >
                                <h5 className=" font-weight-bold">Giá vận chuyển: <span className="appTheme"><NumberFormat value={supItem.amount} displayType={'text'} thousandSeparator={true} />  VND</span></h5>
                                <span className="appTheme">Loại hình vận chuyển: Xe Container 5T</span>
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
                                    <h5>Q4-TPHCM <i className="fa fa-arrow-right toModalWidth appTheme"></i> Q11-TPHCM</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="supItem col-md-12 modal-section">
                        <div className="supItem-body align-items-start fcol">
                            <div className="d-flex flex-column">
                                <h4 className="appTheme bold">Thông tin báo giá:</h4>
                            </div>
                            <div className="col-md-12 col-sm-12 mt-1">
                                <table className="amtTable">
                                    <tbody>
                                        <tr>
                                            <td colSpan="6"><h5>Gía vận chuyển:</h5></td>
                                            <td ><h5>100000 VND</h5></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="6"><h5>Gía vận chuyển:</h5></td>
                                            <td><h5>100000 VND</h5></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="6"><h5>Tổng phí:</h5></td>
                                            <td><h5>100000 VND</h5></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}



export default BillSupplierDetailModal