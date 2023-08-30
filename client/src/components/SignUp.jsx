/* eslint-disable react/prop-types */

function SignUp({
  showRegister,
  setShowRegister,
  loginData,
  registerData,
  handleRegisterChange,
  handleLoginChange,
  handleSubmit,
}) {
  return (
    <div className="hero calc-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <div className="card-body">
            {showRegister ? (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      className="input input-bordered"
                      value={registerData.first_name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      className="input input-bordered"
                      value={registerData.last_name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    className="input input-bordered"
                    value={registerData.location}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Occupation</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Occupation"
                    name="occupation"
                    className="input input-bordered"
                    value={registerData.occupation}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover"
                    onClick={() => setShowRegister(false)}
                  >
                    Already have an account? Login here
                  </a>
                </label>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="input input-bordered"
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover"
                    onClick={() => setShowRegister(true)}
                  >
                    Don&apos;t have an account? Register here
                  </a>
                </label>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
