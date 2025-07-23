const Spinner = () => {
    return (
        <div className="flex justify-center items-center p-4">
        <div
            className="w-12 h-12 border-[6px] border-dashed border-blue-400 border-t-transparent rounded-full animate-spin-slow"
        ></div>
        </div>
    );
};

export default Spinner;