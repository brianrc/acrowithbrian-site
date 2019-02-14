import React from "react";
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'

export default ({ data: {hero} }) => (
  <Layout pageTitle="Thank You" heroImage={hero}>
        <section className="section">
          <div className="container">
            <div className="content">
                <p>Your message has been sent!</p>
            </div>
          </div>
          </section>
  </Layout>
);

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "contact-1920x.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`