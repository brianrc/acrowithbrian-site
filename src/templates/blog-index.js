import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import LatestPosts from '../components/LatestPosts'
import Content, { HTMLContent } from '../components/Content'


export const BlogIndexTemplate = ({ title, content, contentComponent, blogPosts }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        { content ? (
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        ) : '' }        
        <LatestPosts blogPosts={blogPosts} />
      </div>
    </section>
  )
}

BlogIndexTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const BlogIndex = ({ data }) => {
  const { markdownRemark: post } = data
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout pageTitle={post.frontmatter.title} heroImage={post.frontmatter.hero}>
      <BlogIndexTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        blogPosts={posts}        
      />
    </Layout>
  )
}

BlogIndex.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BlogIndex

export const blogIndexQuery = graphql`
  query BloxIndex($id: String!) {
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

    # Get blog list
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { layout: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            layout
            date(formatString: "MMMM DD, YYYY")
            hero {
              childImageSharp {
                fluid(maxWidth: 640, maxHeight: 365, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`