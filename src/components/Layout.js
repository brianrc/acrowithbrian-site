import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Navbar from '../components/Navbar'
import './all.sass'
import Footer from './Footer';

const TemplateWrapper = ({ bodyClass, pageTitle, pageSubtitle, heroImage, children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
          site {
            siteMetadata {
              title,
              description,
            }
          }
          
          # set default hero image if none provided
          hero: file(relativePath: { eq: "img/contact-1920x.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
    `}
      
        
    render={data => (
      <div className={bodyClass}>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />
        </Helmet>
        <section className="hero is-large" style={ heroImage && {
        background: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0) ), 
                    url(${ heroImage ? heroImage.childImageSharp.fluid.src : data.hero.childImageSharp.fluid.src }) 50% ${bodyClass === 'homepage' ? '30%' : '50%'} / cover`,
        backgroundColor: '#999',
          }}>
          <div className="hero-head">
            <Navbar />
          </div>
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                {pageTitle}
              </h1>
              { pageSubtitle ? <h2 className="subtitle">{pageSubtitle}</h2> : ''}
            </div>
          </div>
        </section>
        <div>{children}</div>
        <Footer />
      </div>
    )}
  />
)

export default TemplateWrapper
