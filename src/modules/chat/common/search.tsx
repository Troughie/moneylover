interface props {
	handleSendMessage: () => void
	setNewMessage: (e: string) => void
	message: string
}

const Search = ({handleSendMessage, setNewMessage, message}: props) => {
	return <>
		<div className={`absolute w-full bottom-1 py-4 bg-white border-l border-bodydark`}>
			<div className="relative flex items-center px-4 ">
				<input type="search"
					   onKeyDown={(e) => {
						   if (e.key === 'Enter') {
							   handleSendMessage();
						   }
					   }}
					   id="Send" value={message} onChange={(e) => setNewMessage(e.target.value)}
					   className="block w-full py-4 ps-6 text-sm text-gray-900 border rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 border-blue-200"
					   placeholder="Typing your message..." required/>
				<button type="submit" onClick={handleSendMessage}
						className="text-white absolute end-7 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send
				</button>
			</div>
		</div>
	</>
}

export default Search