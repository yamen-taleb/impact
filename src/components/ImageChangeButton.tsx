interface Props {
    label: string
    setImage: (avatar: string) => void
}

const ImageChangeButton = ({label, setImage}: Props) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        const file = files[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            return
        }

        setImage(URL.createObjectURL(file))
    }

  return (
      <div className="mt-6">
          <label
              htmlFor='image1'
              className="flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 cursor-pointer"  // Remove mt-10
          >
              {label}
          </label>
          <input
              id="image1"
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              className="hidden"
          />
      </div>
  );
};

export default ImageChangeButton;