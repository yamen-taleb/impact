interface Props {}

const UploadCVButton = () => {
    const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("hello world")
        const file = e.target.files?.[0];
        if (!file) return;

        const contentType = file.type;
        if (contentType !== "application/pdf") {
            alert("الرجاء رفع ملف PDF فقط");
            return;
        }

        //TODO
        // upload cv to server
    }
  return (
      <>
          <label
              htmlFor='cv'
              className="mt-6 items-center cursor-pointer justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
              رفع السيرة الذاتية
          </label>
          <input
              id="cv"
              className="hidden"
              onChange={handleCVChange}
              accept="application/pdf"
              type="file"
          />
      </>

  );
};

export default UploadCVButton;