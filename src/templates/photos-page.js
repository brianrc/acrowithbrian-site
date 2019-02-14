import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PhotoGallery from '../components/PhotoGallery'
import Content, { HTMLContent } from '../components/Content'

export const PhotosPageTemplate = ({ title, content, contentComponent, images }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>

      </div>
      <PhotoGallery images={images} />
    </section>
  )
}

PhotosPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const PhotosPage = ({ data }) => {
  const { markdownRemark: post } = data
  const { edges: images } = data.allFile

  return (
    <Layout pageTitle={post.frontmatter.title} heroImage={post.frontmatter.hero}>
      <PhotosPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        images={images}
      />
    </Layout>
  )
}

PhotosPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PhotosPage

export const photosPageQuery = graphql`
  query PhotosPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        hero {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    allFile(filter: { extension: {regex: "/(jpg)/"}, relativePath: { regex: "/photo-gallery/"} }) {
      edges {
        node {
          childImageSharp {
            original {
              width
              height
              src
            }
            resize(height: 400){
              src
              width
              height
            }
  
          }
        }
      }
    }
  }
`