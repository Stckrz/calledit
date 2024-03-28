import React from 'react';
const Login: React.FC = () => {
	return (
		<>
			<div className={"flex flex-col items-center justify-center gap-1 w-full h-3/4"}>
				<label>Username:
					<input />
				</label>
				<label>Password:
					<input />
				</label>
				<button>login</button>
			</div>
		</>
	)
}

export default Login
