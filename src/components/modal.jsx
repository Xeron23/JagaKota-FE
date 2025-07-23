const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg flex flex-col items-center">
                <div className="mb-6 w-full text-center">
                    {children}
                </div>
                <button
                    onClick={onClose}
                    className="text-red-500 hover:text-red-700 font-semibold"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;