import {ArrRight} from "@/assets";
import {Link, useLocation} from "react-router-dom";
import {routePathArray} from "@/utils";
import {motion as m} from "framer-motion";
import cn from "@/utils/cn";


const NavBar = () => {

	const navItem = routePathArray()

	const {pathname} = useLocation()

	const handleActiveNav = (route: string) => {
		const path = pathname.split("/")[1]
		const routeCurrent = route.split("/")[1]
		return routeCurrent === path
	}
	return <>
		<m.div
			className={`w-1/5 bg-main h-screen px-4 hidden lg:block`}>
			<div className={`px-8  py-12 rounded-2xl`}>
				<h1 className={`md:text-4xl text-nowrap text-black font-satoshi`}>Money lover</h1>
			</div>
			<ul className={`px-4 mt-[50px] rounded-2xl`}>
				{navItem.map((el) => (
					<Link to={el.path} key={el.name}
						  className={`${handleActiveNav(el.path) ? " border-r-2 border-r-bodydark2 font-bold text-white scale-110 ring-2 ring-blue-400 bg-blue-500" : "text-bodydark2 font-normal"} group  rounded-lg cursor-pointer flex items-center py-5 px-4 duration-1000 mx-1 my-8 justify-between  gap-2`}>
						<span>
						<el.icons color={handleActiveNav(el.path) ? "#fff" : "#000"} width={"40px"} height={"40px"}/>
						</span>
						<span className={cn("")}>{el.name}</span>
						<div className={`w-7`}>
							<img src={ArrRight} alt="" className={` w-3 h-3 group-hover:w-4 group-hover:h-4 transition`}/>
						</div>
					</Link>
				))}
			</ul>
		</m.div>
	</>
}

export default NavBar;