import React from 'react'

import facebookSvg from "../img/iconmonstr-facebook-3.svg"
import instagramSvg from "../img/iconmonstr-instagram-6.svg"

//import styles from "./footer.module.scss"

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered is-small">
                    <p>
                    { "Website by "}
                    <a
                        href="https://www.brianswebstudio.com/"
                        className="footerLink"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        { "Brian's Web Studio" }
                    </a>
                    { ". Made with " }
                    <span className="heart">{ "♥" }</span>
                    { " and " }
                    <a
                        href="https://github.com/gatsbyjs/gatsby"
                        className="footerLink"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        { `Gatsby` }
                    </a>
                    </p>
                
                    <aside className="menu">
                        <ul className="menu-list">
                            <li>
                                <a
                                href={ `https://www.facebook.com/brianrc` }
                                className="link"
                                target="_blank"
                                rel="me noopener noreferrer"
                                >
                                    <img src={ facebookSvg } alt="Facebook" />
                                {/*<Svg svg={ facebookSvg } cleanup />*/}
                                </a>
                            </li>
                            <li>
                                <a
                                href={ `https://www.instagram.com/briancruikshank` }
                                className="link"
                                target="_blank"
                                rel="me noopener noreferrer"
                                >
                                    <img src={ instagramSvg } alt="Instagram"/>
                                {/*<Svg svg={ instagramSvg } cleanup />*/}
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            </footer>
        )

    }
}

export default Footer