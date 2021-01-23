import React, { useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import NumberFormat from 'react-number-format';

class BillEditModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const showModal = this.props.showModal
        const setShowModal = this.props.setShowModal
        const editItem = this.props.editItem
        const onEdit = this.props.onEdit
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
                            Chỉnh sửa thông tin đơn hàng
                         </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="supItem col-md-12 " >
                            <div className="form-group">
                                <label>Mã đơn hàng</label>
                                <input className="form-control" type="" readOnly value={editItem.orderID} />
                            </div>
                            <div className="form-group">
                                <label>Trạng thái</label>
                                <input className="form-control" type="" />
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={() => { onEdit(editItem) }} className="btn btn-info">Lưu</button>
                        <button type="button" onClick={() => { setShowModal(false) }} className="btn btn-danger">Đóng</button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default BillEditModal