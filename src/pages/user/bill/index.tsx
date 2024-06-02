import UserLayout from "../../../layout/userLayout.tsx";
import {BreakCrumb} from "../../../components";

const Bill = () => {
	return <UserLayout>
		<BreakCrumb pageName={"Bill"}/>
		<div className={"container-wrapper"}>
			BIll
		</div>
	</UserLayout>
}

export default Bill