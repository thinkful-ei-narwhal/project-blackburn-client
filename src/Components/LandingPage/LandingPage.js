import React from "react";
import { Link } from "react-router-dom";
// import "./LandingPageV2.css";
import { Spring } from "react-spring/renderprops.cjs";
export default class LandingPage extends React.Component {
  render() {
    return (
      <>
      <div className="landing-page-container">
        <div className="landing-header">
          <Spring
          delay={1000}
          trail={1000}
          from={{
            opacity: 0,
            background: "linear-gradient(to right,#AE9172, #6A5046)",
            transform: "translate3d(400px,0,0) scale(2) rotateX(90deg)",
            boxShadow: "0px 100px 150px -10px #2D3747",
            shape: 'M20,20 L20,380 L380,380 L380,20 L20,20 Z',
            textShadow: "0px 5px 0px white",
          }}
          to={{
            opacity: 1,
            background: "linear-gradient(to right, #AE9172, #6A5046)",
            transform: "translate3d(0px,0,0) scale(1) rotateX(0deg)",
            boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.4)",
            shape: 'M20,380 L380,380 L380,380 L200,20 L20,380 Z',
            textShadow: "0px 5px 15px rgba(255,255,255,0.5)",
          }}
        >
          {(props) => (
            <svg
              style={props}
              id="Capa_1"
              enableBackground="new 0 0 512 512"
              height="100"
              width="100"

              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <g>
                  <path
                    d="m271 256.804s-77.92-200.466-130.238-200.466c-15.772 0-31.598 80.556-40.902 138.189 3.22 34.926-8.341 57.086-8.341 57.086s-84.02 7.76-84.02 25.04c0 9.244 33.093 20.419 84.215 28.814 44.438 7.296 179.286-48.663 179.286-48.663z"
                    fill="#7e8b96"
                  />
                  <path
                    d="m250.868 209.277c-92.258-.511-150.255-14.629-150.255-14.629l-.814.265c-5.145 31.911-8.279 56.7-8.279 56.7s63.671 17.68 164.48 17.68c62.112 0 7.194-32.569-5.132-60.016z"
                    fill="#4e5a61"
                  />
                  <path
                    d="m420.48 251.613s-13.56-23.12-8.256-56.563c-9.292-57.667-25.166-138.711-40.986-138.711-52.318 0-102.04 22.96-115.238 22.96s-62.92-22.96-115.238-22.96c18.707 0 28.193 77.446 31.549 149.054.993 21.182 12.369 38.94 1.449 59.858-82.045 30.083-82.045 30.083-82.045 40.216 44.438 7.297 102.497 12.492 164.285 12.492 132.87 0 248.5-24.026 248.5-41.306s-84.02-25.04-84.02-25.04z"
                    fill="#a2abb8"
                  />
                  <path
                    d="m420.48 251.613s-3.125-24.718-8.257-56.563l-.836-.401s-60.151 14.644-155.388 14.644c-32.246 0-60.462-1.68-83.691-3.9.993 21.181 1.451 41.853 1.451 59.857 23.32 2.344 50.994 4.043 82.24 4.043 100.81 0 164.481-17.68 164.481-17.68z"
                    fill="#7e8b96"
                  />
                  <path
                    d="m220.899 431.418c-12.599 16.167-33.308 24.244-61.074 24.244-48.344 0-75.295-29.487-75.295-78.527 0-13.48 10.048-23.445 31.52-28.481 10.264-2.408 114.187 70.781 104.849 82.764z"
                    fill="#4e5a61"
                  />
                  <path
                    d="m276.88 382.134c0 49.041 26.952 73.527 75.295 73.527 26.049 0 45.887-8.561 58.644-24.129 10.919-13.324-88.085-84.067-100.881-79.87-20.808 6.825-33.058 18.135-33.058 30.472z"
                    fill="#4e5a61"
                  />
                  <g fill="#7e8b96">
                    <path d="m154.825 344.965c-15.643 0-28.506 1.289-38.773 3.699-1.014 2.64-1.522 5.466-1.522 8.471 0 49.041 26.952 78.527 75.295 78.527 11.617 0 21.985-1.429 31.055-4.258 9.339-11.982 14.24-28.392 14.24-49.269 0-19.925-31.951-37.17-80.295-37.17z" />
                    <path d="m357.175 344.965c-18.412 0-34.437 2.507-47.234 6.705-2 3.344-3.061 6.859-3.061 10.464 0 49.041 26.952 73.527 75.295 73.527 10.589 0 20.152-1.416 28.63-4.141 10.919-13.325 16.665-31.77 16.665-54.386 0-19.924-21.952-32.169-70.295-32.169z" />
                  </g>
                </g>
                <g>
                  <path d="m352.175 463.161c-52.958 0-82.315-28.31-82.789-79.759-1.729-1.009-6.488-2.417-13.386-2.417-6.897 0-11.657 1.408-13.386 2.417-.473 51.449-29.832 79.759-82.789 79.759-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5c44.985 0 67.795-22.215 67.795-66.027 0-14.269-27.832-29.669-72.795-29.669-23.452 0-62.795 3.205-62.795 24.669 0 24.833 7.319 56.698 42.188 67.477 3.958 1.224 6.174 5.423 4.951 9.38-1.224 3.957-5.426 6.173-9.38 4.951-31.968-9.882-50.441-36.134-52.555-74.308h-9.984c-4.142 0-7.5-3.358-7.5-7.5s3.358-7.5 7.5-7.5h10.619c3.761-16.057 21.385-32.169 76.956-32.169 41.476 0 73.681 12.489 84.162 31.129 4.53-1.693 10.281-2.608 17.013-2.608s12.483.915 17.013 2.608c10.481-18.64 42.686-31.129 84.162-31.129 55.57 0 73.194 16.112 76.955 32.169h10.62c4.143 0 7.5 3.358 7.5 7.5s-3.357 7.5-7.5 7.5h-9.987c-2.768 49.341-33.197 78.527-82.588 78.527zm5-110.696c-44.964 0-72.795 15.401-72.795 29.669 0 43.813 22.81 66.027 67.795 66.027 43.718 0 67.795-25.225 67.795-71.027 0-21.464-39.343-24.669-62.795-24.669zm-101.175-27.006c-60.85 0-124.781-5.209-175.4-14.291-22.882-4.105-42.078-8.85-55.512-13.72-17.351-6.29-25.088-12.703-25.088-20.795 0-11.156 13.379-16.871 23.442-20.199 9.468-3.131 22.137-5.979 37.656-8.463 4.085-.652 7.936 2.129 8.591 6.22.655 4.09-2.13 7.937-6.22 8.591-34.483 5.521-44.78 11.368-47.626 13.649 4.864 3.908 24.037 12.693 74.377 21.165 49.219 8.282 108.094 12.843 165.779 12.843s116.561-4.561 165.779-12.843c50.437-8.487 69.586-17.291 74.405-21.187-2.51-2.074-11.06-7.007-38.703-12.091-16.214-2.982-31.837-4.668-36.377-5.127-10.069 2.636-71.313 17.583-165.104 17.583-100.673 0-163.847-17.221-166.487-17.954-3.587-.996-5.901-4.473-5.434-8.167.062-.49 6.307-49.607 15.484-98.091 5.42-28.633 10.801-51.507 15.992-67.984 8.001-25.398 15.305-35.758 25.207-35.758 35.935 0 70.39 10.409 93.189 17.297 9.639 2.912 18.744 5.663 22.048 5.663 3.305 0 12.41-2.751 22.05-5.663 9.881-2.985 22.177-6.7 35.765-9.896 4.033-.946 8.07 1.55 9.019 5.583.948 4.032-1.552 8.07-5.584 9.018-13.132 3.089-25.181 6.729-34.861 9.653-12.565 3.796-20.867 6.304-26.388 6.304s-13.821-2.508-26.386-6.304c-21.806-6.588-54.683-16.521-88.165-16.655-2.143 1.657-12.788 13.788-28.143 96.853-6.621 35.817-11.561 71.01-13.476 85.252 18.336 4.272 75.478 15.849 156.169 15.849 80.692 0 137.831-11.576 156.169-15.849-1.12-8.332-3.276-23.835-6.196-42.432-18.724 3.84-72.616 13.28-149.973 13.28-56.76 0-101.227-5.146-128.536-9.462-4.091-.647-6.884-4.488-6.237-8.579.647-4.092 4.491-6.88 8.579-6.237 26.778 4.233 70.408 9.278 126.194 9.278 76.184 0 130.163-9.57 147.58-13.125-1.497-9.048-3.138-18.519-4.896-28.033-15.351-83.015-25.99-95.14-28.133-96.795-8.632.035-17.847.732-27.401 2.073-4.085.577-7.894-2.282-8.47-6.385-.575-4.102 2.283-7.894 6.386-8.47 10.496-1.473 20.647-2.22 30.172-2.22 9.902 0 17.206 10.36 25.207 35.758 5.191 16.478 10.572 39.351 15.992 67.984 7.313 38.636 12.765 77.673 14.709 92.187 7.816.874 22.208 2.68 36.781 5.524 33.698 6.578 48.075 14.462 48.075 26.362 0 8.092-7.737 14.505-25.087 20.795-13.436 4.87-32.631 9.615-55.513 13.72-50.619 9.082-114.549 14.291-175.4 14.291z" />
                </g>
              </g>
            </svg>
          )}
        </Spring>
               
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          delay={2000}
          trail={1000}
        >
          {(props) => (
            <nav className="landing-page-nav" style={props}>
              <Link to={"/login"} className="login-signup">
                {" "}
                Login{" "}
              </Link>
              <Link to={"/registration"} className="login-signup">
                {" "}
                Sign Up{" "}
              </Link>
            </nav>
          )}
        </Spring>
          <p className = 'landingText'>
            {/* Whether to increase your typing accuracy or speed, everyone could
            benefit from a typing tutor. The trouble is that practicing typing
            the conventional way is boring, and most typing games forget that
            they should be games first and typing tutors second.
            <br />
            That's why we built Project Blackburn,  */}
            A typing tutor that knows how
            to make learning fun! Project Blackburn hosts a collection of
            campaigns from your to choose from that help you increase your
            typing skill. Each campaign can be played on multiple difficulty
            settings, and your runs are recorded to track your progress over
            time. Project Blackburn also has a leaderboard so you can compete to
            be the fastest typer!{" "}
            
          </p>

        </div>
      </div>
      <footer className="footer">
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
    </footer>
    </>
    );
  }
}
