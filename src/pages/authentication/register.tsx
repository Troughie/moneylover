import {motion as m} from "framer-motion";
import {Lock, Logo, Person} from "../../assets";
import {FormProvider, useForm} from "react-hook-form";
import {InputAuthentication} from "../../commons";
import {Link} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../libs/schema.ts";
import {routePath} from "../../utils";

const Register = () => {
	const methods = useForm({mode: "onChange", resolver: yupResolver(loginSchema)})

	const handleOnSubmit = (data: any) => {
		console.log(data)
	}
	return <>
		<div className="rounded-sm border border-stroke bg-white shadow-default  mt-[200px]">
			<div className=" flex-wrap flex-center">
				<m.div
					initial={{x: 900}}
					animate={{x: 0}}
					transition={{duration: 1}}
					className="w-full  xl:w-1/2 ">
					<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
						<h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">
							Register
						</h2>
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(handleOnSubmit)}>
								<InputAuthentication name={"email"} type={"email"} placeholder={"Enter your email"} icons={<Person/>}
													 label={"Email"}/>

								<InputAuthentication name={"password"} type={"password"} placeholder={"6+ Characters"} icons={<Lock/>}
													 label={"Password"}/>

								<div className="mb-5">
									<button
										className="w-full cursor-pointer rounded-lg border bg-black p-4 text-white transition hover:bg-opacity-90">Sign
										in
									</button>
								</div>
								<div className="mt-6 text-center">
									<p>
										Don’t Remember password click here?{" "}
										<Link to="/auth/signup" className="text-primary">
											Forgot
										</Link>
									</p>
								</div>
							</form>
						</FormProvider>
					</div>
				</m.div>
				<m.div
					initial={{x: -900}}
					animate={{x: 0}}
					transition={{duration: 1}}
					className="hidden border-stroke  xl:border-l-2 w-full xl:block xl:w-1/2">
					<div className="py-17.5 px-26 flex-center flex-col text-center">
						<Link to={routePath.login.path}>
							<button className={`border-bodydark2 duration-700 border rounded-md py-2 px-4 hover:scale-110 hover:shadow-3`}>
								Sign in
							</button>
						</Link>
						<span className="mt-15 inline-block">
                              <Logo/>
                          	</span>
					</div>
				</m.div>
			</div>
		</div>
	</>
}

export default Register