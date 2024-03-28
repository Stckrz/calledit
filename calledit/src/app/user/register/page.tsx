import React from 'react';
const Register: React.FC = () => {
	return (
		<>
			<div className={"flex flex-col items-center justify-center gap-1 w-full h-full"}>
				<div className={"flex flex-col items-end justify-center gap-1 h-1/2"}>
					<label>Username:
						<input />
					</label>
					<label>Password:
						<input />
					</label>
					<label>Repeat Password:
						<input />
					</label>
					<button>Register</button>
				</div>
			</div>
		</>
	)
}

export default Register
