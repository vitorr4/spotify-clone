import React from "react";
import "../../style/footer.css";

function Footer() {
  return (
    <footer>
      <div>
        By Vítor Rodrigues Tomé |{" "}
        <a href="mailto:vitorr661@gmail.com">vitorr661@gmail.com</a> |{" "}
        <a href="/">GitHub</a>
      </div>
      <div>This app uses data from the Spotify API</div>
      <div>Version 0.1 (Beta)</div>
    </footer>
  );
}

export default Footer;
