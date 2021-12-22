import { useActionData, json, redirect } from "remix";
import { db } from "~/utils/db.server";
import { login, createUserSession } from "~/utils/session.server";

function validateUsername(username) {
  if (typeof username !== "string") {
    return "Username should be at least 3 characters long";
  }
}
function validatePassword(password) {
  if (typeof password !== "string") {
    return "Password should be at least 3 characters long";
  }
}

function badRequest(data) {
  return json(data, { status: 400 });
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");

  const fields = { loginType, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  switch (loginType) {
    case "login": {
      //Find user
      const user = await login({ username, password });
      //Check user
      if (!user) {
        return badRequest({
          fields,
          fieldErrors: { username: "Invalid Credentials" },
        });
      }
      //create user session
      return createUserSession(user.id, "/posts");
    }
    case "register": {
      //Check if user exists
      //Create user
      //create user session
    }
    default: {
      return badRequest({
        fields,
        formError: "Login type is not valid",
      });
    }
  }
};

function Login() {
  const actionData = useActionData();

  return (
    <div className="auth-container">
      <div className="page-header">
        <h1>Login</h1>
      </div>

      <div className="page-content">
        <form method="POST">
          <fieldset>
            <legend>Login or Register</legend>
            <label>
              <input
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
                type="radio"
                name="loginType"
                value="login"
              />
              Login
            </label>
            <label>
              <input type="radio" name="loginType" value="register" />
              Register
            </label>
          </fieldset>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              defaultValue={actionData?.fields?.username}
              type="text"
              name="username"
              id="username"
            />
            <div className="error">
              {actionData?.fieldErrors?.username &&
                actionData?.fieldErrors?.username}
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              defaultValue={actionData?.fields?.password}
              type="password"
              name="password"
              id="username"
            />
            <div className="error">
              {actionData?.fieldErrors?.password &&
                actionData?.fieldErrors?.password}
            </div>
          </div>

          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
