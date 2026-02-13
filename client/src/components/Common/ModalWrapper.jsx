import React from 'react';
import { Modal } from 'antd';
import { IoClose } from "react-icons/io5";

const ModalWrapper = ({ isOpen, onClose, children }) => {
    return (
        <Modal
            title={null}
            footer={null}
            open={isOpen}
            onCancel={onClose}
            centered
            width={900}
            closeIcon={<div className="bg-white/80 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"><IoClose size={20} className="text-gray-600" /></div>}
            className="modal-wrapper"
            styles={{
                content: {
                    padding: 0,
                    borderRadius: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    background: 'transparent',
                    border: 'none',
                    overflow: 'hidden'
                },
                mask: {
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(255, 255, 255, 0.4)'
                }
            }}
        >
            {children}
        </Modal>
    );
};

export default ModalWrapper;
