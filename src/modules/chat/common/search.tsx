import {IImage} from "@/assets";
import {useState} from "react";
import cn from "@/utils/cn";

interface props {
	handleSendMessage: (image: File[]) => void
	setNewMessage: (e: string) => void
	message: string
}

interface FileData {
	file: File;
	previewUrl: string;
}

const Search = ({handleSendMessage, setNewMessage, message}: props) => {
	const [images, setImages] = useState<FileData[]>([])
	const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			const fileArray: FileData[] = Array.from(files).map(file => ({
				file,
				previewUrl: URL.createObjectURL(file),
			}));
			setImages((prev) => [...prev, ...fileArray]);
		}
	}

	const handleRemoveFile = (index: number) => {
		const updatedFiles = images.filter((_, i) => i !== index);
		setImages(updatedFiles);
	};

	const sendMessage = () => {
		setImages([])
		handleSendMessage(images.map((e) => e.file));
	}


	return <>
		<div className={`w-full bottom-1 py-4 bg-white border-l border-bodydark`}>
			<div className="relative flex items-center px-4 ">
				{images?.length === 0 && <div className={`mr-6 hover:scale-105`}>
                    <label className={`cursor-pointer`} htmlFor="file-input">
                        <IImage color={`#5BC0EB`}/>
                    </label>
                    <input onChange={handleChangeImg} multiple className={`hidden`} id="file-input" type="file"/>
                </div>}
				{
					images?.length > 0 &&
                    <div
                        className={`absolute z-99999 w-full bg-white rounded-t-2xl border-l border-b-none  flex items-center gap-4 top-[-95px] pl-10 left-0 `}>
                        <div className={`hover:scale-105 bg-gray-200 p-3 rounded-lg`}>
                            <label className={`cursor-pointer`} htmlFor="file-input">
                                <IImage color={`#5BC0EB`} width={30} height={30}/>
                            </label>
                            <input onChange={handleChangeImg} className={`hidden`} multiple id="file-input" type="file"/>
                        </div>

						{images?.map(({previewUrl}, index) => {
							return (
								<div className={`size-20 my-2 bg-gray-300 rounded-lg flex-center`}>
									<img key={index}
										 src={previewUrl}
										 alt={`preview-${index}`}
										 className={`size-13 object-cover`}
									/>
								</div>
							)
						})}
                    </div>
				}

				<input type="search"
					   onKeyDown={(e) => {
						   if (e.key === 'Enter') {
							   sendMessage()
						   }
					   }}
					   id="Send" value={message} onChange={(e) => setNewMessage(e.target.value)}
					   className={cn(`block w-full py-4  ps-6 text-sm text-gray-900 border rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 border-blue-200`
						   , {"rounded-t-none rounded-b-2xl border-t-none": images.length > 0})}
					   placeholder="Typing your message..." required/>
				<button type="submit" onClick={() => sendMessage()}
						className="text-white absolute end-7 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send
				</button>
			</div>
		</div>
	</>
}

export default Search