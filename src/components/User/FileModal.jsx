const FileModal = ({ show, onClose, onConfirm, file }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-xl">Selected File</h2>
        {file && (
          <img
            src={URL?.createObjectURL(file)}
            alt="Preview"
            className="mb-4 max-h-60"
          />
        )}
        <div className="flex justify-end">
          <button
            className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={onConfirm}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileModal;
