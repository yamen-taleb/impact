interface Props {
    label: string
    setImage: (avatar: string) => void
    onUpload?: (file: File) => void
    disabled?: boolean
}

const ImageChangeButton = ({label, setImage, onUpload, disabled}: Props) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        const file = files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            return
        }

        setImage(URL.createObjectURL(file))
        if(onUpload) {
            onUpload(file)
        }
    }

  return (
      <div className="mt-6">
          <label
              htmlFor='image1'
              className={`flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition cursor-pointer ${disabled ? "opacity-50 pointer-events-none" : "hover:bg-slate-800"}`}
          >
              {label}
          </label>
          <input
              id="image1"
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              className="hidden"
              disabled={disabled}
          />
      </div>
  );
};

export default ImageChangeButton;
