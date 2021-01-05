import React, { useState } from 'react';
import PropTypes from 'prop-types'

const ToolbarButton = (props) => {

    const { onClick, title } = props
    const countNumber = props.countNumber | 0

    return (
        <button className="btn-sc btn-toolbar" onClick={onClick}>
            <span className="btn-toolbar__title ">{title}</span>
            <span className="btn-toolbar__count-number ">{countNumber}</span>
        </button>
    )
}

ToolbarButton.propTypes = {
    onClick: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
}

export default ToolbarButton
